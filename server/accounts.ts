
//Accounts.onCreateUser(function (options, user) {
//    console.log('Creating user: ' + user.username);
//    return user;
//});

ServiceConfiguration.configurations.remove({
    service: "google"
});

ServiceConfiguration.configurations.insert({
    service: "google",
    clientId: "687953316755-nn2t7qp5h354h4gju6eq1lvo2drtserm.apps.googleusercontent.com",
    loginStyle: "popup",
    secret: "PgS1Mnp7lQkJmiSAWlg308H_"
});

ServiceConfiguration.configurations.remove({
    service: "facebook"
});

ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: "1737824629771938",
    loginStyle: "popup",
    secret: "3abb8e2559166e7cb0d09d3e78be10db"
});

ServiceConfiguration.configurations.remove({
    service: "twitter"
});

ServiceConfiguration.configurations.insert({
    service: "twitter",
    consumerKey: "1yYaFQLSeODT6f4RIxSEoQwfV",
    loginStyle: "popup",
    secret: "sypKjj5vh58f79lRI6QO5ERsFwxQfCiqqqEvYpGQ3Yp1mvpUt7"
});