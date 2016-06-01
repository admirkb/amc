import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular

import {Component, EventEmitter, OnInit, Input, ElementRef,ViewChild} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';

// Admir
import {BugsForm} from '../../../imports/bugs/bugs-form/bugs-form';

@Component({
  selector: 'bugs-item',
  templateUrl: '/imports/bugs/bugs-item/bugs-item.html',
  directives: [BugsForm],
  // properties: ['problem']
})
export class BugsItem extends MeteorComponent implements OnInit {
     @ViewChild(BugsForm) staffsForm: BugsForm;
  @Input() bugModel;
  @Input() theIndex;
  private _element: any;


  constructor(elementRef: ElementRef) {
    super();

    this._element = elementRef.nativeElement;
  }


  ngOnInit() {

    console.log(this._element.outerHTML)

  }

  public setBug(bug) {
    // bug.editColor = "purple"
    bug.editColor = "blue";
    // console.log("In setBug")
    console.dir(bug)
    this._element.style.background = "orange";

    console.dir(this._element)

    // this.bugModel.problem = bug.problem;
    // alert(this.bugModel.problem + " / " + bug.problem)

    // this.myThis.bugModel.editColor =    bug.editColor  ;
    // this.bugModel.editColor = bug.editColor;
  }

  /* */

  cancelBug(bug) {

    bug.isEditable = false;
    bug.problem = bug.origProblem;
    bug.response = bug.origResponse;

    var self = this;
    Meteor.call('bugs.update', { _id: bug._id }, { $set: { isDisabled: false, isEditable: bug.isEditable, editColor: "transparent" }  }, function (error, result) {
      // console.log("here" + bug.selfConnectionId)
      bug.isDisabled = false;
      bug.editColor = "transparent";

      var cells = self._element.getElementsByTagName("td");
      for (var i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "black";


        var inputs = cells[i].getElementsByTagName("input");
        for (var j = 0; j < inputs.length; j++) {
          if (inputs[j] != null) {
            inputs[j].disabled = false;
          }
        }

        var buttons = cells[i].getElementsByTagName("button");
        for (var j = 0; j < buttons.length; j++) {
          buttons[j].disabled = false;
        }
        console.dir(inputs)
        // console.dir(cells[i].children)
      }


      console.log("bugs.update editBug callback")
    });

  }

  updateBug(bug) {
    console.dir(bug)

    Meteor.call('bugs.update', { _id: bug._id }, { $set: { isDisabled: false, isEditable: false, problem: bug.problem, response: bug.response, dateResolved: new Date(), editColor: "transparent" } }, function (error, result) {
      // console.log("here")
      // console.dir(error)
      // console.dir(result)

      console.log("bugs.update updateBug callback")
    });

  }

  deleteBug(bug) {

    Meteor.call('bugs.remove', { _id: bug._id });
  }

  editBug(bug) {

    bug.isEditable = true;
    bug.origProblem = bug.problem;
    bug.origResponse = bug.response;

    var self = this;
    Meteor.call('bugs.update', { _id: bug._id }, { $set: { isDisabled: true, isEditable: bug.isEditable, editColor: "red" } }, function (error, result) {
      // console.log("here" + bug.selfConnectionId)
      bug.isDisabled = false;
      bug.editColor = "transparent";

      var cells = self._element.getElementsByTagName("td");
      for (var i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "black";


        var inputs = cells[i].getElementsByTagName("input");
        for (var j = 0; j < inputs.length; j++) {
          if (inputs[j] != null) {
            inputs[j].disabled = false;
          }
        }

        var buttons = cells[i].getElementsByTagName("button");
        for (var j = 0; j < buttons.length; j++) {
          buttons[j].disabled = false;
        }
        console.dir(inputs)
        // console.dir(cells[i].children)
      }


      console.log("bugs.update editBug callback")
    });


  }
  
    doModal(ev) {
      
      console.dir(ev);


  }
}
