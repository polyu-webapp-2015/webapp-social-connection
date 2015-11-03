var registerModal ;

var modals = {};
var sessionid = null;

app.controller('MainCtrl', function ($scope, $http, $uibModal, $global) {
    /* 
    $global: self-defined global variables, look at app.js, app.factory for reference
    You should save infomation of the user there (using setter and getter) 

    $uibModal: take a look at http://angular-ui.github.io/bootstrap/, documentation about $uibModal service
    */

    $scope.openRegisterModal = function () {
        console.log("register");
        $scope.registerModal = $uibModal.open({
          backdrop: true,
          backdropClick: true,
          dialogFade: false,
          keyboard: true,
          templateUrl: '/pages/register.html',
          scope: $scope 
        /*
        scope - a scope instance to be used for the modal's content (actually
        the $uibModal service is going to create a child scope of a provided scope). 
        - from documentation
        */
        });
    };

    $scope.closeRegisterModal = function () {
        console.log("closing");
        $scope.registerModal.close();
    };

    $scope.openLoginModal = function () {
        // Your code here
    };

    $scope.closeLoginModal = function () {
        // Your code here
    }

    $scope.whoami = function() {
    };


    $scope.logii = function () {
        console.log("log!!!");
    }
})
