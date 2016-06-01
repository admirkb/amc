import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, Input} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {FormBuilder, ControlGroup, Validators, Control} from '@angular/common';

// Admir
import {Bugs} from '../../../imports/api/bugs';



@Component({
  selector: 'bugs-form',
  templateUrl: '/imports/bugs/bugs-form/bugs-form.html',
})
export class BugsForm {
    @Input() bugModelItem;
  bugsForm: ControlGroup;

  constructor() {
    let fb = new FormBuilder();

    this.bugsForm = fb.group({
      dateCreated: new Date(),
        problem: ['', Validators.required],
        editColor: "transparent",
        tempId: null

    });
  }

  addBug(bug) {
      
     
    if (this.bugsForm.valid) {
      // if (Meteor.userId()) {
          
                  Meteor.call('bugs.insert', bug);
     
             (<Control>this.bugsForm.controls['problem']).updateValue('');
   

      // } else {
      //   alert('Please log in to add a bug');
      // }
    }
  }
}