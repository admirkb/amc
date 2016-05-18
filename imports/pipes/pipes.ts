// Meteor

// Angular
import {Component, Pipe} from 'angular2/core';
import {MeteorComponent} from 'angular2-meteor';

// Admir

// Component(s)
@Pipe({
  name: 'displayName'
})
export class DisplayName {
  transform(user: Meteor.User): string {
    if (!user) {
      return '';
    }

    if (user.username) {
      return user.username;
    }

    if (user.emails) {
      return user.emails[0].address;
    }

    return '';
  }
}