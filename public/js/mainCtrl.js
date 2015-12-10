// controller of index.html
app.controller('MainCtrl', function ($scope, $http, $uibModal, $global) {
    /*
    $global: self-defined global variables, look at app.js, app.factory for reference
    You should save infomation of the user there (USING setter and getter)

    $uibModal: take a brief look at http://angular-ui.github.io/bootstrap/, documentation about $uibModal service
    */

    $scope.closeModal = function () {
        $scope.modalItem.close();
    }

    $scope.openRegisterModal = function () {
        console.log("register");
        $scope.modalItem = $uibModal.open(new Modal('/pages/register.html', $scope));
                                              // Modal prototype, defined in app.js
        /*
        scope - a scope instance to be used for the modal's content (actually
        the $uibModal service is going to create a child scope of a provided scope).
        - from documentation
        */
    };

    $scope.openLoginModal = function () {
        console.log("login");
        $scope.modalItem = $uibModal.open(new Modal('/pages/login.html', $scope));
    }

    $scope.openAddAnnounceModal = function () {
      console.log("add announce");
      $scope.modalItem = $uibModal.open(new Modal('/pages/add_announce.html', $scope));
    }

    $scope.openCouponsModal = function () {
        console.log("View coupons");
        $scope.modalItem = $uibModal.open(new Modal('/pages/coupons.html', $scope));
    }

    $scope.whoami = function() {
    };

    $scope.logii = function () {
        // for test & debug usage
        console.log("log!!!");
        var user = $global.getUser(); // get a user profile copy
        console.log(user);
        user['b'] = 3;  // DO NOT set User's attributes in this way
        $global.setUserAttr("a", 3);
        console.log($global.getUser());

    }

    $scope.openUsersModal = function () {
        $scope.modalItem = $uibModal.open(new Modal('/pages/user_list.html', $scope));
    }

})
