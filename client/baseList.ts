import 'reflect-metadata';
import 'zone.js/dist/zone';
import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {ReactiveVar} from 'meteor/reactive-var';

// Angular
import {Component, EventEmitter, OnInit} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {Counts} from 'meteor/tmeasday:publish-counts';

// Admir

import {AdmirMessagingCore} from  '../client/core';

@Component({
})
export class AdmirMessagingBaseList extends AdmirMessagingCore implements OnInit {
  public searchString: string;
  public totalItems: number = 64;
  public currentPage: number = 1;
  public curPage: ReactiveVar<number> = new ReactiveVar<number>(1);
  public itemsPerPage: number = 5;
  public maxSize: number = 5;
  public bigTotalItems: number = 175;
  public bigCurrentPage: number = 1;
  public maxPagesCalc = Math.ceil(this.totalItems / this.itemsPerPage);

  public pageChanged(event: any): void {
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

