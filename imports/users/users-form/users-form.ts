import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

// Angular
import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {FormBuilder, ControlGroup, Validators, Control, FORM_DIRECTIVES} from '@angular/common';

// Admir
// import {Users} from '../../imports/api/users';
// import {Modal} from '../directives/modal/modal';
import {TabView} from '../../directives/tabview/tabview';
import {TabPanel} from '../../directives/tabview/tabpanel';
// import {UsersTab1} from '../../imports/users-form/users-tab1';
// import {UsersTab2} from '../../imports/users-form/users-tab2';
import {ADMediaUpload} from '../../directives/mediaUpload/adMediaUpload';
// import {UsersItem} from '../../imports/users-item/users-item';

import {CORE_DIRECTIVES} from '@angular/common';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'users-form',
  templateUrl: '/imports/users/users-form/users-form.html',
  directives: [TabView, TabPanel, FORM_DIRECTIVES, ADMediaUpload, CORE_DIRECTIVES, DROPDOWN_DIRECTIVES],
})
export class UsersForm extends MeteorComponent implements OnInit {
  @Input() userModelItem;
  @Input() action;
  usersForm: ControlGroup;
  @Output() HideDialogEvent: EventEmitter<any> = new EventEmitter();
  @Output() DeleteObjectEvent: EventEmitter<any> = new EventEmitter();
  n: number = 0;
  data: any;
  email: any;
  roles2: Mongo.Cursor<Object>;
  savedRoles: Array<string> = [];

  public disabled: boolean = false;
  public status: { isopen: boolean } = { isopen: false };
  // public items: Array<string> = ['Butcher',
  //   'Candlestick maker', 'Baker'];
  public items: Array<string> = [];
  private searchString: string = ""

  constructor() {
    super()


    // if (this.userModelItem == null){this.userModelItem = new Object()}
    let fb = new FormBuilder();

    this.usersForm = fb.group({
      createdAt: ['', Validators.required],
      expiryDate: new Date(),
      imageAsData: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      _id: '',
      width: [320, Validators.minLength(3)],
      height: [180, Validators.minLength(3)],


    });

    this.email = this.usersForm.controls['email'];
    this.email.valueChanges.subscribe(
      (value: string) => {
        console.log('email changed to:', value);
      }
    );
    // console.log("userModelItem");
    // console.dir(this.userModelItem);

    var self = this;
    Meteor.call('roles.getRoleNames' , function (error, result) {

      result.forEach(function (role) {
        self.items.push(role.name)
        console.dir(role)
      });
    });

    // Meteor.call('getCurrentTime' , function (error, result) {

    //   console.log("getCurrentTime callback")
    //        console.log(result)
    // });






  }

  ngOnInit() {


        if (this.userModelItem.roles != null) {
          console.log("this.userModelItem.roles.default-group");
          console.dir(this.userModelItem.roles['default-group']);

          for (var i = 0; i < this.userModelItem.roles['default-group'].length; i++) {

            this.savedRoles.push(this.userModelItem.roles['default-group'][i]);



            // Remove new role from dropdown list, not available    
            var dropDownindex = this.items.indexOf(this.userModelItem.roles['default-group'][i], 0);
            if (dropDownindex > -1) {
              this.items.splice(dropDownindex, 1);
            }


          }
          // this.savedRoles = this.userModelItem.roles['default-group'];

          console.log("this.savedRoles");
          console.dir(this.savedRoles);

        }

    console.log("this.action")
    console.log(this.action)
  }

  addUser(user) {


    if (this.usersForm.valid) {
      if (Meteor.userId()) {

        Meteor.call('users.insert', user);

        /* Clear the controls */
        for (var field in this.usersForm.controls) {
          if (field != "_id") {
            (<Control>this.usersForm.controls[field]).updateValue('');
            this.userModelItem[field] = "";
          }
        }

        this.hideDialog();
      } else {
        alert('Please log in to add a user');
      }
    }
    else {
      alert('Please fill required fields');
    }
  }

