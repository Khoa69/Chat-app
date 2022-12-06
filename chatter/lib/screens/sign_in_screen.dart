import 'package:chatter/screens/screens.dart';
import 'package:chatter/theme.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_auth/firebase_auth.dart' as firebase;
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:stream_chat_flutter/stream_chat_flutter.dart';

import '../app.dart';

class SignInScreen extends StatefulWidget {
  static Route get route => MaterialPageRoute(
        builder: (context) => const SignInScreen(),
      );
  const SignInScreen({Key? key}) : super(key: key);

  @override
  State<SignInScreen> createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
  final auth = firebase.FirebaseAuth.instance;
  final functions = FirebaseFunctions.instanceFor(region: 'asia-east2');

  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _emailRegex = RegExp(
      r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+");

  bool _loading = false;

  Future<void> _signIn() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _loading = true;
      });
      try {
        // Authenticate with Firebase
        final creds =
            await firebase.FirebaseAuth.instance.signInWithEmailAndPassword(
          email: _emailController.text,
          password: _passwordController.text,
        );

        final user = creds.user;

        if (!mounted) return;
        if (user == null) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('User is empty')),
          );
          return;
        }

        // Get Stream user token from Firebase Functions
        final results = await functions
            .httpsCallable('ext-auth-chat-getStreamUserToken')
            .call();

        if (mounted) {
          // Connnect stream user
          final client = StreamChatCore.of(context).client;
          await client.connectUser(
            User(id: creds.user!.uid),
            results.data,
          );
        }

        if (mounted) {
          // Navigate to home screen
          await Navigator.of(context).pushReplacement(HomeScreen.route);
        }
      } on firebase.FirebaseAuthException catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.message ?? 'Auth error')),
        );
      } on FirebaseFunctionsException catch (e) {
        logger.e(e.code);
        logger.e(e.message);
        logger.e(e.details);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Error retrieving Stream Chat token')),
        );
      } catch (e, st) {
        logger.e('Sign in error, ', e, st);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('An error occured')),
        );
      }
      setState(() {
        _loading = false;
      });
    }
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
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.white,
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : Container(
              padding: const EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                  image: DecorationImage(
                image: Image.network(
                  "https://www.udn.vn/Portals/0/242481655_2344964658971083_7905287510387238215_n_1.jpeg",
                ).image,
                fit: BoxFit.cover,
              )),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Image.network(
                      "http://dut.udn.vn/Files/admin/images/Tin_tuc/Khac/2020/LogoDUT/image002.jpg",
                      width: 150,
                      height: 150,
                    ),
                    const SizedBox(
                      height: 30,
                    ),
                    Container(
                      decoration: BoxDecoration(
                        border: Border.all(color: AppColors.black, width: 1),
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
                                CupertinoIcons.person_alt_circle,
                                color: AppColors.black,
                              ),
                            ),
                            border: InputBorder.none,
                            hintText: 'email',
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
                        border: Border.all(color: AppColors.black, width: 1),
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
                                CupertinoIcons.padlock_solid,
                                color: AppColors.black,
                              ),
                            ),
                            border: InputBorder.none,
                            hintText: 'Mật khẩu',
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
                    Container(
                      width: 200,
                      height: 40,
                      alignment: Alignment.center,
                      margin: const EdgeInsets.only(bottom: 30, top: 20),
                      decoration: const BoxDecoration(
                        borderRadius: BorderRadius.all(Radius.circular(30)),
                        color: Color(0xFF3C61EA),
                      ),
                      child: GestureDetector(
                        onTap: _signIn,
                        child: const Text(
                          'Đăng nhập',
                          style: TextStyle(
                              fontWeight: FontWeight.w400,
                              fontSize: 15,
                              color: AppColors.white),
                        ),
                      ),
                    ),
                    Container(
                      width: 200,
                      height: 40,
                      alignment: Alignment.center,
                      decoration: const BoxDecoration(
                        borderRadius: BorderRadius.all(Radius.circular(30)),
                        color: AppColors.primary,
                      ),
                      child: GestureDetector(
                        onTap: () {
                          Navigator.of(context).push(SignUpScreen.route);
                        },
                        child: const Text(
                          'Đăng ký',
                          style: TextStyle(
                            fontWeight: FontWeight.w400,
                            fontSize: 15,
                            color: Color(0xFF3C61EA),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
    );
  }
}
