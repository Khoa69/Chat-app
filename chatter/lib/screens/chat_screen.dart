import 'dart:async';
import 'dart:developer';
import 'dart:io';

import 'package:avatar_glow/avatar_glow.dart';
import 'package:chatter/helpers.dart';
import 'package:chatter/widgets/audio_loading_message.dart';
import 'package:chatter/widgets/audio_player_message.dart';
import 'package:chatter/widgets/record_button.dart';
import 'package:collection/collection.dart' show IterableExtension;
import 'package:chatter/theme.dart';
import 'package:chatter/widgets/widgets.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:jiffy/jiffy.dart';
import 'package:chatter/app.dart';
import 'package:just_audio/just_audio.dart';
import 'package:speech_to_text/speech_recognition_result.dart';
import 'package:speech_to_text/speech_to_text.dart';
import 'package:stream_chat_flutter/stream_chat_flutter.dart';

class ChatScreen extends StatefulWidget {
  static Route routeWithChannel(Channel channel) => MaterialPageRoute(
        builder: (context) => StreamChannel(
          channel: channel,
          child: const ChatScreen(),
        ),
      );

  const ChatScreen({
    Key? key,
  }) : super(key: key);

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  late StreamSubscription<int> unreadCountSubscription;
  late final messageInputController = StreamMessageInputController();
  final focusNode = FocusNode();
  bool _isListening = false;
  SpeechToText _speechToText = SpeechToText();
  String _textSpeech = "";
  Future<void> onListen() async {
    if (!_isListening) {
      bool available = await _speechToText.initialize(
        onStatus: (val) => print(_speechToText.isListening),
        onError: (val) => setState(() {
          _isListening = false;
          _speechToText.stop();
        }),
      );
      var systemLocale = await _speechToText.systemLocale();
      var selectedLocale = systemLocale?.localeId ?? "";
      if (available) {
        setState(() {
          _isListening = true;
        });
        _speechToText.listen(
          onResult: (val) => setState(() {
            _textSpeech = val.recognizedWords;
          }),
          localeId: selectedLocale,
        );
      }
    } else {
      setState(() {
        _isListening = false;
        _speechToText.stop();
      });
      var txt = TextEditingController(text: _textSpeech);
      txt.selection = TextSelection.collapsed(offset: txt.text.length);
      messageInputController.textEditingValue = txt.value;
    }
  }

  @override
  void initState() {
    super.initState();
    _speechToText = SpeechToText();

    unreadCountSubscription = StreamChannel.of(context)
        .channel
        .state!
        .unreadCountStream
        .listen(_unreadCountHandler);
  }

  Future<void> _unreadCountHandler(int count) async {
    if (count > 0) {
      await StreamChannel.of(context).channel.markRead();
    }
  }

  @override
  void dispose() {
    unreadCountSubscription.cancel();
    super.dispose();
  }

  void reply(Message message) {
    messageInputController.quotedMessage = message;
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      focusNode.requestFocus();
    });
  }

  void _recordingFinishedCallback(String path) {
    final uri = Uri.parse(path);
    File file = File(uri.path);
    file.length().then(
      (fileSize) {
        StreamChannel.of(context).channel.sendMessage(
              Message(
                attachments: [
                  Attachment(
                    type: 'voicenote',
                    file: AttachmentFile(
                      size: fileSize,
                      path: uri.path,
                    ),
                  )
                ],
              ),
            );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusScope.of(context).unfocus(),
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: AppColors.lightBlue,
          leadingWidth: 20,
          leading: IconButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              icon: const Icon(
                CupertinoIcons.arrow_left,
              )),
          title: const _AppBarTitle(),
          actions: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8.0),
              child: Center(
                child: IconButton(
                  icon: const Icon(
                    CupertinoIcons.phone_solid,
                    size: 25,
                  ),
                  onPressed: () {},
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(right: 20),
              child: Center(
                child: IconButton(
                  icon: const Icon(
                    CupertinoIcons.video_camera_solid,
                    size: 30,
                  ),
                  onPressed: () {},
                ),
              ),
            ),
          ],
        ),
        body: Container(
          color: AppColors.primary,
          child: Column(
            // ignore: prefer_const_literals_to_create_immutables
            children: [
              Expanded(
                child: StreamMessageListView(
                  onMessageSwiped:
                      (CurrentPlatform.isAndroid || CurrentPlatform.isIos)
                          ? reply
                          : null,
                  threadBuilder: (context, parent) {
                    return ThreadPage(
                      parent: parent!,
                    );
                  },
                  messageBuilder: (context, details, messages, defaultWidget) {
                    return defaultWidget.copyWith(
                      onReplyTap: reply,
                      customAttachmentBuilders: {
                        'voicenote': (context, defaultMessage, attachments) {
                          final url = attachments.first.assetUrl;
                          late final Widget widget;
                          if (url == null) {
                            widget = const AudioLoadingMessage();
                          } else {
                            widget = AudioPlayerMessage(
                              source: AudioSource.uri(Uri.parse(url)),
                              id: defaultMessage.id,
                            );
                          }
                          return SizedBox(
                            width: 250,
                            height: 50,
                            child: widget,
                          );
                        }
                      },
                    );
                  },
                ),
              ),
              StreamMessageInput(
                actions: [
                  RecordButton(
                    recordingFinishedCallback: _recordingFinishedCallback,
                  ),
                  InkWell(
                    child: Icon(
                      _isListening ? Icons.mic : Icons.mic_none,
                    ),
                    onTap: () {
                      onListen();
                    },
                  ),
                ],
                sendButtonLocation: SendButtonLocation.inside,
                focusNode: focusNode,
                messageInputController: messageInputController,
                autoCorrect: false,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class ThreadPage extends StatelessWidget {
  const ThreadPage({
    Key? key,
    required this.parent,
  });

  final Message parent;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: StreamThreadHeader(
        parent: parent,
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            child: StreamMessageListView(
              parentMessage: parent,
            ),
          ),
          StreamMessageInput(
            actions: [
              InkWell(
                child: const Icon(
                  Icons.mic,
                  size: 20.0,
                  color: Colors.grey,
                ),
                onTap: () {
                  // Do something here
                },
              ),
            ],
            messageInputController: StreamMessageInputController(
              message: Message(parentId: parent.id),
            ),
          ),
        ],
      ),
    );
  }
}

