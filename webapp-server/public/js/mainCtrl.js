// controller of index.html
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
        $scope.logii();
        $scope.registerModal.close();
    };

    $scope.openLoginModal = function () {
        console.log("login");
        $scope.loginModal = $uibModal.open({
          backdrop: true,
          backdropClick: true,
          dialogFade: false,
          keyboard: true,
          templateUrl: '/pages/login.html',
          scope: $scope
        });
    };

    $scope.closeLoginModal = function () {
      $scope.loginModal.close();
    }

    $scope.whoami = function() {
    };


    $scope.logii = function () {
        // for test & debug usage
        console.log("log!!!");
        var user = $global.getUser();
        console.log(user);
        user['b'] = 3;
        $global.setUserAttr("a", 3);
        console.log($global.getUser());

    }
})
