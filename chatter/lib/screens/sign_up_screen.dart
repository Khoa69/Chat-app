import 'package:chatter/theme.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_auth/firebase_auth.dart' as firebase;
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:keyboard_dismisser/keyboard_dismisser.dart';
import 'package:stream_chat_flutter/stream_chat_flutter.dart';

import '../app.dart';
import 'home_screen.dart';

class SignUpScreen extends StatefulWidget {
  static Route get route => MaterialPageRoute(
        builder: (context) => const SignUpScreen(),
      );
  const SignUpScreen({Key? key}) : super(key: key);

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  final auth = firebase.FirebaseAuth.instance;
  final functions = FirebaseFunctions.instanceFor(region: 'asia-east2');

  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _profilePictureController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  final _emailRegex = RegExp(
      r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+");

  bool _loading = false;

  Future<void> _signUp() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _loading = true;
      });
      try {
        // Authenticate with Firebase
        final creds =
            await firebase.FirebaseAuth.instance.createUserWithEmailAndPassword(
          email: _emailController.text,
          password: _passwordController.text,
        );
        final user = creds.user;
        if (mounted) {
          if (user == null) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('User is empty')),
            );
            return;
          }
        }

        // Set Firebase display name and profile picture
        List<Future<void>> futures = [
          creds.user!.updateDisplayName(_nameController.text),
          if (_profilePictureController.text.isNotEmpty)
            creds.user!.updatePhotoURL(_profilePictureController.text)
          else
            creds.user!.updatePhotoURL(
                "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg")
        ];

        await Future.wait(futures);

        // Create Stream user and get token using Firebase Functions
        final results = await functions
            .httpsCallable('ext-auth-chat-getStreamUserToken')
            .call();

        // Connect user to Stream and set user data
        if (!mounted) return;
        final client = StreamChatCore.of(context).client;

        final streamUser = User(
          id: creds.user!.uid,
          name: _nameController.text,
          image: _profilePictureController.text.isNotEmpty
              ? _profilePictureController.text
              : "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
        );
        await client.connectUser(
          streamUser,
          results.data,
        );
        await client.updateUser(streamUser);

        if (!mounted) return;
        // Navigate to home screen
        await Navigator.of(context).pushReplacement(HomeScreen.route);
      } on firebase.FirebaseAuthException catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.message ?? 'Auth error')),
        );
      } catch (e, st) {
        logger.e('Sign up error', e, st);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('An error occured')),
        );
      }
      setState(() {
        _loading = false;
      });
    }
  }

  String? _nameInputValidator(String? value) {
    if (value == null || value.isEmpty) {
      return 'Cannot be empty';
    }
    return null;
  }

  String? _emailInputValidator(String? value) {
    if (value == null || value.isEmpty) {
      return 'Cannot be empty';
    }
    if (!_emailRegex.hasMatch(value)) {
      return 'Not a valid email';
    }
    return null;
  }

  String? _passwordInputValidator(String? value) {
    if (value == null || value.isEmpty) {
      return 'Cannot be empty';
    }
    if (value.length <= 6) {
      return 'Password needs to be longer than 6 characters';
    }
    return null;
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _profilePictureController.dispose();
    _nameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return KeyboardDismisser(
      child: Scaffold(
        appBar: AppBar(
          toolbarHeight: 60,
          title: const Text(
            'Đăng ký',
            style: TextStyle(
              fontSize: 25,
            ),
          ),
          centerTitle: true,
          backgroundColor: AppColors.lightBlue,
          elevation: 0,
        ),
        body: (_loading)
            ? const Center(child: CircularProgressIndicator())
            : SingleChildScrollView(
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16.0),
                  height: MediaQuery.of(context).size.height - 60,
                  decoration: BoxDecoration(
                      image: DecorationImage(
                    image: Image.asset(
                      "assets/images/backgroundSignin.jpeg",
                    ).image,
                    fit: BoxFit.cover,
                  )),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          decoration: BoxDecoration(
                            border:
                                Border.all(color: AppColors.black, width: 1),
                            borderRadius:
                                const BorderRadius.all(Radius.circular(30)),
                            color: AppColors.white,
                          ),
                          margin: const EdgeInsets.symmetric(vertical: 10),
                          padding: const EdgeInsets.fromLTRB(10, 5, 20, 5),
                          child: TextFormField(
                            controller: _nameController,
                            validator: _nameInputValidator,
                            decoration: InputDecoration(
                                prefixIcon: Container(
                                  width: 40,
                                  alignment: Alignment.center,
                                  child: const Icon(
                                    CupertinoIcons.person_alt_circle,
                                    color: AppColors.black,
                                  ),
                                ),
                                border: InputBorder.none,
                                hintText: 'Nhập tên',
                                hintStyle: const TextStyle(
                                  fontSize: 17,
                                  fontWeight: FontWeight.w400,
                                  color: AppColors.primaryText,
                                )),
                            style: const TextStyle(
                              fontSize: 17,
                              fontWeight: FontWeight.w400,
                              color: AppColors.black,
                            ),
                            keyboardType: TextInputType.name,
                            autofillHints: const [
                              AutofillHints.name,
                              AutofillHints.username
                            ],
                          ),
                        ),
                        Container(
                          decoration: BoxDecoration(
                            border:
                                Border.all(color: AppColors.black, width: 1),
                            borderRadius:
                                const BorderRadius.all(Radius.circular(30)),
                            color: AppColors.white,
                          ),
                          margin: const EdgeInsets.symmetric(vertical: 10),
                          padding: const EdgeInsets.fromLTRB(10, 5, 20, 5),
                          child: TextFormField(
                            controller: _profilePictureController,
                            decoration: InputDecoration(
                                prefixIcon: Container(
                                  width: 40,
                                  alignment: Alignment.center,
                                  child: const Icon(
                                    CupertinoIcons.link,
                                    color: AppColors.black,
                                  ),
                                ),
                                border: InputBorder.none,
                                hintText: 'Nhập URL ảnh',
                                hintStyle: const TextStyle(
                                  fontSize: 17,
                                  fontWeight: FontWeight.w400,
                                  color: AppColors.primaryText,
                                )),
                            style: const TextStyle(
                              fontSize: 17,
                              fontWeight: FontWeight.w400,
                              color: AppColors.black,
                            ),
                            keyboardType: TextInputType.url,
                          ),
                        ),
                        Container(
                          decoration: BoxDecoration(
                            border:
                                Border.all(color: AppColors.black, width: 1),
                            borderRadius:
                                const BorderRadius.all(Radius.circular(30)),
                            color: AppColors.white,
                          ),
                          margin: const EdgeInsets.symmetric(vertical: 10),
                          padding: const EdgeInsets.fromLTRB(10, 5, 20, 5),
                          child: TextFormField(
                            controller: _emailController,
                            validator: _emailInputValidator,
                            decoration: InputDecoration(
                                prefixIcon: Container(
                                  width: 40,
                                  alignment: Alignment.center,
                                  child: const Icon(
                                    CupertinoIcons.mail,
                                    color: AppColors.black,
                                  ),
                                ),
                                border: InputBorder.none,
                                hintText: 'Nhập Email',
                                hintStyle: const TextStyle(
                                  fontSize: 17,
                                  fontWeight: FontWeight.w400,
                                  color: AppColors.primaryText,
                                )),
                            style: const TextStyle(
                              fontSize: 17,
                              fontWeight: FontWeight.w400,
                              color: AppColors.black,
                            ),
                            keyboardType: TextInputType.emailAddress,
                            autofillHints: const [AutofillHints.email],
                          ),
                        ),
                        Container(
                          decoration: BoxDecoration(
                            border:
                                Border.all(color: AppColors.black, width: 1),
                            borderRadius:
                                const BorderRadius.all(Radius.circular(30)),
                            color: AppColors.white,
                          ),
                          margin: const EdgeInsets.symmetric(vertical: 10),
                          padding: const EdgeInsets.fromLTRB(10, 5, 20, 5),
                          child: TextFormField(
                            controller: _passwordController,
                            validator: _passwordInputValidator,
                            decoration: InputDecoration(
                                prefixIcon: Container(
                                  width: 40,
                                  alignment: Alignment.center,
                                  child: const Icon(
                                    CupertinoIcons.lock,
                                    color: AppColors.black,
                                  ),
                                ),
                                border: InputBorder.none,
                                hintText: 'Nhập password',
                                hintStyle: const TextStyle(
                                  fontSize: 17,
                                  fontWeight: FontWeight.w400,
                                  color: AppColors.primaryText,
                                )),
                            style: const TextStyle(
                              fontSize: 17,
                              fontWeight: FontWeight.w400,
                              color: AppColors.black,
                            ),
                            obscureText: true,
                            enableSuggestions: false,
                            autocorrect: false,
                            keyboardType: TextInputType.visiblePassword,
                          ),
                        ),
                        GestureDetector(
                          onTap: _signUp,
                          child: Container(
                            width: 200,
                            height: 40,
                            alignment: Alignment.center,
                            margin: const EdgeInsets.only(bottom: 30, top: 20),
                            decoration: const BoxDecoration(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(30)),
                              color: Color(0xFF3C61EA),
                            ),
                            child: const Text(
                              'Đăng ký',
                              style: TextStyle(
                                  fontWeight: FontWeight.w400,
                                  fontSize: 15,
                                  color: AppColors.white),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
      ),
    );
  }
}