class _MessageList extends StatelessWidget {
  const _MessageList({
    Key? key,
    required this.messages,
  }) : super(key: key);

  final List<Message> messages;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: ListView.separated(
        itemCount: messages.length + 1,
        reverse: true,
        separatorBuilder: (context, index) {
          if (index == messages.length - 1) {
            return _DateLable(dateTime: messages[index].createdAt);
          }
          if (messages.length == 1) {
            return const SizedBox.shrink();
          } else if (index >= messages.length - 1) {
            return const SizedBox.shrink();
          } else if (index <= messages.length) {
            final message = messages[index];
            final nextMessage = messages[index + 1];
            if (!Jiffy(message.createdAt.toLocal())
                .isSame(nextMessage.createdAt.toLocal(), Units.DAY)) {
              return _DateLable(
                dateTime: message.createdAt,
              );
            } else {
              return const SizedBox.shrink();
            }
          } else {
            return const SizedBox.shrink();
          }
        },
        itemBuilder: (context, index) {
          if (index < messages.length) {
            final message = messages[index];
            if (message.user?.id == context.currentUser?.id) {
              return _MessageOwnTile(message: message);
            } else {
              return _MessageTile(message: message);
            }
          } else {
            return const SizedBox.shrink();
          }
        },
      ),
    );
  }
}

class _MessageTile extends StatelessWidget {
  const _MessageTile({
    Key? key,
    required this.message,
  }) : super(key: key);

  final Message message;

