import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, Input} from 'angular2/core';
import {MeteorComponent} from 'angular2-meteor';



// Admir

import {Modal} from '../directives/modal/modal';

@Component({
  selector: 'p-modal',
  templateUrl: '/imports/modal/demo.html',
  directives: [Modal]

})
export class DemoModal implements OnInit {
  display: boolean = false;
  n: number = 0;


  constructor() {



  }

  ngOnInit() {
  }
  showDialog(n) {
    this.display = true;
    console.log(this.display);
        console.log(n);
        this.n = n;
  }

}