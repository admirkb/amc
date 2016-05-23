import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, Input, Output} from 'angular2/core';
import {MeteorComponent} from 'angular2-meteor';
import {FormBuilder, ControlGroup, Validators, Control, FORM_DIRECTIVES} from 'angular2/common';

// Admir
import {Staffs} from '../../imports/api/staffs';
// import {Modal} from '../directives/modal/modal';
import {TabView} from '../directives/tabview/tabview';
import {TabPanel} from '../directives/tabview/tabpanel';
import {StaffsTab1} from '../../imports/staffs-form/staffs-tab1';
import {StaffsTab2} from '../../imports/staffs-form/staffs-tab2';
import {ADMediaUpload} from '../directives/mediaUpload/adMediaUpload';
// import {StaffsItem} from '../../imports/staffs-item/staffs-item';


@Component({
  selector: 'staffs-form',
  templateUrl: '/imports/staffs-form/staffs-form.html',
  directives: [TabView, TabPanel, StaffsTab1, StaffsTab2, FORM_DIRECTIVES, ADMediaUpload],
})
export class StaffsForm implements OnInit {
  @Input() staffModelItem;
  @Input() action;
  staffsForm: ControlGroup;
  @Output() HideDialogEvent: EventEmitter<any> = new EventEmitter();
  n: number = 0;
  data: any;


  constructor() {

    // if (this.staffModelItem == null){this.staffModelItem = new Object()}
    let fb = new FormBuilder();

    this.staffsForm = fb.group({
      phone: ['', Validators.required],
      expiryDate: new Date(),
      imageAsData: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      _id: '',

    });

    // console.log("staffModelItem");
    // console.dir(this.staffModelItem);


  }

  ngOnInit() {

    console.dir(this.staffModelItem);
    console.log("this.action")
    console.log(this.action)
  }

  addStaff(staff) {


    if (this.staffsForm.valid) {
      if (Meteor.userId()) {

        Meteor.call('staffs.insert', staff);

        (<Control>this.staffsForm.controls['name']).updateValue('');
        (<Control>this.staffsForm.controls['phone']).updateValue('');
        (<Control>this.staffsForm.controls['imageAsData']).updateValue('');
        (<Control>this.staffsForm.controls['email']).updateValue('');
        this.staffModelItem.name = "";
        this.staffModelItem.phone = "";
        this.staffModelItem.imageAsData = null;
        this.staffModelItem.email = "";

        this.hideDialog();
      } else {
        alert('Please log in to add a staff');
      }
    }
    else {
      alert('Please fill required fields');
    }
  }

  updateStaff(staff) {


    if (this.staffsForm.valid) {
      if (Meteor.userId()) {

        console.dir(staff)
            console.log("staff._id")
    console.log(staff._id)

        Meteor.call('staffs.update', { _id: staff._id }, {
          $set: {
            isDisabled: false, isEditable: false, name: staff.name,
            phone: staff.phone, dateResolved: new Date(), editColor: "transparent",
            imageAsData: staff.imageAsData, email: staff.email

          }
        }, function (error, result) {
          // console.log("here")
          // console.dir(error)
          // console.dir(result)

          console.log("staffs.update updateStaff callback")
        });

        (<Control>this.staffsForm.controls['name']).updateValue('');
        (<Control>this.staffsForm.controls['phone']).updateValue('');
        (<Control>this.staffsForm.controls['imageAsData']).updateValue('');
        (<Control>this.staffsForm.controls['email']).updateValue('');
        this.staffModelItem.name = "";
        this.staffModelItem.phone = "";
        this.staffModelItem.imageAsData = null;
        this.staffModelItem.email = "";

        this.hideDialog();
      } else {
        alert('Please log in to add a staff');
      }
    }
    else {
      alert('Please fill required fields');
    }
  }
  ImageChangedEvent(args) {

    var o = args;

    console.log(o.time)
    console.log(o.imageAsData)

    this.staffModelItem.imageAsData = o.imageAsData;
  }

  hideDialog() {
    var o = new Object();
    o.time = new Date();

    this.HideDialogEvent.emit(o)

  }


}