import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';

// Admir


import {RolesForm} from '../../../imports/roles/roles-form/roles-form';
import {Modal} from '../../directives/modal/modal';
import {Modal2} from '../../directives/modal/modal2';
import {ModalAdmir} from '../../directives/modal/modalAdmir';

@Component({
  selector: 'roles-item',
  templateUrl: '/imports/roles/roles-item/roles-item.html',
  directives: [RolesForm, Modal, Modal2,ModalAdmir],
  // properties: ['problem']
})
export class RolesItem extends MeteorComponent implements OnInit {
  @ViewChild(RolesForm) rolesForm: RolesForm;
  // @ViewChild(RolesFormModal) rolesForm: RolesFormModal;
  @Input() roleModel;
  @Input() theIndex;
  private _element: any;
  display: boolean = false;
  displayDeleteModal: boolean = false;
  admirShowValue: boolean = false;
  action: string;

  constructor(elementRef: ElementRef) {
    super();

    this.action = "update";
    this._element = elementRef.nativeElement;




  }


  ngOnInit() {

    // console.log(this._element.outerHTML)

  }

  public setRole(role) {
    // role.editColor = "purple"
    role.editColor = "blue";
    // console.log("In setRole")
    console.dir(role)
    this._element.style.background = "orange";

    console.dir(this._element)

    // this.roleModel.problem = role.problem;
    // alert(this.roleModel.problem + " / " + role.problem)

    // this.myThis.roleModel.editColor =    role.editColor  ;
    // this.roleModel.editColor = role.editColor;
  }

  /* */

  cancelRole(role) {

    role.isEditable = false;
    role.problem = role.origProblem;
    role.response = role.origResponse;

    var self = this;
    Meteor.call('roles.update', { _id: role._id }, { $set: { isDisabled: false, isEditable: role.isEditable, editColor: "transparent" } }, function (error, result) {
      // console.log("here" + role.selfConnectionId)
      role.isDisabled = false;
      role.editColor = "transparent";

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


      console.log("roles.update editRole callback")
    });

  }

  updateRole(role) {
    console.dir(role)

    Meteor.call('roles.update', { _id: role._id }, {
      $set: {
        isDisabled: false, isEditable: false, name: role.name,
        phone: role.phone, dateResolved: new Date(), editColor: "transparent",
        imageAsData: role.imageAsData, email: role.email, width: role.width, height: role.height

      }
    }, function (error, result) {
      // console.log("here")
      // console.dir(error)
      // console.dir(result)

      console.log("roles.update updateRole callback")
    });

  }

  deleteRole(o) {

    Meteor.call('roles.remove', { _id: o.role._id });
        this.hideDialog('delete')
  }

  editRole(role) {

    role.isEditable = true;
    role.origProblem = role.problem;
    role.origResponse = role.response;

    var self = this;
    Meteor.call('roles.update', { _id: role._id }, { $set: { isDisabled: true, isEditable: role.isEditable, editColor: "red" } }, function (error, result) {
      // console.log("here" + role.selfConnectionId)
      role.isDisabled = false;
      role.editColor = "transparent";

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


      console.log("roles.update editRole callback")
    });


  }

  runRole(role) {

    alert(role._id);
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

  xxxxShow() {
   console.log(this.admirShowValue);
   this.admirShowValue = true;
   console.log(this.admirShowValue);
  }
  
  xxxxHide() {
   console.log(this.admirShowValue);
   this.admirShowValue = false;
   console.log(this.admirShowValue);
  }
    
  showDialog(type) {

    if (type == 'add' || type == 'update') {
      this.display = true;
    }
    else {
      this.displayDeleteModal = true;
    }

    // console.log(this.display);
    //     console.log(n);
    //     this.n = n;

    //             this.data = data;
    //                     console.dir(this.data);


  }

  hideDialog(e) {
    console.dir(e)
    // this.display = false;
    //     this.displayDeleteModal = false;

    if (e.type == 'add' || e.type == 'update') {
      this.display = false;
    }
    else {
      this.displayDeleteModal = false;
    }
  }
}
