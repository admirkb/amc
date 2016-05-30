import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, Input, Output} from 'angular2/core';
import {MeteorComponent} from 'angular2-meteor';
import {FormBuilder, ControlGroup, Validators, Control, FORM_DIRECTIVES} from 'angular2/common';

// Admir
import {Roles} from '../../../imports/api/roles';
// import {Modal} from '../directives/modal/modal';
import {TabView} from '../../directives/tabview/tabview';
import {TabPanel} from '../../directives/tabview/tabpanel';
// import {RolesTab1} from '../../imports/roles-form/roles-tab1';
// import {RolesTab2} from '../../imports/roles-form/roles-tab2';
import {ADMediaUpload} from '../../directives/mediaUpload/adMediaUpload';
// import {RolesItem} from '../../imports/roles-item/roles-item';


@Component({
  selector: 'roles-form',
  templateUrl: '/imports/roles/roles-form/roles-form.html',
  directives: [TabView, TabPanel, FORM_DIRECTIVES, ADMediaUpload],
})
export class RolesForm implements OnInit {
  @Input() roleModelItem;
  @Input() action;
  rolesForm: ControlGroup;
  @Output() HideDialogEvent: EventEmitter<any> = new EventEmitter();
  @Output() DeleteObjectEvent: EventEmitter<any> = new EventEmitter();
  n: number = 0;
  data: any;
  email: any;


  constructor() {

    // if (this.roleModelItem == null){this.roleModelItem = new Object()}
    let fb = new FormBuilder();

    this.rolesForm = fb.group({
      imageAsData: ['', Validators.required],
      name: ['', Validators.required],
      _id: '',
      width: [320, Validators.minLength(3)],
      height: [180, Validators.minLength(3)],

    });

  }

  ngOnInit() {

    console.dir(this.roleModelItem);
    console.log("this.action")
    console.log(this.action)
  }

  addRole(role) {


    if (this.rolesForm.valid) {
      if (Meteor.userId()) {

        Meteor.call('roles.insert', role);

        /* Clear the controls */
        for (var field in this.rolesForm.controls) {
          if (field != "_id") {
            (<Control>this.rolesForm.controls[field]).updateValue('');
            this.roleModelItem[field] = "";
          }
        }

        this.hideDialog();
      } else {
        alert('Please log in to add a role');
      }
    }
    else {
      alert('Please fill required fields');
    }
  }

  updateRole(role) {


    if (this.rolesForm.valid) {
      if (Meteor.userId()) {

        /* Build up $set dynamically so we send all fields on the controls */
        var $set = {};

        for (var field in this.rolesForm.controls) {
          if (field != "_id") {
            $set[field] = this.rolesForm.controls[field].value;
          }
        }

        Meteor.call('roles.update', { _id: role._id }, {

          $set: $set
          // Static way
          // $set: { 
          //   isDisabled: false, isEditable: false,
          //   dateResolved: new Date(), editColor: "transparent",
          //   imageAsData: role.imageAsData,
          //   email: role.email, 
          //   width: role.width, 
          //   height: role.height, 
          //   name: role.name, 
          //   phone: role.phone,
          // }

        }, function (error, result) {

          console.log("roles.update updateRole callback error" + error)
        });

        this.hideDialog();
      } else {
        alert('Please log in to add a role');
      }
    }
    else {
      alert('Please fill required fields');
    }
  }

  deleteRole(role) {



    if (Meteor.userId()) {


      var o = new Object();
      o.time = new Date();
      o.type = this.action
      o.role = role;

      this.DeleteObjectEvent.emit(o)

    } else {
      alert('Please log in to add a role');
    }

  }

  ImageChangedEvent(args) {

    var o = args;

    console.log(o.time)
    console.log(o.imageAsData)

    this.roleModelItem.imageAsData = o.imageAsData;
  }

  hideDialog() {
    var o = new Object();
    o.time = new Date();
    o.type = this.action

    this.HideDialogEvent.emit(o)

  }


}