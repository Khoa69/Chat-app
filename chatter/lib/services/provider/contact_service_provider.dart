import 'dart:convert';
import 'package:chatter/models/user_information.dart';
import 'package:collection/collection.dart';
import 'package:fast_contacts/fast_contacts.dart';
import 'package:permission_handler/permission_handler.dart';

class ContactServiceProvider {
  List<Contact>? _contacts;
  List<UserInformation> _contactsAvailable = [];
  List _contactsJson = [];
  List _contactsJsonUpdate = [];

  bool _permissionAccept = false;
  bool _needUpdate = false;
  int _index = 1;
  bool _trueDenied = false;

  ContactServiceProvider._privateConstructor();

  static final ContactServiceProvider _instance =
      ContactServiceProvider._privateConstructor();

  factory ContactServiceProvider() {
    return _instance;
  }
  Future fetchContacts() async {
    var oldTime = DateTime.now().millisecondsSinceEpoch;
    await Permission.contacts.shouldShowRequestRationale;
    PermissionStatus result = await Permission.contacts.request();
    if (result.isGranted != true) {
      if (_index > 1) {
        openAppSettings();
      }
      _index++;
      _trueDenied = true;
    } else {
      if (_permissionAccept == false) {
        final contacts = await FastContacts.allContacts;

        _contacts = contacts;

        for (int i = 0; i < _contacts!.length; i++) {
          if (_contacts![i].phones.isNotEmpty &&
              _contacts![i].displayName != "") {
            _contactsAvailable.add(UserInformation(
              id: i,
              phoneNumber: _contacts![i]
                  .phones[0]
                  .replaceAll(' ', '')
                  .replaceAll('-', ''),
              name: _contacts![i].displayName,
            ));
          }
        }
        print(_contactsAvailable);

        _trueDenied = false;

        _permissionAccept = true;
      }
    }
    print("time = ${DateTime.now().millisecondsSinceEpoch - oldTime} ms");
  }

  List getContactsJson() {
    return _contactsJson;
  }

  List getContactsJsonUpdate() {
    return _contactsJson;
  }

  bool? getPermission() {
    return this._permissionAccept;
  }

  bool? getNeedUpdate() {
    return this._needUpdate;
  }

  bool getTrueDenied() {
    return this._trueDenied;
  }

  List<Contact>? getContacts() {
    return this._contacts;
  }

  void setNeedUpdate() {
    this._needUpdate = false;
  }

  List<UserInformation> getContactsUser() {
    return this._contactsAvailable;
  }
}
