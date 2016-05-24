import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, Input, ElementRef, ViewChild} from 'angular2/core';
import {MeteorComponent} from 'angular2-meteor';

// Admir


import {StaffsForm} from '../../imports/staffs-form/staffs-form';
import {StaffsFormModal} from '../../imports/staffs-form/staffs-formModal';
import {Modal} from '../directives/modal/modal';

@Component({
  selector: 'staffs-item',
  templateUrl: '/imports/staffs-item/staffs-item.html',
  directives: [StaffsForm, StaffsFormModal, Modal],
  // properties: ['problem']
})
export class StaffsItem extends MeteorComponent implements OnInit {
  @ViewChild(StaffsForm) staffsForm: StaffsForm;
  // @ViewChild(StaffsFormModal) staffsForm: StaffsFormModal;
  @Input() staffModel;
  @Input() theIndex;
  private _element: any;
   display: boolean = false;
  action: string;

  constructor(elementRef: ElementRef) {
    super();

    this.action = "update";
    this._element = elementRef.nativeElement;




  }


  ngOnInit() {

    // console.log(this._element.outerHTML)

  }

  public setStaff(staff) {
    // staff.editColor = "purple"
    staff.editColor = "blue";
    // console.log("In setStaff")
    console.dir(staff)
    this._element.style.background = "orange";

    console.dir(this._element)

    // this.staffModel.problem = staff.problem;
    // alert(this.staffModel.problem + " / " + staff.problem)

    // this.myThis.staffModel.editColor =    staff.editColor  ;
    // this.staffModel.editColor = staff.editColor;
  }

  /* */

  cancelStaff(staff) {

    staff.isEditable = false;
    staff.problem = staff.origProblem;
    staff.response = staff.origResponse;

    var self = this;
    Meteor.call('staffs.update', { _id: staff._id }, { $set: { isDisabled: false, isEditable: staff.isEditable, editColor: "transparent" } }, function (error, result) {
      // console.log("here" + staff.selfConnectionId)
      staff.isDisabled = false;
      staff.editColor = "transparent";

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


      console.log("staffs.update editStaff callback")
    });

  }

  updateStaff(staff) {
    console.dir(staff)

    Meteor.call('staffs.update', { _id: staff._id }, {
          $set: {
            isDisabled: false, isEditable: false, name: staff.name,
            phone: staff.phone, dateResolved: new Date(), editColor: "transparent",
            imageAsData: staff.imageAsData, email: staff.email, width: staff.width, height: staff.height

          }
    }, function (error, result) {
      // console.log("here")
      // console.dir(error)
      // console.dir(result)

      console.log("staffs.update updateStaff callback")
    });

  }

  deleteStaff(staff) {

    Meteor.call('staffs.remove', { _id: staff._id });
  }

  editStaff(staff) {

    staff.isEditable = true;
    staff.origProblem = staff.problem;
    staff.origResponse = staff.response;

    var self = this;
    Meteor.call('staffs.update', { _id: staff._id }, { $set: { isDisabled: true, isEditable: staff.isEditable, editColor: "red" } }, function (error, result) {
      // console.log("here" + staff.selfConnectionId)
      staff.isDisabled = false;
      staff.editColor = "transparent";

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


      console.log("staffs.update editStaff callback")
    });


  }

  runStaff(staff) {

    alert(staff._id);
  }

  doModal(ev) {

    console.dir(ev);
    var button = ev.relatedTarget;
    console.dir(button)
    //     var self = this;
    // // var cells =  self._element.getElementsByTagName("td");

    // var cells =  self._element.getElementsByTagName("td");

    // console.dir(cells)
    // // t.attr('data-target','#myModal1');

    // console.dir(this._element)
    // this._element.style.background = "orange";
    // var modal = this._element.getElementById('myModal1');
    // console.log(modal)
    // onclick="$($(this).data('myModal1')).modal('show');"
    //  this._element.getElementById('myModal1').modal('show');

    // $('#testButton').attr('data-target','#testModal2');
  }

  showDialog(n, data) {
    this.display = true;
    // console.log(this.display);
    //     console.log(n);
    //     this.n = n;

    //             this.data = data;
    //                     console.dir(this.data);


  }

  hideDialog(e) {
    console.dir(e)
    this.display = false;
  }
}
