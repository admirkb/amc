import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, Input, ElementRef} from 'angular2/core';
import {MeteorComponent} from 'angular2-meteor';


@Component({
  selector: 'localeHistorys-item',
  templateUrl: '/imports/localeHistorys-item/localeHistorys-item.html',
  // properties: ['problem']
})
export class LocaleHistorysItem extends MeteorComponent implements OnInit {
  @Input() localeHistoryModel;
  @Input() theIndex;
  private _element: any;


  constructor(elementRef: ElementRef) {
    super();

    this._element = elementRef.nativeElement;
  }


  ngOnInit() {

    console.log(this._element.outerHTML)

  }

  public setLocaleHistory(localeHistory) {
    // localeHistory.editColor = "purple"
    localeHistory.editColor = "blue";
    // console.log("In setLocaleHistory")
    console.dir(localeHistory)
    this._element.style.background = "orange";

    console.dir(this._element)

    // this.localeHistoryModel.problem = localeHistory.problem;
    // alert(this.localeHistoryModel.problem + " / " + localeHistory.problem)

    // this.myThis.localeHistoryModel.editColor =    localeHistory.editColor  ;
    // this.localeHistoryModel.editColor = localeHistory.editColor;
  }

  /* */

  cancelLocaleHistory(localeHistory) {

    localeHistory.isEditable = false;
    localeHistory.problem = localeHistory.origProblem;
    localeHistory.response = localeHistory.origResponse;

    var self = this;
    Meteor.call('localeHistorys.update', { _id: localeHistory._id }, { $set: { isDisabled: false, isEditable: localeHistory.isEditable, editColor: "transparent" }  }, function (error, result) {
      // console.log("here" + localeHistory.selfConnectionId)
      localeHistory.isDisabled = false;
      localeHistory.editColor = "transparent";

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


      console.log("localeHistorys.update editLocaleHistory callback")
    });

  }

  updateLocaleHistory(localeHistory) {
    console.dir(localeHistory)

    Meteor.call('localeHistorys.update', { _id: localeHistory._id }, { $set: { isDisabled: false, isEditable: false, problem: localeHistory.problem, response: localeHistory.response, dateResolved: new Date(), editColor: "transparent" } }, function (error, result) {
      // console.log("here")
      // console.dir(error)
      // console.dir(result)

      console.log("localeHistorys.update updateLocaleHistory callback")
    });

  }

  deleteLocaleHistory(localeHistory) {

    Meteor.call('localeHistorys.remove', { _id: localeHistory._id });
  }

  editLocaleHistory(localeHistory) {

    localeHistory.isEditable = true;
    localeHistory.origProblem = localeHistory.problem;
    localeHistory.origResponse = localeHistory.response;

    var self = this;
    Meteor.call('localeHistorys.update', { _id: localeHistory._id }, { $set: { isDisabled: true, isEditable: localeHistory.isEditable, editColor: "red" } }, function (error, result) {
      // console.log("here" + localeHistory.selfConnectionId)
      localeHistory.isDisabled = false;
      localeHistory.editColor = "transparent";

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


      console.log("localeHistorys.update editLocaleHistory callback")
    });


  }

}
