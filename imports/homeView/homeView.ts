// Meteor

import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

// Angular
import {Component} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {Router} from '@angular/router-deprecated';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {RouterLink} from '@angular/router-deprecated';

// Admir

import {Bugs} from '../../imports/api/bugs';
import {BugsList} from '../../imports/bugs-list/bugs-list';
// Component

@Component({
  directives: [BugsList],
  templateUrl: '/imports/homeView/homeView.html'
})
export class HomeView extends MeteorComponent {


  constructor() {
    super();


  }
}