import 'reflect-metadata';
import 'zone.js/dist/zone';
import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

// Angular
import {Component, EventEmitter, OnInit} from 'angular2/core';
import {MeteorComponent} from 'angular2-meteor';
import {bootstrap} from 'angular2-meteor-auto-bootstrap';


// Admir

import {AdmirMessagingCore} from  '../client/core';

@Component({
})
export class AdmirMessagingWatchCore extends AdmirMessagingCore implements OnInit {

  constructor() {
    super();




  }

  ngOnInit() {
    console.log("I'm being called when component is initalized after constructor method in BasicAngular2 in app.ts");
  }

}

