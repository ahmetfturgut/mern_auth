
const { userService } = require('../service/service.index');
const { stateEnums,userEnums } = require('../model/enums/enums.index'); 

exports.initializeData = async () => {
    await adminUsersRecordFiller();
    await userRecordFiller();
}


/**
*  @description Create Admin User 
*/
const adminUsersRecordFiller = async () => {
    try { 
        
          await userService.createUser({
            name: "admin", 
            email: "admin@admin.com", 
            state: stateEnums.UserState.Active,
            password: "123qweQWE@", 
            role: userEnums.UserRole.Admin
        }); 

    } catch (error) {
        console.log("error:" + error);
        throw error;
    }
}

/**
*  @description Create User 
*/
const userRecordFiller = async () => {
    try { 

          await userService.createUser({
            name: "user1", 
            email: "user1@user.com", 
            state: stateEnums.UserState.Active,
            password: "123qweQWE@", 
            role: userEnums.UserRole.User
        }); 

    } catch (error) {
        console.log("error:" + error);
        throw error;
    }
}


