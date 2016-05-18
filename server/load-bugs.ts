import {Bugs} from '../imports/api/bugs';
export function loadBugs() {
    if (Bugs.find().count() === 0) {
        var bugs = [
            {
                'problem': 'Bugger', editColor: 'yellow',
            },
            {
                'problem': 'Bug 3', editColor: 'yellow',
            },
            {
                'problem': 'bug 5', editColor: 'yellow',
            }
        ];

        for (var i = 0; i < bugs.length; i++) {
            Bugs.insert(bugs[i]);
        }
    }

};
// let tempID = Session.set('tempID', 'myId' + new Date().getTime());
let tempID = new Date().getTime();
export function getTempId() {

return tempID;

};

export function setTempId() {

tempID = new Date().getTime();
 console.log(tempID);

};