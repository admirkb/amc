import 'reflect-metadata';
import 'zone.js/dist/zone';

// Meteor
import { Meteor } from 'meteor/meteor';
import {ReactiveVar} from 'meteor/reactive-var';
import {Tracker} from 'meteor/tracker';
import {Mongo} from 'meteor/mongo';

// Angular
import {MeteorComponent} from 'angular2-meteor';
import {Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren, ContentChildren, QueryList} from '@angular/core';
import {bootstrap} from 'angular2-meteor-auto-bootstrap';
import {FormBuilder, ControlGroup, Validators, Control} from '@angular/common';

// Admir
import {StaffsForm} from '../../staffs/staffs-form/staffs-form.ts';
import {StaffsItem} from '../../staffs/staffs-item/staffs-item.ts';
import {Staffs} from '../../../imports/api/staffs';
import {Modal} from '../../directives/modal/modal';
import {AdmirMessagingBaseList} from '../../../client/baseList';

import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {Counts} from 'meteor/tmeasday:publish-counts';

@Component({
  selector: 'staffs-list',
  templateUrl: '/imports/staffs/staffs-list/staffs-list.html',
  directives: [StaffsItem, StaffsForm, Modal, PAGINATION_DIRECTIVES, FORM_DIRECTIVES, CORE_DIRECTIVES],
})
export class StaffsList extends AdmirMessagingBaseList implements OnInit {
  @ViewChildren(StaffsItem) staffsList: QueryList<StaffsItem>;

  staffs: Mongo.Cursor<Object>;
  // helloEvent: EventEmitter = new EventEmitter();
  // public selfConnectionId: ReactiveVar<string> = new ReactiveVar<string>();
  @Output() helloEvent: EventEmitter<any> = new EventEmitter();
  display: boolean = false;
  n: number = 0;
  data: any = new Object();
  action: string;

  constructor() {
    super();

    this.autorun(() => {
      let options = {
        limit: this.itemsPerPage,
        skip: (this.curPage.get() - 1) * this.itemsPerPage,
        sort: { problem: 1 }
      };

      this.searchString = "";

      // this.subscribe('parties', options, this.location.get(), () => {
      //   this.parties = Parties.find({}, { sort: { name: this.nameOrder.get() } });
      // }, true);

      this.subscribe('staffs', options, this.searchString, () => {
        var self = this;


        var query = Staffs.find({});
        
        var handle = query.observeChanges({
          added: function (id) {
            console.log("subscribe Added: " + id)
            console.dir(id)


          },
          removed: function (id) {
            console.log("subscribe Removed: " + id)
          },
          changed: function (id, o) {
            console.log("subscribe Changed: " + id)
            console.dir(o)

            var genericRecord = o;
            if (genericRecord.editColor == 'red') {


            };

          },
        });

     this.staffs = query;


      }, true);
    });


    this.autorun(() => {
      this.totalItems = Counts.get('numberOfRecords');
      this.maxPagesCalc = Math.ceil(this.totalItems / this.itemsPerPage);
    }, true);



      this.action = "add";
    this.helloEvent.subscribe((args) => {
      var self = this;

      // this.setStaffs();
      console.log("hello from helloEvent")
      // console.dir(args)

      // this.staffsList.last.setStaff(args);


      // this.staffsList.toArray().forEach((list) => {
      //   this.setStaff(list);
      // });
      //        var j = 5.1;
      // (function (j,self) {
      //     setTimeout(() => {
      //          self.setStaffs();
      //     }, 1000 * j);
      // })(j,self);



    });

    console.log("hello from staffs-list.ts")
    // this.selfConnectionId.set("Test1 !!!")


    console.log("hello from staffs-list.ts")
  }

  ngOnInit() {

    console.log("I'm being called when component is initalized after constructor method from staffs-list.ts");





  }

  setStaff(list) {
    console.log("in setStaff()")
    list.setStaff(list.staffModel);
  }


  setStaffs() {

    //  let activeTabs = this.tabs.filter((tab)=>tab.active);
    // this.staffsList.first.setDiv();
    // this.staffsList.last.setDiv();

    // this.staffsList.toArray().forEach((list) => {
    //   this.setStaff(list);
    // });


    var b = new Object();
    this.helloEvent.emit(b)

  }

  showDialog(n, data) {
    this.display = true;
    // console.log(this.display);
    //     console.log(n);
    //     this.n = n;

    //             this.data = data;
    //                     console.dir(this.data);


  }
  hideDialog(e) {
    console.dir(e)
    this.display = false;
  }

}


