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
// import {LocalesForm} from '../locales-form/locales-form.ts';
import {LocalesItem} from '../locales-item/locales-item.ts';
import {Locales} from '../../imports/api/locales';


@Component({
  selector: 'locales-list',
  templateUrl: '/imports/locales-list/locales-list.html',
  directives: [LocalesItem],
})
export class LocalesList extends MeteorComponent implements OnInit {
  // @ViewChild(LocalesItem) firstChild: LocalesItem;
  @ViewChildren(LocalesItem) localesList: QueryList<LocalesItem>;

  locales: Mongo.Cursor<Object>;
  // helloEvent: EventEmitter = new EventEmitter();
  // public selfConnectionId: ReactiveVar<string> = new ReactiveVar<string>();
  @Output() helloEvent: EventEmitter<any> = new EventEmitter();


  constructor() {
    super();


    this.helloEvent.subscribe((args) => {
      var self = this;

      // this.setLocales();
      console.log("hello from helloEvent")
      // console.dir(args)

      // this.localesList.last.setLocale(args);


      // this.localesList.toArray().forEach((list) => {
      //   this.setLocale(list);
      // });
      //        var j = 5.1;
      // (function (j,self) {
      //     setTimeout(() => {
      //          self.setLocales();
      //     }, 1000 * j);
      // })(j,self);



    });

    console.log("hello from locales-list.ts")
    // this.selfConnectionId.set("Test1 !!!")


    console.log("hello from locales-list.ts")
  }

  ngOnInit() {

    console.log("I'm being called when component is initalized after constructor method from locales-list.ts");


    this.subscribe('locales', () => {
      var self = this;

      // this.locales = Locales.find({});



      // bubble up event from obserchanges
      var helloEventInSubscribe = new EventEmitter();
      helloEventInSubscribe.subscribe((args) => {
        this.helloEvent.emit(args)
      });


      // var b = new Object();
      // this.helloEvent.emit(b)

      var query = Locales.find({});
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

          var locale = o;
          if (locale.editColor == 'red') {

            console.log("not interested in sending this to self!")
            // console.log("not interested in sending this to self!" + options.currentLocaleId + "----<<<")
            // console.log("not interested in sending this to self!" + locale.selfConnectionId + "----<<<")
            // console.dir(locale)
            //self.stop();
            //console.log(self._session.id)
            // if (locale.selfConnectionId == options.currentLocaleId) {


            // }

            // self.helloEvent.emit(locale)

              // self.localesList.toArray().forEach((list) => {
              //   list.setLocale(list.localeModel);
              // });




            // setTimeout(() => {
            //   var locale = new Object();
            //   console.log("in timeout");
            //          helloEventInSubscribe.emit(locale);
            // }, 1000 * 5);

            // helloEventInSubscribe.emit(locale);
            // var b = new Object();
            // helloEventInSubscribe.emit(b);

          };

        },
      });

      this.locales = query;
    }, true);



  }

  setLocale(list) {
    console.log("in setLocale()")
    list.setLocale(list.localeModel);
  }


  setLocales() {

    //  let activeTabs = this.tabs.filter((tab)=>tab.active);
    // this.localesList.first.setDiv();
    // this.localesList.last.setDiv();

    // this.localesList.toArray().forEach((list) => {
    //   this.setLocale(list);
    // });


    var b = new Object();
    this.helloEvent.emit(b)

  }


}


