import 'reflect-metadata';
import 'zone.js/dist/zone';
import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

// Angular
import {Component, EventEmitter, OnInit} from 'angular2/core';
import {MeteorComponent} from 'angular2-meteor';
import {bootstrap} from 'angular2-meteor-auto-bootstrap';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

// import {googleMaps} from 'google-maps';

// Admir

import {AdmirMessagingWatchCore} from  '../client/coreWatch';

import {Staffs} from '../imports/api/staffs';
import {StaffsList} from '../imports/staffs-list/staffs-list.ts';
import {LocalesList} from '../imports/locales-list/locales-list.ts';

@Component({
  selector: 'app',
  templateUrl: 'client/app.html',
  directives: [StaffsList, LocalesList, ANGULAR2_GOOGLE_MAPS_DIRECTIVES]
})
class AdmirMessagingWatch extends AdmirMessagingWatchCore implements OnInit {
  centerLat: Number = 51.47879;
  centerLon: Number = -0.010677;
  zoom: Number = 10;

  private customerId: string = "CUST1";
  private userId: string = "USER1";
  private name: string = "Kelvin";
  private map: any;
  constructor() {
    super();




  }

  ngOnInit() {
    console.log(this._today.getTime());
    console.log(this._location);
    console.log(this._centerLat);
    console.log(this._centerLon);
    console.log(this.lat);
    console.log(this.lon);

    this.centerLat = 51.47879;
    this.centerLon = -0.010677;

    // Clone cTrackMe...

    this.customerId = "CUST1";
    this.userId = "USER1";
    this.name = "Kelvin";
    this.map = "";



    this.activate();
    console.log("I'm being called when component is initalized after constructor method in BasicAngular2 in app.ts");
  }



  activate() {
    console.log("in activate()")

    // var t = new Object();
    // t.tableName = "staffs";
    // //t.orderBy = "CreateDate desc";
    // t.filterBy = "CustomerId eq '" + scope.CustomerId + "'  and UserId eq '" + scope.UserId + "'";
    // //t.topBy = 20;
    // //t.skipBy = $scope.serverSkipBy;
    // //t.selectBy = $scope.serverSelectBy;

    // this.fWebapi2ManageAllQuery();


  }


  fWebapi2ManageAllQuery() {

    var m = document.getElementById("map_canvas");
    m.style.height = (window.innerHeight / 2) + "px"
    m.style.width = (100) + "%"
    var mapOptions = {
      //center: latlng,
      disableDefaultUI: true,

      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(m, mapOptions);
    var latlng = new google.maps.LatLng(51.47879, -0.010677);
    console.dir(latlng)
    console.log(latlng.lat())
    console.log(latlng.lng())

    this.map.setCenter(latlng);


    function success(position) {


      this.centerLat = position.coords.latitude;
      this.centerLon = position.coords.longitude;

      console.log(this.centerLat)
      console.log(this.centerLon)

      // Update locale



      var self = this;
      var locales = { _id: "omoD5njmFECPiWApW" };
      // locales._id = "omoD5njmFECPiWApW";
      Meteor.call('locales.update', { _id: locales._id }, { $set: { lattitude: this.centerLon, longitude: this.centerLat } }, function (error, result) {


        console.log("locales.update fWebapi2ManageAllQuery callback")

        var localeHistorys = new Object();

        localeHistorys.customerId = "8641decc-eb77-45e9-bd86-1ba84903ad85";
        localeHistorys.userId = "09421093-e556-4dfc-bc9e-d3b17cb6036c";
        localeHistorys.name = "Kelvin"
        localeHistorys.createDate = new Date();
        localeHistorys.lattitude = self.centerLat;
        localeHistorys.longitude = self.centerLon;

        Meteor.call('localeHistorys.insert', localeHistorys, function (error, result) {


          console.log("localeHistorys.insert fWebapi2ManageAllQuery callback")
        });

      });


    }

    function error(error) {
      switch (error.code) {
        case 1:
          alert('permission denied');
          break;
        case 2:
          alert('position unavailable');
          break;
        case 3:
          alert('timeout');
          break;
        default:
          alert('unknown error');
          break;
      }
    }


    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(success, error, { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 });
    } else {
      alert('geolocation not supported');
    }
  }

}



// bootstrap(AdmirMessagingWatch, [ANGULAR2_GOOGLE_MAPS_PROVIDERS]);