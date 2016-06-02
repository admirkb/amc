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

import {CORE_DIRECTIVES} from '@angular/common';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

// Admir

import {Bugs} from '../../imports/api/bugs';
import {BugsList} from '../../imports/bugs/bugs-list/bugs-list';
// Component

@Component({
  directives: [BugsList, DROPDOWN_DIRECTIVES, CORE_DIRECTIVES],
  templateUrl: '/imports/homeView/homeView.html'
})
export class HomeView extends MeteorComponent {
    roles: Mongo.Cursor<Object>;
 public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};
  public items:Array<string> = ['The first choice!',
    'And another choice for you.', 'but wait! A third!'];

  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  constructor() {
    super();
     var query = Meteor.roles.find({});
      this.roles = query;

  }
}