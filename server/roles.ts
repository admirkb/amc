
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {Counts} from 'meteor/tmeasday:publish-counts';


Meteor.publish('roles', function (options: Object, searchString: string) {
    
        let selector = {
        name: { '$regex': '.*' + searchString || '' + '.*', '$options': 'i' },
    };
    
        Counts.publish(this, 'numberOfRecords', Meteor.roles.find(selector), { noReady: true });
        
        console.log("selector" + selector)
        console.dir(selector)
                console.dir(options)
    console.log("searchString" + searchString)
  return Meteor.roles.find(selector , options);
});

Meteor.methods({

    'roles.insert'(role) {
        var self = this;
        Meteor.roles.insert(role);
    },
    'roles.remove'(roleId) {

        Meteor.roles.remove(roleId);
    },
    'roles.update'(roleId, action) {
        // console.dir(action)
        Meteor.roles.update(roleId, action);
    },


});
Meteor.roles.allow({
    insert: function (userId, role) {
        return true;
    },
    update: function (userId, role) {
        return true;
    },
    remove: function (userId, role) {

        return true;
        //return userId && role.userId === userId;
    }
});
