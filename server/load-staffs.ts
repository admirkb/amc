import {Staffs} from '../imports/api/staffs';
export function loadStaffs() {
    if (Staffs.find().count() === 0) {
        var staffs = [
            {
                customerId: '8641decc-eb77-45e9-bd86-1ba84903ad85',
                userId: '09421093-e556-4dfc-bc9e-d3b17cb6036c',
                name: "Kelvin",
                icon: "",
                logo: "",
                filepath: "",
                tags: "",
                width: "",
                height: "",
                email: "",
                authority: "",
                type: "",
                expiryDate: new Date(),
                regNo: "",
                licensedCount: "",
                vRM: "",
                status: "",
                licenseNo: "",
                phone: "",
                statusText: "",
                statusTime: "",

            },
            {
                customerId: '8641decc-eb77-45e9-bd86-1ba84903ad85',
                userId: '1e748313-06f5-426c-aa67-0f7e4e56ba62',
                name: "Elita",
                icon: "",
                logo: "",
                filepath: "",
                tags: "",
                width: "",
                height: "",
                email: "",
                authority: "",
                type: "",
                expiryDate: new Date(),
                regNo: "",
                licensedCount: "",
                vRM: "",
                status: "",
                licenseNo: "",
                phone: "",
                statusText: "",
                statusTime: "",
            },
            {
                customerId: '8641decc-eb77-45e9-bd86-1ba84903ad85',
                userId: 'addab387-fd0b-45e5-a1a6-0805be83748f',
                name: "Andrew",
                icon: "",
                logo: "",
                filepath: "",
                tags: "",
                width: "",
                height: "",
                email: "",
                authority: "",
                type: "",
                expiryDate: new Date(),
                regNo: "",
                licensedCount: "",
                vRM: "",
                status: "",
                licenseNo: "",
                phone: "",
                statusText: "",
                statusTime: "",
            }
        ];

        for (var i = 0; i < staffs.length; i++) {
            Staffs.insert(staffs[i]);
        }
    }

};

