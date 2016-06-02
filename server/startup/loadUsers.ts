function setUpUser(userName, password, sex, roles) {
        
    var credentials = {
        email: userName + '@admir.tv',
        password: password,
        profile: {
          name:  userName,
          sex: sex,
        }
    };
    
     var error = '';

    console.dir(credentials)
    
    var  user = Meteor.users.findOne({ "emails.address": userName + "@admir.tv" })

    var userId = null;
    if (user != null) {

        Meteor.users.remove({_id: user._id});
        userId = Accounts.createUser(credentials);
    }
    else{
             
        userId = Accounts.createUser(credentials); 
    }
    
    user = Meteor.users.findOne({ "emails.address": userName + "@admir.tv" })
     Roles.addUsersToRoles(userId, roles, 'default-group'); 
    
    
        if (Roles.userIsInRole(userId, roles, 'default-group')) {

     console.log(user.profile.name + ' in group(s)');
     var userRoles = Roles.getRolesForUser(userId, 'default-group'); 
        _.each(userRoles, function (role) {
              console.log(role)
          });
  
     

  } else {

 console.log('userId is not in group')  

  }
  
      console.log('************************************************')   
}

Meteor.startup(function () {

setUpUser("kelvin.beech", "password", "f", ['god', 'admin']);

//setUpUser("JCGodwin", "password", "m", ['doctor', 'admin']);
//setUpUser("ADavies", "password", "m", ['doctor']);
//setUpUser("HWebberley", "password", "f", ['doctor']);
//setUpUser("HDavey", "password", "f", ['doctor']);

//setUpUser("SHool", "password", "f", ['nurse']);
//setUpUser("MThomas", "password", "f", ['nurse']);

//setUpUser("MBrickell", "password", "f", ['phlebotomists']);
//setUpUser("EBainton", "password", "f", ['phlebotomists']);

//setUpUser("BMcdermott", "password", "f", ['admin']);
//setUpUser("CEdmunds", "password", "f", ['admin']);


    // temp remove me

// var user = Meteor.users.findOne({ "emails.address": "kelvin@admir.tv" })
  
// if (user != null) {

//     Meteor.users.remove({ _id: user._id });
// }

return;
    var credentials = {
        email: 'JCGodwin@admir.tv',
        password: 'password',
        profile: {
          name: 'My Name is JCGodwin',
//          roles : [
//                     'doctor','administrator'
//                         ]
        }
    };

    var error = '';

    console.dir(credentials)

    var  user = Meteor.users.findOne({ "emails.address": "JCGodwin@admir.tv" })

    var userId = null;
    if (user != null) {

        Meteor.users.remove({_id: user._id});
        userId = Accounts.createUser(credentials);
        //Roles.addUsersToRoles(userId, roles:['admin']);

    }
    else{
             
        userId = Accounts.createUser(credentials);
        //Roles.addUsersToRoles(userId, roles:['admin']);     
    }



//db.runCommand({ createRole: "myClusterwideAdmin",
//  privileges: [
//  ],
//  roles: [
//    { role: "read", db: "meteor" }
//  ],
//  writeConcern: { w: "majority" , wtimeout: 5000 }
//})

    console.log('************************************************')   
    console.log('************************************************')    
    console.log('************************************************')

    user = Meteor.users.findOne({ "emails.address": "JCGodwin@admir.tv" })
     Roles.addUsersToRoles(userId, 'doctor', 'default-group'); 
    console.dir(user)
    
    console.log('************************************************')   
    console.log('************************************************')    
    console.log('************************************************')
    
    if (Roles.userIsInRole(userId, ['doctor','admin'], 'default-group')) {

     console.log('userId in group')   
     var userRoles = Roles.getRolesForUser(userId, 'default-group'); 
        _.each(userRoles, function (role) {
              console.log(role)
          });
  
     

  } else {

 console.log('userId is not in group')  

  }

setUpUser("ADavies", "password");
    //Accounts.createUser(credentials);

    //if (Users.find().count() === 0) {

    //    var users = [
    //    {
    //        'userId': '2e369492-dceb-4ec9-aef3-6b9403be3a4a',
    //    }
    //    ];

    //for (var i = 0; i < users.length; i++) {
    //  Users.insert(users[i]);
    //}
  //}
});
