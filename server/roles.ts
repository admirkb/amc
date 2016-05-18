
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// Meteor.publish('roles', function () {


//     return Meteor.roles.find({});


// });

Meteor.roles.allow({
    insert: function (userId, staff) {
        return true;
    },
    update: function (userId, staff) {
        return true;
    },
    remove: function (userId, staff) {

        return true;
        //return userId && staff.userId === userId;
    }
});
