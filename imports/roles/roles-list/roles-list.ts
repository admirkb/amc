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
import {RolesForm} from '../../roles/roles-form/roles-form.ts';
import {RolesItem} from '../../roles/roles-item/roles-item.ts';
// import {Roles} from '../../../imports/api/roles';
import {Modal} from '../../directives/modal/modal';
import {AdmirMessagingBaseList} from '../../../client/baseList';

import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {Counts} from 'meteor/tmeasday:publish-counts';

@Component({
  selector: 'roles-list',
  templateUrl: '/imports/roles/roles-list/roles-list.html',
  directives: [RolesItem, RolesForm, Modal, PAGINATION_DIRECTIVES, FORM_DIRECTIVES, CORE_DIRECTIVES],
})
export class RolesList extends AdmirMessagingBaseList implements OnInit {
  @ViewChildren(RolesItem) rolesList: QueryList<RolesItem>;

  roles: Mongo.Cursor<Object>;
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
        sort: { name: 1 }
      };


      this.subscribe('roles', options, this.searchString.get(), () => {
        var self = this;

        console.log("running this.roles= Meteor.roles.find({});")
        // this.roles = Meteor.roles.remove({});
        this.roles = Meteor.roles.find({});


        // var handle = this.roles.observeChanges({
        //   added: function (id) {
        //     console.log("subscribe Added: " + id)
        //     console.dir(id)


        //   },
        //   removed: function (id) {
        //     console.log("subscribe Removed: " + id)
        //   },
        //   changed: function (id, o) {
        //     console.log("subscribe Changed: " + id)
        //     console.dir(o)

        //     var genericRecord = o;
        //     if (genericRecord.editColor == 'red') {


        //     };

        //   },
        // });

        //  this.roles = query;


      }, true);
    });


    this.autorun(() => {
      this.totalItems = Counts.get('numberOfRecords');
      this.maxPagesCalc = Math.ceil(this.totalItems / this.itemsPerPage);
    }, true);



    this.action = "add";
    this.helloEvent.subscribe((args) => {
      var self = this;

      // this.setRoles();
      console.log("hello from helloEvent")
      // console.dir(args)

      // this.rolesList.last.setRole(args);


      // this.rolesList.toArray().forEach((list) => {
      //   this.setRole(list);
      // });
      //        var j = 5.1;
      // (function (j,self) {
      //     setTimeout(() => {
      //          self.setRoles();
      //     }, 1000 * j);
      // })(j,self);



    });

    console.log("hello from roles-list.ts")
    // this.selfConnectionId.set("Test1 !!!")


    console.log("hello from roles-list.ts")
  }

  ngOnInit() {

    console.log("I'm being called when component is initalized after constructor method from roles-list.ts");



  }


  setRole(list) {
    console.log("in setRole()")
    list.setRole(list.roleModel);
  }


  setRoles() {

    //  let activeTabs = this.tabs.filter((tab)=>tab.active);
    // this.rolesList.first.setDiv();
    // this.rolesList.last.setDiv();

    // this.rolesList.toArray().forEach((list) => {
    //   this.setRole(list);
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


