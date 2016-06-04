// import { Meteor } from 'meteor/meteor';
// import { Mongo } from 'meteor/mongo';
import {GenericCollection, genericCollection} from '../../imports/api/generic';

export function loadGenericCollection() {
    if (GenericCollection.find().count() === 0) {
        var temp = [
            {
                'problem': 'Generic 1', editColor: 'yellow',
            },
            {
                'problem': 'Generic 2', editColor: 'yellow',
            },
            {
                'problem': 'Generic 3', editColor: 'yellow',
            },
            {
                'problem': 'Generic 4', editColor: 'yellow',
            },
            {
                'problem': 'Generic 5', editColor: 'yellow',
            },
            {
                'problem': 'Generic 6', editColor: 'yellow',
            }
        ];

        for (var i = 0; i < temp.length; i++) {
            GenericCollection.insert(temp[i]);
        }
    }

};
