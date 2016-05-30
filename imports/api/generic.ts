import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
export const generiCcollection = "genericcollection";
export const GenericTable = new Mongo.Collection(generiCcollection);