  static const _borderRadius = 26.0;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Align(
        alignment: Alignment.centerLeft,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              decoration: const BoxDecoration(
                color: AppColors.white,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(_borderRadius),
                  topRight: Radius.circular(_borderRadius),
                  bottomRight: Radius.circular(_borderRadius),
                ),
              ),
              child: Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12.0, vertical: 20),
                child: Text(
                  message.text ?? '',
                  style: const TextStyle(
                    color: AppColors.black,
                    fontSize: 17,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 8.0),
              child: Text(
                Jiffy(message.createdAt.toLocal()).jm,
                style: const TextStyle(
                  color: AppColors.black,
                  fontSize: 13,
                  fontWeight: FontWeight.bold,
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}

class _MessageOwnTile extends StatelessWidget {
  const _MessageOwnTile({
    Key? key,
    required this.message,
  }) : super(key: key);

  final Message message;

  static const _borderRadius = 26.0;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Align(
        alignment: Alignment.centerRight,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Container(
              decoration: const BoxDecoration(
                color: AppColors.lightBlue,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(_borderRadius),
                  bottomRight: Radius.circular(_borderRadius),
                  bottomLeft: Radius.circular(_borderRadius),
                ),
              ),
              child: Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12.0, vertical: 20),
                child: Text(message.text ?? '',
                    style: const TextStyle(
                        color: AppColors.white,
                        fontSize: 17,
                        fontWeight: FontWeight.w400)),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 8.0),
              child: Text(
                Jiffy(message.createdAt.toLocal()).jm,
                style: const TextStyle(
                  color: AppColors.black,
                  fontSize: 13,
                  fontWeight: FontWeight.bold,
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}

class _DateLable extends StatefulWidget {
  const _DateLable({
    Key? key,
    required this.dateTime,
  }) : super(key: key);

  final DateTime dateTime;

  @override
  __DateLableState createState() => __DateLableState();
}

class __DateLableState extends State<_DateLable> {
  late String dayInfo;

  @override
  void initState() {
    final createdAt = Jiffy(widget.dateTime);
    final now = DateTime.now();

    if (Jiffy(createdAt).isSame(now, Units.DAY)) {
      dayInfo = 'Hôm nay';
    } else if (Jiffy(createdAt)
        .isSame(now.subtract(const Duration(days: 1)), Units.DAY)) {
      dayInfo = 'Hôm qua';
    } else if (Jiffy(createdAt).isAfter(
      now.subtract(const Duration(days: 7)),
      Units.DAY,
    )) {
      dayInfo = createdAt.EEEE;
    } else if (Jiffy(createdAt).isAfter(
      Jiffy(now).subtract(years: 1),
      Units.DAY,
    )) {
      dayInfo = createdAt.MMMd;
    } else {
      dayInfo = createdAt.MMMd;
    }

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 32.0),
        child: Container(
          decoration: BoxDecoration(
            color: const Color(0xFF575757),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 4.0, horizontal: 12),
            child: Text(
              dayInfo,
              style: const TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w500,
                color: AppColors.white,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _AppBarTitle extends StatelessWidget {
  const _AppBarTitle({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final channel = StreamChannel.of(context).channel;
    log(Helpers.getChannelImage(channel, context.currentUser!).toString());
    return Row(
      children: [
        Avatar.small(
          url: Helpers.getChannelImage(channel, context.currentUser!),
        ),
        const SizedBox(
          width: 16,
        ),
        Expanded(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                Helpers.getChannelName(channel, context.currentUser!),
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(fontSize: 14),
              ),
              const SizedBox(height: 2),
              BetterStreamBuilder<List<Member>>(
                stream: channel.state!.membersStream,
                initialData: channel.state!.members,
                builder: (context, data) => ConnectionStatusBuilder(
                  statusBuilder: (context, status) {
                    switch (status) {
                      case ConnectionStatus.connected:
                        return _buildConnectedTitleState(context, data);
                      case ConnectionStatus.connecting:
                        return const Text(
                          'Connecting',
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            color: Colors.green,
                          ),
                        );
                      case ConnectionStatus.disconnected:
                        return const Text(
                          'Offline',
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            color: Colors.red,
                          ),
                        );
                      default:
                        return const SizedBox.shrink();
                    }
                  },
                ),
              ),
            ],
          ),
        )
      ],
    );
  }

  Widget _buildConnectedTitleState(
    BuildContext context,
    List<Member>? members,
  ) {
    Widget? alternativeWidget;
    final channel = StreamChannel.of(context).channel;
    final memberCount = channel.memberCount;
    if (memberCount != null && memberCount > 2) {
      var text = 'Members: $memberCount';
      final watcherCount = channel.state?.watcherCount ?? 0;
      if (watcherCount > 0) {
        text = 'watchers $watcherCount';
      }
      alternativeWidget = Text(
        text,
      );
    } else {
      final userId = StreamChatCore.of(context).currentUser?.id;
      final otherMember = members?.firstWhereOrNull(
        (element) => element.userId != userId,
      );

      if (otherMember != null) {
        if (otherMember.user?.online == true) {
          alternativeWidget = const Text(
            'Hoạt động',
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.bold,
              color: Colors.green,
            ),
          );
        } else {
          alternativeWidget = Text(
            'Truy cập '
            '${Jiffy(otherMember.user?.lastActive).fromNow()}',
            style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w500,
              color: Colors.red,
            ),
          );
        }
      }
    }

    return TypingIndicator(
      alternativeWidget: alternativeWidget,
    );
  }
}

/// Widget to show the current list of typing users
class TypingIndicator extends StatelessWidget {
  /// Instantiate a new TypingIndicator
  const TypingIndicator({
    Key? key,
    this.alternativeWidget,
  }) : super(key: key);

  /// Widget built when no typings is happening
  final Widget? alternativeWidget;

