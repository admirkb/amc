import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Bugs = new Mongo.Collection("bugs");


// Meteor.methods({
//     'bugs.insert'(bug) {

//         Bugs.insert(bug);
//     },
//     'bugs.remove'(bugId) {

//         const bug = Bugs.findOne(bugId);

//         Bugs.remove(bugId);
//     },
//     'bugs.update'(bugId, action) {

//         const bug = Bugs.findOne(bugId);

//         Bugs.update(bugId, action);
//     },
// });
