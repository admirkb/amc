import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, Input} from 'angular2/core';
import {MeteorComponent} from 'angular2-meteor';
import {FormBuilder, ControlGroup, Validators, Control, FORM_DIRECTIVES} from 'angular2/common';

// Admir
import {Staffs} from '../../imports/api/staffs';
import {Modal} from '../directives/modal/modal';
import {TabView} from '../directives/tabview/tabview';
import {TabPanel} from '../directives/tabview/tabpanel';
import {StaffsTab1} from '../../imports/staffs-form/staffs-tab1';
import {StaffsTab2} from '../../imports/staffs-form/staffs-tab2';
// import {StaffsItem} from '../../imports/staffs-item/staffs-item';


@Component({
  selector: 'staffs-form',
  templateUrl: '/imports/staffs-form/staffs-form.html',
  directives: [Modal, TabView, TabPanel, StaffsTab1, StaffsTab2, FORM_DIRECTIVES],

})
export class StaffsForm implements OnInit {
  @Input() staffModelItem;
  staffsForm: ControlGroup;
  display: boolean = false;
  n: number = 0;
  data: any;

  constructor() {

    // if (this.staffModelItem == null){this.staffModelItem = new Object()}
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

    // (<Control>this.staffsForm.controls['name']).updateValue('freddy argh');

    console.dir(this.staffModelItem);

    // (<Control>this.staffsForm.controls['name']).updateValue(this.staffModelItem.name);
    // alert(this.staffModelItem.name)


    // this.staffsForm.value.name = this.staffModelItem.name;


  }

  addStaff(staff) {


    if (this.staffsForm.valid) {
      if (Meteor.userId()) {

        Meteor.call('staffs.insert', staff);

        (<Control>this.staffsForm.controls['name']).updateValue('');
        (<Control>this.staffsForm.controls['phone']).updateValue('');
        this.staffModelItem.name = "";
        this.staffModelItem.phone = "";

      } else {
        alert('Please log in to add a staff');
      }
    }
  }

  //   showDialog(n,d) {
  //      console.dir(this.staffModelItem);
  //   this.display = true;
  //   // console.log(this.display);

  //       this.n = n;
  //       this.data = d;

  //               console.log(this.n);
  //           console.dir(this.data);

  //    this.staffModelItem = this.data;

  //    this.staffsForm.value.name = this.data.name;
  // }
}