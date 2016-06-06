
import { Meteor } from 'meteor/meteor';
import {Staffs} from '../imports/api/staffs';
import {Counts} from 'meteor/tmeasday:publish-counts';


Meteor.publish('staffs', function (options: Object, searchString: string) {
    
        let selector = {
        name: { '$regex': '.*' + searchString || '' + '.*', '$options': 'i' },
    };
    
        Counts.publish(this, 'numberOfRecords', Staffs.find(selector), { noReady: true });
        
        console.log("selector" + selector)
        console.dir(selector)
                console.dir(options)
    console.log("searchString" + searchString)
  return Staffs.find(selector , options);
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