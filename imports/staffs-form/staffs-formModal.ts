import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, Input} from 'angular2/core';
import {MeteorComponent} from 'angular2-meteor';
import {FormBuilder, ControlGroup, Validators, Control} from 'angular2/common';



// Admir
import {Staffs} from '../../imports/api/staffs';
// import {StaffsItem} from '../../imports/staffs-item/staffs-item';

import {TabView} from '../directives/tabview/tabview';
import {TabPanel} from '../directives/tabview/tabpanel';
import {StaffsTab1} from '../../imports/staffs-form/staffs-tab1';
import {StaffsTab2} from '../../imports/staffs-form/staffs-tab2';
import {ADMediaUpload} from '../directives/mediaUpload/adMediaUpload';

@Component({
  selector: 'staffs-form-modal',
  templateUrl: '/imports/staffs-form/staffs-formModal.html',
    directives: [TabView, TabPanel,StaffsTab1,StaffsTab2, ADMediaUpload],

})
export class StaffsFormModal implements OnInit {
  @Input() staffModelItem;
  staffsFormModal: ControlGroup;

  constructor() {
    let fb = new FormBuilder();

    this.staffsFormModal = fb.group({
      phone: ['', Validators.required],
      expiryDate: new Date(),
      name: ['', Validators.required],

    });

  }

  ngOnInit() {

    // console.log(this._element.outerHTML)


    // console.dir(this.staffModelItem)

  }

  addStaff(staff) {


    if (this.staffsFormModal.valid) {
      if (Meteor.userId()) {

        Meteor.call('staffs.insert', staff);

        (<Control>this.staffsFormModal.controls['name']).updateValue('');
        (<Control>this.staffsFormModal.controls['phone']).updateValue('');


      } else {
        alert('Please log in to add a staff');
      }
    }
  }
  
  ImageChangedEvent(args){
    
    var o = args;
    
   console.log(o.time)
      console.log(o.imageAsData)
      
            this.staffModelItem.imageAsData = o.imageAsData;
  }
}