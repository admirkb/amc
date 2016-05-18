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
// import {LocaleHistorysForm} from '../localeHistorys-form/localeHistorys-form.ts';
import {LocaleHistorysItem} from '../localesHistory-item/localesHistory-item.ts';
import {LocaleHistorys} from '../../imports/api/localesHistory';


@Component({
  selector: 'localeHistorys-list',
  templateUrl: '/imports/localeHistorys-list/localeHistorys-list.html',
  directives: [LocaleHistorysItem],
})
export class LocaleHistorysList extends MeteorComponent implements OnInit {
  // @ViewChild(LocaleHistorysItem) firstChild: LocaleHistorysItem;
  @ViewChildren(LocaleHistorysItem) localeHistorysList: QueryList<LocaleHistorysItem>;

  localeHistorys: Mongo.Cursor<Object>;
  // helloEvent: EventEmitter = new EventEmitter();
  // public selfConnectionId: ReactiveVar<string> = new ReactiveVar<string>();
  @Output() helloEvent: EventEmitter<any> = new EventEmitter();


  constructor() {
    super();


    this.helloEvent.subscribe((args) => {
      var self = this;

      // this.setLocaleHistorys();
      console.log("hello from helloEvent")
      // console.dir(args)

      // this.localeHistorysList.last.setLocaleHistory(args);


      // this.localeHistorysList.toArray().forEach((list) => {
      //   this.setLocaleHistory(list);
      // });
      //        var j = 5.1;
      // (function (j,self) {
      //     setTimeout(() => {
      //          self.setLocaleHistorys();
      //     }, 1000 * j);
      // })(j,self);



    });

    console.log("hello from localeHistorys-list.ts")
    // this.selfConnectionId.set("Test1 !!!")


    console.log("hello from localeHistorys-list.ts")
  }

  ngOnInit() {

    console.log("I'm being called when component is initalized after constructor method from localeHistorys-list.ts");


    this.subscribe('localeHistorys', () => {
      var self = this;

      // this.localeHistorys = LocaleHistorys.find({});



      // bubble up event from obserchanges
      var helloEventInSubscribe = new EventEmitter();
      helloEventInSubscribe.subscribe((args) => {
        this.helloEvent.emit(args)
      });


      // var b = new Object();
      // this.helloEvent.emit(b)

      var query = LocaleHistorys.find({});
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

          var localeHistory = o;
          if (localeHistory.editColor == 'red') {

            console.log("not interested in sending this to self!")
            // console.log("not interested in sending this to self!" + options.currentLocaleHistoryId + "----<<<")
            // console.log("not interested in sending this to self!" + localeHistory.selfConnectionId + "----<<<")
            // console.dir(localeHistory)
            //self.stop();
            //console.log(self._session.id)
            // if (localeHistory.selfConnectionId == options.currentLocaleHistoryId) {


            // }

            // self.helloEvent.emit(localeHistory)

              // self.localeHistorysList.toArray().forEach((list) => {
              //   list.setLocaleHistory(list.localeHistoryModel);
              // });




            // setTimeout(() => {
            //   var localeHistory = new Object();
            //   console.log("in timeout");
            //          helloEventInSubscribe.emit(localeHistory);
            // }, 1000 * 5);

            // helloEventInSubscribe.emit(localeHistory);
            // var b = new Object();
            // helloEventInSubscribe.emit(b);

          };

        },
      });

      this.localeHistorys = query;
    }, true);



  }

  setLocaleHistory(list) {
    console.log("in setLocaleHistory()")
    list.setLocaleHistory(list.localeHistoryModel);
  }


  setLocaleHistorys() {

    //  let activeTabs = this.tabs.filter((tab)=>tab.active);
    // this.localeHistorysList.first.setDiv();
    // this.localeHistorysList.last.setDiv();

    // this.localeHistorysList.toArray().forEach((list) => {
    //   this.setLocaleHistory(list);
    // });


    var b = new Object();
    this.helloEvent.emit(b)

  }


}


