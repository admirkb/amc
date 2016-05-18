
import { Meteor } from 'meteor/meteor';
import {LocaleHistorys} from '../imports/api/localesHistory';


Meteor.publish('localeHistorys', function () {


    return LocaleHistorys.find({});


});

Meteor.methods({


    'localeHistorys.insert'(localeHistory) {
        var self = this;
        LocaleHistorys.insert(localeHistory);
    },
    'localeHistorys.remove'(localeHistoryId) {

        LocaleHistorys.remove(localeHistoryId);
    },
    'localeHistorys.update'(localeHistoryId, action) {
        
        LocaleHistorys.update(localeHistoryId, action);
    },


});