  updateUser(user) {


    if (this.usersForm.valid) {
      if (Meteor.userId()) {

        // console.dir(user)
        // console.log("user._id")
        // console.log(user._id)
        // console.log(this.usersForm.value);
        // console.dir(this.usersForm.controls);

        /* Build up $set dynamically so we send all fields on the controls */
        var $set = {};

        for (var field in this.usersForm.controls) {
          if (field != "_id") {
            $set[field] = this.usersForm.controls[field].value;
          }
        }

        $set['roles'] = { 'default-group': this.userModelItem.roles['default-group'] };


        Meteor.call('users.update', { _id: user._id }, {

          $set: $set
          // Static way
          // $set: { 
          //   isDisabled: false, isEditable: false,
          //   dateResolved: new Date(), editColor: "transparent",
          //   imageAsData: user.imageAsData,
          //   email: user.email, 
          //   width: user.width, 
          //   height: user.height, 
          //   name: user.name, 
          //   phone: user.phone,
          // }

        }, function (error, result) {

          console.log("users.update updateUser callback error" + error)
        });


        /* Clear the controls */
        // for (var field in this.usersForm.controls) {
        //   if (field != "_id") {
        //     (<Control>this.usersForm.controls[field]).updateValue('');
        //     this.userModelItem[field] = "";
        //   }
        // }

        // (<Control>this.usersForm.controls['name']).updateValue('');
        // (<Control>this.usersForm.controls['phone']).updateValue('');
        // (<Control>this.usersForm.controls['imageAsData']).updateValue('');
        // (<Control>this.usersForm.controls['email']).updateValue('');
        // this.userModelItem.name = "";
        // this.userModelItem.phone = "";
        // this.userModelItem.imageAsData = null;
        // this.userModelItem.email = "";

        this.hideDialog();
      } else {
        alert('Please log in to add a user');
      }
    }
    else {
      alert('Please fill required fields');
    }
  }

  deleteUser(user) {



    if (Meteor.userId()) {


      var o = new Object();
      o.time = new Date();
      o.type = this.action
      o.user = user;

      this.DeleteObjectEvent.emit(o)

    } else {
      alert('Please log in to add a user');
    }

  }

  ImageChangedEvent(args) {

    var o = args;

    console.log(o.time)
    console.log(o.imageAsData)

    this.userModelItem.imageAsData = o.imageAsData;
  }
  cancelUser(user) {

    if (Meteor.userId()) {

      // Reset everything...
      this.userModelItem.roles['default-group'] = [];
      for (var i = 0; i < this.savedRoles.length; i++) {

        this.userModelItem.roles['default-group'].push(this.savedRoles[i]);
      }

      // this.userModelItem.roles['default-group'] = this.savedRoles;
      // console.dir(this.userModelItem.roles['default-group']);
      // console.dir(this.savedRoles);

      this.items = [];
      this.roles = Meteor.roles.find({}, { sort: { name: 1 } });
      this.roles.forEach((role) => {
        this.items.push(role.name)
      });

      // Remove new role from dropdown list, not available    
      for (var i = 0; i < this.userModelItem.roles['default-group'].length; i++) {
        var dropDownindex = this.items.indexOf(this.userModelItem.roles['default-group'][i], 0);
        if (dropDownindex > -1) {
          this.items.splice(dropDownindex, 1);
        }

      }


      this.hideDialog();


    } else {
      alert('Please log in to add a user');
    }

  }

  hideDialog() {
    var o = new Object();
    o.time = new Date();
    o.type = this.action


    this.HideDialogEvent.emit(o)

  }
  removeRole(role) {


    // Remove role from users list
    console.dir(this.userModelItem.roles['default-group'])

    var array = this.userModelItem.roles['default-group'];
    var index = array.indexOf(role, 0);
    if (index > -1) {
      array.splice(index, 1);
    }

    console.dir(this.userModelItem.roles['default-group'])

    // Add role to dropdown list as now available again
    this.items.push(role)


  }



  newRole() {

    console.dir(this.userModelItem.roles['default-group'])

    var array = this.userModelItem.roles['default-group'];
    array.push('')

  }


  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  public dropDownRoleClick(newRole, origRole, index) {
    console.dir(newRole)

    for (var i = 0; i < this.userModelItem.roles['default-group'].length; i++) {

      if (i == index) {
        // console.log(this.userModelItem.roles['default-group'][i] + " / " + origRole + " / " + newRole)
        this.userModelItem.roles['default-group'][i] = newRole;
      }
    }

    // Remove new role from dropdown list, not available    var array = this.userModelItem.roles['default-group'];
    var dropDownindex = this.items.indexOf(newRole, 0);
    if (dropDownindex > -1) {
      this.items.splice(dropDownindex, 1);
      this.items.push(origRole)
    }

  }
}