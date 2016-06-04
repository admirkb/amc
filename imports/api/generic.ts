import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
export const genericCollection = "customersGeneric";
export const GenericCollection = new Mongo.Collection(genericCollection);




