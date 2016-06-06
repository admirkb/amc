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
// import { PaginationService, PaginatePipe, PaginationControlsCmp } from 'angular2-pagination';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import {Counts} from 'meteor/tmeasday:publish-counts';

// Admir
// import {UsersForm} from '../../users/users-form/users-form.ts';
// import {UsersItem} from '../../users/users-item/users-item.ts';
// import {Users} from '../../imports/api/users';
import {AdmirMessagingBaseList} from '../../../client/baseList';

import {GenericCollection, genericCollection} from '../../../imports/api/generic';
import {Modal} from '../../directives/modal/modal';

@Component({
  selector: 'generic-list',
  templateUrl: function () {
    return 1 == 0 ? '/imports/generic/generic-list/generic-list.html' : '/imports/generic/generic-list/generic-list-2.html';
  } (),
  directives: [Modal, PAGINATION_DIRECTIVES, FORM_DIRECTIVES, CORE_DIRECTIVES],

})
export class GenericList extends AdmirMessagingBaseList implements OnInit {
  // @ViewChildren(UsersItem) usersList: QueryList<UsersItem>;

  genericRecords: Mongo.Cursor<Object>;
  @Output() helloEvent: EventEmitter<any> = new EventEmitter();
  display: boolean = false;
  n: number = 0;
  data: any = new Object();
  action: string;
  arr: [];


  constructor() {
    super();

    this.autorun(() => {
      let options = {
        limit: this.itemsPerPage,
        skip: (this.curPage.get() - 1) * this.itemsPerPage,
        sort: { problem: 1 }
      };

      this.searchString = "Gen";

      // this.subscribe('parties', options, this.location.get(), () => {
      //   this.parties = Parties.find({}, { sort: { name: this.nameOrder.get() } });
      // }, true);

      this.subscribe(genericCollection, options, this.searchString, () => {
        var self = this;

// var yyyy = GenericCollection.find().map( function(u) { return u; } ).forEach(function (obj) {

//         });
// this.genericRecords2 = yyyy;

//         var xxxx = GenericCollection.find({}).forEach(function (obj) {
//           console.log("obj2")
//           console.dir(obj)
//         });
        
        var query = GenericCollection.find({});
        
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

        this.genericRecords = query;


        console.dir("this.genericRecords");
        console.log(this.genericRecords.fetch().length);

        console.dir(this.genericRecords.fetch()[0]);
        this.arr = [];

        var data = this.genericRecords.fetch();

        for (var i = 0; i < data.length; i++) {
          var obj = data[i];
          this.arr.push(Object.keys(obj).map(function (key) { return obj[key] }));

        }
        // var obj = {1: 11, 2: 22};
        // var obj = this.genericRecords.fetch()[0];
        // this.arr.push(Object.keys(obj).map(function (key) { return obj[key] }));
        // obj = this.genericRecords.fetch()[1];
        // this.arr.push(Object.keys(obj).map(function (key) { return obj[key] }));
        console.dir(this.arr)

      }, true);
    });


    this.autorun(() => {
      this.totalItems = Counts.get('numberOfRecords');
      this.maxPagesCalc = Math.ceil(this.totalItems / this.itemsPerPage);
    }, true);
    
    
    console.log("hello from generic-list.ts")

    console.log("hello from generic-list.ts")
  }

  ngOnInit() {

    console.log("I'm being called when component is initalized after constructor method from generic-list.ts");

  }

  // onPageChanged(page: number) {
  //   this.curPage.set(page);
  // }

  // search(value: string) {
  //   this.curPage.set(1);
  //   // this.location.set(value);
  // }

  // changeSortOrder(nameOrder: string) {
  //   this.nameOrder.set(parseInt(nameOrder));
  // }
}


