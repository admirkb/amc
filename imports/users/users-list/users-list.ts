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
import {UsersForm} from '../../users/users-form/users-form.ts';
import {UsersItem} from '../../users/users-item/users-item.ts';
// import {Users} from '../../imports/api/users';
import {Modal} from '../../directives/modal/modal';

import {AdmirMessagingBaseList} from '../../../client/baseList';

import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {Counts} from 'meteor/tmeasday:publish-counts';

@Component({
  selector: 'users-list',
  templateUrl: '/imports/users/users-list/users-list.html',
  directives: [UsersItem, UsersForm, Modal, PAGINATION_DIRECTIVES, FORM_DIRECTIVES, CORE_DIRECTIVES],
})
export class UsersList extends AdmirMessagingBaseList implements OnInit {
  @ViewChildren(UsersItem) usersList: QueryList<UsersItem>;

  users: Mongo.Cursor<Object>;
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
        sort: { 'emails.address': 1 }
      };


      this.subscribe('users', options, this.searchString.get(), () => {
        var self = this;


        var query = Meteor.users.find({});
        
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

      this.users = query;


      }, true);
    });


    this.autorun(() => {
      this.totalItems = Counts.get('numberOfRecords');
      this.maxPagesCalc = Math.ceil(this.totalItems / this.itemsPerPage);
    }, true);
    console.log("hello from users-list.ts")
    // this.selfConnectionId.set("Test1 !!!")

    console.log("hello from users-list.ts")
  }

  ngOnInit() {

    console.log("I'm being called when component is initalized after constructor method from users-list.ts");


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


