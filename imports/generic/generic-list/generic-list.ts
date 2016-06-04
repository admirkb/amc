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
// import {UsersForm} from '../../users/users-form/users-form.ts';
// import {UsersItem} from '../../users/users-item/users-item.ts';
// import {Users} from '../../imports/api/users';

import {GenericCollection, genericCollection} from '../../../imports/api/generic';
import {Modal} from '../../directives/modal/modal';

@Component({
  selector: 'generic-list',
  templateUrl: '/imports/generic/generic-list/generic-list.html',
  directives: [Modal],
})
export class GenericList extends MeteorComponent implements OnInit {
  // @ViewChildren(UsersItem) usersList: QueryList<UsersItem>;

  genericRecords: Mongo.Cursor<Object>;
  @Output() helloEvent: EventEmitter<any> = new EventEmitter();
  display: boolean = false;
  n: number = 0;
  data: any = new Object();
  action: string;

  constructor() {
    super();

    console.log("hello from generic-list.ts")

    console.log("hello from generic-list.ts")
  }

  ngOnInit() {

    console.log("I'm being called when component is initalized after constructor method from generic-list.ts");

    this.subscribe(genericCollection, () => {
      var self = this;

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
    }, true);

  }

}


