
function UserGroup() {
    this.groupID = arguments[0];
    this.groupName = arguments[1];
    this.lastActionTime = arguments[2];
    this.joinTime = arguments[3];
    
}


function User() {
    this.userId = arguments[0];
    this.userIntro = arguments[1];
    this.email = arguments[2];
    this.phoneNum = arguments[3];
    this.firstName = arguments[4];
    this.lastName = arguments[5];
    this.nickName = arguments[6];
    this.sex = arguments[7];
    
}


User.prototype.getUserGroupList = function() {
    //TODO impl
};

User.prototype.isPasswordCorrect = function(password) {
    //TODO impl
};

function UserManager() {
    
}


UserManager.prototype.createUser = function(emailOrPhoneNum, password, sex) {
    //TODO impl
};

UserManager.prototype.newSessionId = function(emailOrPhoneNum, password) {
    //TODO impl
};

UserManager.prototype.isEmailOrPhoneNumUnique = function(emailOrPhoneNum) {
    //TODO impl
};

function GroupUser() {
    this.userId = arguments[0];
    this.lastActionTime = arguments[1];
    this.joinTime = arguments[2];
    
}


function Group() {
    this.groupId = arguments[0];
    this.groupName = arguments[1];
    this.groupIntro = arguments[2];
    this.hostUserId = arguments[3];
    
}


Group.prototype.getGroupUserList = function() {
    //TODO impl
};

function GroupManager() {
    
}


GroupManager.prototype.createGroup = function(groupName, groupIntro) {
    //TODO impl
};

GroupManager.prototype.getGroup = function(groupId) {
    //TODO impl
};

function Conference() {
    
}


function Exhibition() {
    
}


