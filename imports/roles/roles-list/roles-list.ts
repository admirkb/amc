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
import {RolesForm} from '../../roles/roles-form/roles-form.ts';
import {RolesItem} from '../../roles/roles-item/roles-item.ts';
// import {Roles} from '../../../imports/api/roles';
import {Modal} from '../../directives/modal/modal';

@Component({
  selector: 'roles-list',
  templateUrl: '/imports/roles/roles-list/roles-list.html',
  directives: [RolesItem, RolesForm, Modal],
})
export class RolesList extends MeteorComponent implements OnInit {
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


    this.subscribe('roles', () => {
      var self = this;

      // this.roles = Roles.find({});



      // bubble up event from obserchanges
      var helloEventInSubscribe = new EventEmitter();
      helloEventInSubscribe.subscribe((args) => {
        this.helloEvent.emit(args)
      });


      // var b = new Object();
      // this.helloEvent.emit(b)

      var query = Meteor.roles.find({});
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

          var role = o;
          if (role.editColor == 'red') {

            console.log("not interested in sending this to self!")
            // console.log("not interested in sending this to self!" + options.currentRoleId + "----<<<")
            // console.log("not interested in sending this to self!" + role.selfConnectionId + "----<<<")
            // console.dir(role)
            //self.stop();
            //console.log(self._session.id)
            // if (role.selfConnectionId == options.currentRoleId) {


            // }

            // self.helloEvent.emit(role)

            // self.rolesList.toArray().forEach((list) => {
            //   list.setRole(list.roleModel);
            // });




            // setTimeout(() => {
            //   var role = new Object();
            //   console.log("in timeout");
            //          helloEventInSubscribe.emit(role);
            // }, 1000 * 5);

            // helloEventInSubscribe.emit(role);
            // var b = new Object();
            // helloEventInSubscribe.emit(b);

          };

        },
      });

      this.roles = query;
    }, true);



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


