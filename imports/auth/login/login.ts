import 'reflect-metadata';
import 'zone.js/dist/zone';
import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

// Angular
import {Component} from 'angular2/core';
import {FormBuilder, ControlGroup, Validators} from 'angular2/common';
import {MeteorComponent} from 'angular2-meteor';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {RouterLink} from 'angular2/router';
import {Router} from 'angular2/router';



// Admir

import {AdmirMessagingCore} from  '../../../client/core';

@Component({
  selector: 'login',
  directives: [MATERIAL_DIRECTIVES, RouterLink],
  templateUrl: '/imports/auth/login/login.html'
})


export class Login extends MeteorComponent {
  loginForm: ControlGroup;
  error: string;

  constructor(private router: Router) {
    super();

    let fb = new FormBuilder();

    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error = '';
  }

  login(credentials) {
    if (this.loginForm.valid) {
      Meteor.loginWithPassword(credentials.email, credentials.password, (err) => {
        if (err) {
          this.error = err;
        }
        else {



          //     var loggedInUser = Meteor.user();

          // if (Roles.userIsInRole(loggedInUser, ['caller'], 'default-group')) {
          //              this.router.navigate(['/HomeView']);
          // }
          // if (Roles.userIsInRole(loggedInUser, ['player'], 'default-group')) {
          //           this.router.navigate(['/HomeView']);
          // }

          this.router.navigate(['/HomeView']);
        }
      });
    }
  }


  xxxx123(){
    alert("hey");
  };

  loginWithGoogle(){
    Meteor.loginWithGoogle({
    }, function (err) {
      if (err) {
        //error handling
        alert('error : ' + err.message);
      } else {

        //inAdmin: () => {
        //    return Roles.userIsInRole(Meteor.userId(), ['registered'], 'default-group');
        //}
        if (!Roles.userIsInRole(Meteor.userId(), ['registered'], 'default-group')) {
          var roles = ['registered'];
          Roles.setUserRoles(Meteor.userId(), roles, 'default-group');
        }

        this.router.navigate(['/HomeView']);
      }
    });
  };
  loginWithFacebook = () => {
    Meteor.loginWithFacebook({
    }, function (err) {
      if (err) {
        //error handling
        alert('error : ' + err.message);
      } else {
        if (!Roles.userIsInRole(Meteor.userId(), ['registered'], 'default-group')) {
          var roles = ['registered'];
          Roles.setUserRoles(Meteor.userId(), roles, 'default-group');
        }
        this.router.navigate(['/HomeView']);
      }
    });
  };
  loginWithTwitter = () => {
    Meteor.loginWithTwitter({
    }, function (err) {
      if (err) {
        //error handling
        alert('error : ' + err.message);
      } else {
        if (!Roles.userIsInRole(Meteor.userId(), ['registered'], 'default-group')) {
          var roles = ['registered'];
          Roles.setUserRoles(Meteor.userId(), roles, 'default-group');
        }
        this.router.navigate(['/HomeView']);
      }
    });
  };
}