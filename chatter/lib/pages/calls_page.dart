import 'package:chatter/models/user_information.dart';
import 'package:chatter/services/provider/contact_service_provider.dart';
import 'package:chatter/widgets/information_call_item.dart';
import 'package:flutter/material.dart';

class CallsPage extends StatefulWidget {
  const CallsPage({Key? key}) : super(key: key);
  @override
  State<CallsPage> createState() => _CallsPageState();
}

class _CallsPageState extends State<CallsPage> {
  final ContactServiceProvider contactServiceProvider =
      ContactServiceProvider();
  late List<UserInformation> contactsUser = [];
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    setState(() {
      contactsUser = contactServiceProvider.getContactsUser();
    });
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
        shrinkWrap: true,
        itemCount: contactsUser.length,
        itemBuilder: ((context, index) {
          return InformationCallItem(
            name: contactsUser[index].name,
            phone: contactsUser[index].phoneNumber,
          );
        }));
  }
}
