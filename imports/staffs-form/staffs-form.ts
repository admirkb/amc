import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, Input} from 'angular2/core';
import {MeteorComponent} from 'angular2-meteor';
import {FormBuilder, ControlGroup, Validators, Control} from 'angular2/common';

// Admir
import {Staffs} from '../../imports/api/staffs';
// import {StaffsItem} from '../../imports/staffs-item/staffs-item';


@Component({
  selector: 'staffs-form',
  templateUrl: '/imports/staffs-form/staffs-form.html',

})
export class StaffsForm implements OnInit {
  @Input() staffModelItem;
  staffsForm: ControlGroup;

  constructor() {
    let fb = new FormBuilder();

    this.staffsForm = fb.group({
      phone: ['', Validators.required],
      expiryDate: new Date(),
      name: ['', Validators.required],

    });

    // console.log("staffModelItem");
    // console.dir(this.staffModelItem);
  }

  ngOnInit() {

    // console.log(this._element.outerHTML)


    // console.dir(this.staffModelItem)

  }

  addStaff(staff) {


    if (this.staffsForm.valid) {
      if (Meteor.userId()) {

        Meteor.call('staffs.insert', staff);

        (<Control>this.staffsForm.controls['name']).updateValue('');
        (<Control>this.staffsForm.controls['phone']).updateValue('');


      } else {
        alert('Please log in to add a staff');
      }
    }
  }
}