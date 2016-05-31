import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';

// Admir


import {UsersForm} from '../../../imports/users/users-form/users-form';
// import {UsersFormModal} from '../../imports/users-form/users-formModal';
import {Modal} from '../../directives/modal/modal';
import {Modal2} from '../../directives/modal/modal2';
import {ModalAdmir} from '../../directives/modal/modalAdmir';

@Component({
  selector: 'users-item',
  templateUrl: '/imports/users/users-item/users-item.html',
  directives: [UsersForm, Modal, Modal2,ModalAdmir],
  // properties: ['problem']
})
export class UsersItem extends MeteorComponent implements OnInit {
  @ViewChild(UsersForm) usersForm: UsersForm;
  @Input() userModel;
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

  public setUser(user) {
    // user.editColor = "purple"
    user.editColor = "blue";
    // console.log("In setUser")
    console.dir(user)
    this._element.style.background = "orange";

    console.dir(this._element)

    // this.userModel.problem = user.problem;
    // alert(this.userModel.problem + " / " + user.problem)

    // this.myThis.userModel.editColor =    user.editColor  ;
    // this.userModel.editColor = user.editColor;
  }

  /* */

  cancelUser(user) {

    user.isEditable = false;
    user.problem = user.origProblem;
    user.response = user.origResponse;

    var self = this;
    Meteor.call('users.update', { _id: user._id }, { $set: { isDisabled: false, isEditable: user.isEditable, editColor: "transparent" } }, function (error, result) {
      // console.log("here" + user.selfConnectionId)
      user.isDisabled = false;
      user.editColor = "transparent";

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


      console.log("users.update editUser callback")
    });

  }

  updateUser(user) {
    console.dir(user)

    Meteor.call('users.update', { _id: user._id }, {
      $set: {
        isDisabled: false, isEditable: false, name: user.name,
        phone: user.phone, dateResolved: new Date(), editColor: "transparent",
        imageAsData: user.imageAsData, email: user.email, width: user.width, height: user.height

      }
    }, function (error, result) {
      // console.log("here")
      // console.dir(error)
      // console.dir(result)

      console.log("users.update updateUser callback")
    });

  }

  deleteUser(o) {

    Meteor.call('users.remove', { _id: o.user._id });
        this.hideDialog('delete')
  }

  editUser(user) {

    user.isEditable = true;
    user.origProblem = user.problem;
    user.origResponse = user.response;

    var self = this;
    Meteor.call('users.update', { _id: user._id }, { $set: { isDisabled: true, isEditable: user.isEditable, editColor: "red" } }, function (error, result) {
      // console.log("here" + user.selfConnectionId)
      user.isDisabled = false;
      user.editColor = "transparent";

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


      console.log("users.update editUser callback")
    });


  }

  runUser(user) {

    alert(user._id);
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
