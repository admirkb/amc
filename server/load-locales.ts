import {Locales} from '../imports/api/locales';
export function loadLocales() {
    if (Locales.find().count() === 0) {
        var locales = [
            {
                customerId: '8641decc-eb77-45e9-bd86-1ba84903ad85',
                userId: '09421093-e556-4dfc-bc9e-d3b17cb6036c',
                name: "Kelvin",
                staffId: "",
                location: "",
                lattitude: 0,
                longitude: 0,
                accuracy: 0,
                altitude: 0,
                altitudeAccuracy: 0,
                heading: "",
                speed: 0,
                db: "",
                passengerId: "",
                dbUpdated: new Date(),


            },
            {
                customerId: '8641decc-eb77-45e9-bd86-1ba84903ad85',
                userId: '1e748313-06f5-426c-aa67-0f7e4e56ba62',
                name: "Elita",
                staffId: "",
                location: "",
                lattitude: 0,
                longitude: 0,
                accuracy: 0,
                altitude: 0,
                altitudeAccuracy: 0,
                heading: "",
                speed: 0,
                db: "",
                passengerId: "",
                dbUpdated: new Date(),
            },
            {
                customerId: '8641decc-eb77-45e9-bd86-1ba84903ad85',
                userId: 'addab387-fd0b-45e5-a1a6-0805be83748f',
                name: "Andrew",
                staffId: "",
                location: "",
                lattitude: 0,
                longitude: 0,
                accuracy: 0,
                altitude: 0,
                altitudeAccuracy: 0,
                heading: "",
                speed: 0,
                db: "",
                passengerId: "",
                dbUpdated: new Date(),
            }
        ];

        for (var i = 0; i < locales.length; i++) {
            Locales.insert(locales[i]);
        }
    }

};

