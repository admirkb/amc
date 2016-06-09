import 'reflect-metadata';
import 'zone.js/dist/zone';
import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {ReactiveVar} from 'meteor/reactive-var';

// Angular
import {Component, EventEmitter, OnInit} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';


// Admir

import {AdmirMessagingCore} from  '../client/core';

@Component({
})
export class AdmirMessagingBaseList extends AdmirMessagingCore implements OnInit {
  protected searchString: ReactiveVar<string> = new ReactiveVar<string>("");
  protected totalItems: number = 0;
  protected currentPage: number = 1;
  protected curPage: ReactiveVar<number> = new ReactiveVar<number>(1);
  protected itemsPerPage: number = 6;
  // protected maxSize: number = 5;
  protected bigTotalItems: number = 175;
  protected bigCurrentPage: number = 1;
  protected maxPagesCalc = Math.ceil(this.totalItems / this.itemsPerPage);

  protected pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    this.currentPage = event.page;
    this.curPage.set(event.page);
  };
  constructor() {
    super();
  }

  ngOnInit() {
    console.log("I'm being called when component is initalized after constructor method in AdmirMessagingTrackCore in AdmirMessagingTrackCore.ts");
  }

}

