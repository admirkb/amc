
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {GenericCollection, genericCollection, DynamicProperties} from '../imports/api/generic';
import {Counts} from 'meteor/tmeasday:publish-counts';

// genericCollection = "genericcollection";
// GenericCollection = new Mongo.Collection(genericCollection);

console.log("genericCollection - start")
console.log(genericCollection)
console.log("genericCollection - end")

var meteorGenericCollection = "'" + genericCollection +  "'"
console.log("meteorGenericCollection - start")
console.log(meteorGenericCollection)
console.log("meteorGenericCollection - end")

// var xxx = new DynamicProperties();
// console.log(xxx.getGenericDynamicCollection());
// console.log("-----------------");
// console.log(DynamicProperties.getGenericCollectionString);
// console.log("-----------------");
// DynamicProperties.setGenericCollectionString = "customersGeneric";
// console.log("-----------------");
// console.log(DynamicProperties.getGenericCollectionString);
// console.log("-----------------");

// console.log("$$$$$$$$$$$$$$$$$$$$$$");
// console.log(DynamicProperties.getGenericCollectionMongo);
// console.log("$$$$$$$$$$$$$$$$$$$$$$");

// DynamicProperties.setMongoDynamicCollection =  new Mongo.Collection(DynamicProperties.getGenericCollectionString);

// console.log("$$$$$$$$$$$$$$$$$$$$$$");
// console.log(DynamicProperties.getGenericCollectionMongo);
// console.log("$$$$$$$$$$$$$$$$$$$$$$");

// genericCollection = "genericcollection";
// GenericCollection.remove({});
// GenericCollection = new Mongo.Collection(genericCollection);



Meteor.publish(genericCollection, function (options: Object, searchString: string) {
    
        let selector = {
        problem: { '$regex': '.*' + searchString || '' + '.*', '$options': 'i' },
    };
    
        Counts.publish(this, 'numberOfRecords', GenericCollection.find(selector), { noReady: true });
        
        console.log("selector" + selector)
        console.dir(selector)
                console.dir(options)
    console.log("searchString" + searchString)
  return GenericCollection.find(selector , options);
});




Meteor.methods({
    'setMongoDynamicCollection'(collectionName) {
DynamicProperties.setGenericCollectionString ="customersGeneric"
DynamicProperties.setMongoDynamicCollection =  new Mongo.Collection(DynamicProperties.getGenericCollectionString);

console.log("33333333333333333333333 - customersGeneric");
console.log(DynamicProperties.getGenericCollectionString);
console.log(DynamicProperties.getGenericCollectionMongo);
console.log("33333333333333333333333 - customersGeneric");
        console.log("DynamicProperties.setMongoDynamicCollection")
    },
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