  @override
  Widget build(BuildContext context) {
    final channelState = StreamChannel.of(context).channel.state!;

    final altWidget = alternativeWidget ?? const SizedBox.shrink();

    return BetterStreamBuilder<Iterable<User>>(
      initialData: channelState.typingEvents.keys,
      stream: channelState.typingEventsStream
          .map((typings) => typings.entries.map((e) => e.key)),
      builder: (context, data) {
        return Align(
          alignment: Alignment.centerLeft,
          child: AnimatedSwitcher(
            duration: const Duration(milliseconds: 300),
            child: data.isNotEmpty == true
                ? const Align(
                    alignment: Alignment.centerLeft,
                    key: ValueKey('typing-text'),
                    child: Text(
                      'Typing message',
                      maxLines: 1,
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  )
                : Align(
                    alignment: Alignment.centerLeft,
                    key: const ValueKey('altwidget'),
                    child: altWidget,
                  ),
          ),
        );
      },
    );
  }
}

/// Widget that builds itself based on the latest snapshot of interaction with
/// a [Stream] of type [ConnectionStatus].
///
/// The widget will use the closest [StreamChatClient.wsConnectionStatusStream]
/// in case no stream is provided.
class ConnectionStatusBuilder extends StatelessWidget {
  /// Creates a new ConnectionStatusBuilder
  const ConnectionStatusBuilder({
    Key? key,
    required this.statusBuilder,
    this.connectionStatusStream,
    this.errorBuilder,
    this.loadingBuilder,
  }) : super(key: key);

  /// The asynchronous computation to which this builder is currently connected.
  final Stream<ConnectionStatus>? connectionStatusStream;

  /// The builder that will be used in case of error
  final Widget Function(BuildContext context, Object? error)? errorBuilder;

  /// The builder that will be used in case of loading
  final WidgetBuilder? loadingBuilder;

  /// The builder that will be used in case of data
  final Widget Function(BuildContext context, ConnectionStatus status)
      statusBuilder;

  @override
  Widget build(BuildContext context) {
    final stream = connectionStatusStream ??
        StreamChatCore.of(context).client.wsConnectionStatusStream;
    final client = StreamChatCore.of(context).client;
    return BetterStreamBuilder<ConnectionStatus>(
      initialData: client.wsConnectionStatus,
      stream: stream,
      noDataBuilder: loadingBuilder,
      errorBuilder: (context, error) {
        if (errorBuilder != null) {
          return errorBuilder!(context, error);
        }
        return const Offstage();
      },
      builder: statusBuilder,
    );
  }
}

class _ActionBar extends StatefulWidget {
  const _ActionBar({Key? key}) : super(key: key);

  @override
  __ActionBarState createState() => __ActionBarState();
}

class __ActionBarState extends State<_ActionBar> {
  final StreamMessageInputController controller =
      StreamMessageInputController();

  Timer? _debounce;

  Future<void> _sendMessage() async {
    if (controller.text.isNotEmpty) {
      StreamChannel.of(context).channel.sendMessage(controller.message);
      controller.clear();
      FocusScope.of(context).unfocus();
    }
  }

  void _onTextChange() {
    if (_debounce?.isActive ?? false) _debounce?.cancel();
    _debounce = Timer(const Duration(seconds: 1), () {
      if (mounted) {
        StreamChannel.of(context).channel.keyStroke();
      }
    });
  }

  @override
  void initState() {
    super.initState();
    controller.addListener(_onTextChange);
  }

  @override
  void dispose() {
    controller.removeListener(_onTextChange);
    controller.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        bottom: true,
        top: false,
        child: Container(
          color: AppColors.white,
          padding: const EdgeInsets.fromLTRB(0, 10, 0, 10),
          child: Row(
            children: [
              Container(
                decoration: BoxDecoration(
                  border: Border(
                    right: BorderSide(
                      width: 2,
                      color: Theme.of(context).dividerColor,
                    ),
                  ),
                ),
                child: const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16.0),
                  child: Icon(
                    CupertinoIcons.camera_fill,
                    color: AppColors.black,
                  ),
                ),
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.only(left: 16.0),
                  child: TextField(
                    controller: controller.textFieldController,
                    onChanged: (val) {
                      controller.text = val;
                    },
                    style: const TextStyle(
                        fontSize: 17, color: AppColors.primaryText),
                    decoration: const InputDecoration(
                      hintText: 'Tin nhắn',
                      hintStyle:
                          TextStyle(fontSize: 17, color: AppColors.primaryText),
                      border: InputBorder.none,
                    ),
                    onSubmitted: (_) => _sendMessage(),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(
                  left: 12,
                  right: 10.0,
                ),
                child: GlowingActionButton(
                  color: AppColors.lightBlue,
                  icon: Icons.send_rounded,
                  onPressed: _sendMessage,
                ),
              ),
            ],
          ),
        ));
  }
}
