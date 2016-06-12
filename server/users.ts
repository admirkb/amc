
import { Meteor } from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

Meteor.publish("users", function (options: Object, searchString: string) {



    var search = new RegExp('.*' + searchString, 'i');
    console.log(search)

    Counts.publish(this, 'numberOfRecords', Meteor.users.find({ 'emails.address': search }), { noReady: true });
    // return Meteor.users.find({selector}, { fields: { 'emails.address': 1, profile: 1, roles: 1, createdAt: 1, width: 1, height: 1, imageAsData: 1 } });
    return Meteor.users.find({ 'emails.address': search }, options);
});

// Meteor.publish('users', function (options: Object, searchString: string) {

//         let selector = {
//         email: { '$regex': '.*' + searchString || '' + '.*', '$options': 'i' },
//     };

//         Counts.publish(this, 'numberOfRecords', Meteor.users.find(selector), { noReady: true });

//         console.log("selector" + selector)
//         console.dir(selector)
//                 console.dir(options)
//     console.log("searchString" + searchString)
//   return Meteor.users.find(selector , options);
// });


Meteor.methods({

    'users.insert'(user) {
        Meteor.users.insert(user);
    },
    'users.remove'(userId) {
        Meteor.users.remove(userId);
    },
    'users.update'(userId, action) {
        Meteor.users.update(userId, action);
    },
    'users.getUsers'() {
        console.log('on server, Meteor.users.find({}) called');
        return Meteor.users.find({}).fetch();
    },

});

Meteor.users.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {

        return true;
        //return userId && staff.userId === userId;
    }
});