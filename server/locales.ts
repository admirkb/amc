
import { Meteor } from 'meteor/meteor';
import {Locales} from '../imports/api/locales';


Meteor.publish('locales', function () {


    return Locales.find({});


});

Meteor.methods({


    'locales.insert'(locale) {
        var self = this;
        Locales.insert(locale);
    },
    'locales.remove'(localeId) {

        Locales.remove(localeId);
    },
    'locales.update'(localeId, action) {
        
        Locales.update(localeId, action);
        
    },


});