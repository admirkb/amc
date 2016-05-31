import 'reflect-metadata';
import 'zone.js/dist/zone';
import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

// Angular
import {Component, EventEmitter, OnInit} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';

// Admir

@Component({
})
export class AdmirMessagingCore extends MeteorComponent implements OnInit {
  protected _today: Date = new Date();
  protected _location: number = 999;
  protected _centerLat: Number = 37.4292;
  protected _centerLon: Number = -122.1381;

  constructor() {
    super();

  }


  ngOnInit() {
    console.log("I'm being called when component is initalized after constructor method in BasicAngular2 in app.ts");
  }

  public get lat(): Number {
    return this._centerLat;
  }

  public get lon(): Number {
    return this._centerLon;
  }

  protected GetPosition() {

    console.log("GetPosition() called");
    var watchId = null;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 });
    } else {
      alert('geolocation not supported');
    }

    function success(position) {

      navigator.geolocation.clearWatch(watchId);
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);

      this._centerLat = position.coords.latitude;
      this._centerLon = position.coords.longitude;

    }


    function error(error) {
      switch (error.code) {
        case 1:
          console.log('permission denied');
          break;
        case 2:
          console.log('position unavailable');
          break;
        case 3:
          console.log('timeout');
          break;
        default:
          console.log('unknown error');
          break;
      }
    }

  }

  protected WatchPosition() {

    console.log("WatchPosition() called");
    var watchId = null;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(success, error, { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 });
    } else {
      alert('geolocation not supported');
    }

    function success(position) {

      // navigator.geolocation.clearWatch(watchId);
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);

      this._centerLat = position.coords.latitude;
      this._centerLon = position.coords.longitude;

    }


    function error(error) {
      navigator.geolocation.clearWatch(watchId);
      switch (error.code) {
        case 1:
          console.log('permission denied');
          break;
        case 2:
          console.log('position unavailable');
          break;
        case 3:
          console.log('timeout');
          break;
        default:
          console.log('unknown error');
          break;
      }
    }

  }

  protected get inAdmin(): boolean {
    return Roles.userIsInRole(Meteor.userId(), ['admin'], 'default-group');
  }
  protected get inDoctor(): boolean {
    return Roles.userIsInRole(Meteor.userId(), ['doctor'], 'default-group');
  }
  protected get inGod(): boolean {
    return Roles.userIsInRole(Meteor.userId(), ['god'], 'default-group');
  }
  protected get inNurse(): boolean {
    return Roles.userIsInRole(Meteor.userId(), ['nurse'], 'default-group');
  }
  protected get inPhlebotomists(): boolean {
    return Roles.userIsInRole(Meteor.userId(), ['phlebotomists'], 'default-group');
  }
  protected get inRegistered(): boolean {
    return Roles.userIsInRole(Meteor.userId(), ['registered'], 'default-group');
  }
  protected get isLoggedIn(): boolean {
    return Meteor.userId() !== null;
  }
  protected get currentUser(): any {
    return Meteor.user();
  }
}

