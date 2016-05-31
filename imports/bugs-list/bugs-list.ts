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
import {BugsForm} from '../bugs-form/bugs-form.ts';
import {BugsItem} from '../bugs-item/bugs-item.ts';
import {Bugs} from '../../imports/api/bugs';


@Component({
  selector: 'bugs-list',
  templateUrl: '/imports/bugs-list/bugs-list.html',
  directives: [BugsForm, BugsItem],
})
export class BugsList extends MeteorComponent implements OnInit {
  // @ViewChild(BugsItem) firstChild: BugsItem;
  @ViewChildren(BugsItem) bugsList: QueryList<BugsItem>;

  bugs: Mongo.Cursor<Object>;
  // helloEvent: EventEmitter = new EventEmitter();
  // public selfConnectionId: ReactiveVar<string> = new ReactiveVar<string>();
  @Output() helloEvent: EventEmitter<any> = new EventEmitter();


  constructor() {
    super();


    this.helloEvent.subscribe((args) => {
      var self = this;

      // this.setBugs();
      console.log("hello from helloEvent")
      // console.dir(args)

      // this.bugsList.last.setBug(args);


      // this.bugsList.toArray().forEach((list) => {
      //   this.setBug(list);
      // });
      //        var j = 5.1;
      // (function (j,self) {
      //     setTimeout(() => {
      //          self.setBugs();
      //     }, 1000 * j);
      // })(j,self);



    });

    console.log("hello from bugs-list.ts")
    // this.selfConnectionId.set("Test1 !!!")


    console.log("hello from bugs-list.ts")
  }

  ngOnInit() {

    console.log("I'm being called when component is initalized after constructor method from bugs-list.ts");


    this.subscribe('bugs', () => {
      var self = this;

      // this.bugs = Bugs.find({});



      // bubble up event from obserchanges
      var helloEventInSubscribe = new EventEmitter();
      helloEventInSubscribe.subscribe((args) => {
        this.helloEvent.emit(args)
      });


      // var b = new Object();
      // this.helloEvent.emit(b)

      var query = Bugs.find({});
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

          var bug = o;
          if (bug.editColor == 'red') {

            console.log("not interested in sending this to self!")
            // console.log("not interested in sending this to self!" + options.currentBugId + "----<<<")
            // console.log("not interested in sending this to self!" + bug.selfConnectionId + "----<<<")
            // console.dir(bug)
            //self.stop();
            //console.log(self._session.id)
            // if (bug.selfConnectionId == options.currentBugId) {


            // }

            // self.helloEvent.emit(bug)

              // self.bugsList.toArray().forEach((list) => {
              //   list.setBug(list.bugModel);
              // });




            // setTimeout(() => {
            //   var bug = new Object();
            //   console.log("in timeout");
            //          helloEventInSubscribe.emit(bug);
            // }, 1000 * 5);

            // helloEventInSubscribe.emit(bug);
            // var b = new Object();
            // helloEventInSubscribe.emit(b);

          };

        },
      });

      this.bugs = query;
    }, true);



  }

  setBug(list) {
    console.log("in setBug()")
    list.setBug(list.bugModel);
  }


  setBugs() {

    //  let activeTabs = this.tabs.filter((tab)=>tab.active);
    // this.bugsList.first.setDiv();
    // this.bugsList.last.setDiv();

    // this.bugsList.toArray().forEach((list) => {
    //   this.setBug(list);
    // });


    var b = new Object();
    this.helloEvent.emit(b)

  }


}


