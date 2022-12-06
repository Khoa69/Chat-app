import 'package:chatter/theme.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart' as UrlLauncher;

class InformationCallItem extends StatefulWidget {
  final String name;
  final String phone;
  const InformationCallItem({
    Key? key,
    required this.name,
    required this.phone,
  }) : super(key: key);

  @override
  _InformationCallItemState createState() => _InformationCallItemState();
}

class _InformationCallItemState extends State<InformationCallItem> {
  @override
  Widget build(BuildContext context) {
    return InkWell(
        onTap: () => UrlLauncher.launch("tel://${widget.phone}"),
        // onLongPress: widget.onLongPress,
        child: Container(
            padding: const EdgeInsets.fromLTRB(22, 10, 0, 17),
            margin: const EdgeInsets.only(top: 5),
            child: Row(
              children: [
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Icon(
                          CupertinoIcons.person_alt_circle,
                          color: AppColors.white,
                          size: 30,
                        ),
                        const SizedBox(
                          width: 15,
                        ),
                        Text(
                          '${widget.name} - ${widget.phone}',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontSize: 20.0,
                            color: Color(0xFFF8F8F8),
                            fontFamily: 'Open Sans',
                            fontWeight: FontWeight.w600,
                            letterSpacing: -0.33,
                          ),
                        ),
                      ],
                    )
                  ],
                )
              ],
            )));
  }
}
