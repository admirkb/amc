
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {GenericCollection, genericCollection} from '../imports/api/generic';

console.log("genericCollection - start")
console.log(genericCollection)
console.log("genericCollection - end")

var meteorGenericCollection = "'" + genericCollection +  "'"
console.log("meteorGenericCollection - start")
console.log(meteorGenericCollection)
console.log("meteorGenericCollection - end")

Meteor.publish(genericCollection, function () {
  return GenericCollection.find({});
});


Meteor.methods({

    'genericCollection.insert'(o) {
        GenericCollection.insert(o);
    },
    'genericCollection.remove'(o) {
        GenericCollection.remove(o);
    },
    'genericCollection.update'(userId, o) {
        GenericCollection.update(userId, o);
    },

});

GenericCollection.allow({
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