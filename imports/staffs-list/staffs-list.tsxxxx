import 'reflect-metadata';
import 'zone.js/dist/zone';

// Meteor
import { Meteor } from 'meteor/meteor';
import {ReactiveVar} from 'meteor/reactive-var';
import {Tracker} from 'meteor/tracker';
import {Mongo} from 'meteor/mongo';

// Angular
import {MeteorComponent} from 'angular2-meteor';
import {Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren, ContentChildren, QueryList} from 'angular2/core';
import {bootstrap} from 'angular2-meteor-auto-bootstrap';
import {FormBuilder, ControlGroup, Validators, Control} from 'angular2/common';

// Admir
import {StaffsForm} from '../staffs-form/staffs-form.ts';
import {StaffsItem} from '../staffs-item/staffs-item.ts';
import {Staffs} from '../../imports/api/staffs';
import {Modal} from '../directives/modal/modal';

@Component({
  selector: 'staffs-list',
  templateUrl: '/imports/staffs-list/staffs-list.html',
  directives: [StaffsItem, StaffsForm, Modal],
})
export class StaffsList extends MeteorComponent implements OnInit {
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


    this.subscribe('staffs', () => {
      var self = this;

      // this.staffs = Staffs.find({});



      // bubble up event from obserchanges
      var helloEventInSubscribe = new EventEmitter();
      helloEventInSubscribe.subscribe((args) => {
        this.helloEvent.emit(args)
      });


      // var b = new Object();
      // this.helloEvent.emit(b)

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

          var staff = o;
          if (staff.editColor == 'red') {

            console.log("not interested in sending this to self!")
            // console.log("not interested in sending this to self!" + options.currentStaffId + "----<<<")
            // console.log("not interested in sending this to self!" + staff.selfConnectionId + "----<<<")
            // console.dir(staff)
            //self.stop();
            //console.log(self._session.id)
            // if (staff.selfConnectionId == options.currentStaffId) {


            // }

            // self.helloEvent.emit(staff)

            // self.staffsList.toArray().forEach((list) => {
            //   list.setStaff(list.staffModel);
            // });




            // setTimeout(() => {
            //   var staff = new Object();
            //   console.log("in timeout");
            //          helloEventInSubscribe.emit(staff);
            // }, 1000 * 5);

            // helloEventInSubscribe.emit(staff);
            // var b = new Object();
            // helloEventInSubscribe.emit(b);

          };

        },
      });

      this.staffs = query;
    }, true);



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


