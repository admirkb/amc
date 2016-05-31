import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, Input, ElementRef} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';


@Component({
  selector: 'locales-item',
  templateUrl: '/imports/locales-item/locales-item.html',
  // properties: ['problem']
})
export class LocalesItem extends MeteorComponent implements OnInit {
  @Input() localeModel;
  @Input() theIndex;
  private _element: any;


  constructor(elementRef: ElementRef) {
    super();

    this._element = elementRef.nativeElement;
  }


  ngOnInit() {

    console.log(this._element.outerHTML)

  }

  public setLocale(locale) {
    // locale.editColor = "purple"
    locale.editColor = "blue";
    // console.log("In setLocale")
    console.dir(locale)
    this._element.style.background = "orange";

    console.dir(this._element)

    // this.localeModel.problem = locale.problem;
    // alert(this.localeModel.problem + " / " + locale.problem)

    // this.myThis.localeModel.editColor =    locale.editColor  ;
    // this.localeModel.editColor = locale.editColor;
  }

  /* */

  cancelLocale(locale) {

    locale.isEditable = false;
    locale.problem = locale.origProblem;
    locale.response = locale.origResponse;

    var self = this;
    Meteor.call('locales.update', { _id: locale._id }, { $set: { isDisabled: false, isEditable: locale.isEditable, editColor: "transparent" }  }, function (error, result) {
      // console.log("here" + locale.selfConnectionId)
      locale.isDisabled = false;
      locale.editColor = "transparent";

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


      console.log("locales.update editLocale callback")
    });

  }

  updateLocale(locale) {
    console.dir(locale)

    Meteor.call('locales.update', { _id: locale._id }, { $set: { isDisabled: false, isEditable: false, problem: locale.problem, response: locale.response, dateResolved: new Date(), editColor: "transparent" } }, function (error, result) {
      // console.log("here")
      // console.dir(error)
      // console.dir(result)

      console.log("locales.update updateLocale callback")
    });

  }

  deleteLocale(locale) {

    Meteor.call('locales.remove', { _id: locale._id });
  }

  editLocale(locale) {

    locale.isEditable = true;
    locale.origProblem = locale.problem;
    locale.origResponse = locale.response;

    var self = this;
    Meteor.call('locales.update', { _id: locale._id }, { $set: { isDisabled: true, isEditable: locale.isEditable, editColor: "red" } }, function (error, result) {
      // console.log("here" + locale.selfConnectionId)
      locale.isDisabled = false;
      locale.editColor = "transparent";

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


      console.log("locales.update editLocale callback")
    });


  }

}
