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
import {UsersForm} from '../../users/users-form/users-form.ts';
import {UsersItem} from '../../users/users-item/users-item.ts';
// import {Users} from '../../imports/api/users';
import {Modal} from '../../directives/modal/modal';

@Component({
  selector: 'users-list',
  templateUrl: '/imports/users/users-list/users-list.html',
  directives: [UsersItem, UsersForm, Modal],
})
export class UsersList extends MeteorComponent implements OnInit {
  @ViewChildren(UsersItem) usersList: QueryList<UsersItem>;

  users: Mongo.Cursor<Object>;
  @Output() helloEvent: EventEmitter<any> = new EventEmitter();
  display: boolean = false;
  n: number = 0;
  data: any = new Object();
  action: string;

  constructor() {
    super();

    console.log("hello from users-list.ts")
    // this.selfConnectionId.set("Test1 !!!")

    console.log("hello from users-list.ts")
  }

  ngOnInit() {

    console.log("I'm being called when component is initalized after constructor method from users-list.ts");

    this.subscribe('users', () => {
      var self = this;

      // this.users = Users.find({});


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

          var user = o;
          if (user.editColor == 'red') {

            console.log("not interested in sending this to self!")


          };

        },
      });

      this.users = query;
    }, true);

  }



}


