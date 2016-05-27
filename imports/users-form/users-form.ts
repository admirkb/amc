import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, Input, Output} from 'angular2/core';
import {MeteorComponent} from 'angular2-meteor';
import {FormBuilder, ControlGroup, Validators, Control, FORM_DIRECTIVES} from 'angular2/common';

// Admir
// import {Users} from '../../imports/api/users';
// import {Modal} from '../directives/modal/modal';
import {TabView} from '../directives/tabview/tabview';
import {TabPanel} from '../directives/tabview/tabpanel';
// import {UsersTab1} from '../../imports/users-form/users-tab1';
// import {UsersTab2} from '../../imports/users-form/users-tab2';
import {ADMediaUpload} from '../directives/mediaUpload/adMediaUpload';
// import {UsersItem} from '../../imports/users-item/users-item';


@Component({
  selector: 'users-form',
  templateUrl: '/imports/users-form/users-form.html',
  directives: [TabView, TabPanel, FORM_DIRECTIVES, ADMediaUpload],
})
export class UsersForm implements OnInit {
  @Input() userModelItem;
  @Input() action;
  usersForm: ControlGroup;
  @Output() HideDialogEvent: EventEmitter<any> = new EventEmitter();
  @Output() DeleteObjectEvent: EventEmitter<any> = new EventEmitter();
  n: number = 0;
  data: any;
  email: any;


  constructor() {

    // if (this.userModelItem == null){this.userModelItem = new Object()}
    let fb = new FormBuilder();

    this.usersForm = fb.group({
      phone: ['', Validators.required],
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


  }

  ngOnInit() {

    console.dir(this.userModelItem);
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
        $set['isDisabled'] = false;
        $set['isEditable'] = false;
        $set['editColor'] = 'transparent';
        $set['dateResolved'] = new Date();

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

  hideDialog() {
    var o = new Object();
    o.time = new Date();
    o.type = this.action

    this.HideDialogEvent.emit(o)

  }


}