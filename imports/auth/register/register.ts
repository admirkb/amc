import 'reflect-metadata';
import 'zone.js/dist/zone';
import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

// // Angular
import {Component} from 'angular2/core';
import {MeteorComponent} from 'angular2-meteor';
import {Router} from 'angular2/router';
import {FormBuilder, ControlGroup, Validators} from 'angular2/common';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {RouterLink} from 'angular2/router';



// Admir


@Component({
  selector: 'signup',
  directives: [MATERIAL_DIRECTIVES, RouterLink],
  templateUrl: '/imports/auth/register/register.html'
})
export class Register extends MeteorComponent {
  signupForm: ControlGroup;
  error: string;

  constructor(private router: Router) {
    super();

    let fb = new FormBuilder();

    this.signupForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error = '';
  }

  signup(credentials) {
    if (this.signupForm.valid) {
      Accounts.createUser({ email: credentials.email, password: credentials.password }, (err) => {
        if (err) {
          this.error = err;
        }
        else {

          var roles = ['admin'];
          Roles.setUserRoles(Meteor.userId(), roles, 'default-group');

          this.router.navigate(['/HomeView']);
        }
      });
    }
  }

  loginWithGoogle = () => {
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