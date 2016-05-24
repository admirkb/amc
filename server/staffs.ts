
import { Meteor } from 'meteor/meteor';
import {Staffs} from '../imports/api/staffs';


Meteor.publish('staffs', function () {


    return Staffs.find({});


});

Meteor.methods({


    'staffs.insert'(staff) {
        var self = this;
        Staffs.insert(staff);
    },
    'staffs.remove'(staffId) {

        Staffs.remove(staffId);
    },
    'staffs.update'(staffId, action) {
        // console.dir(action)
        Staffs.update(staffId, action);
    },


});