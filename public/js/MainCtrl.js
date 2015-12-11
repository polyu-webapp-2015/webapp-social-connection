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
        if ($global.loggedIn() === false) {$scope.openLoginModal(); return;}
        console.log("register");
        $scope.modalItem = $uibModal.open(new Modal('/pages/register.html', $scope));
                                              // Modal prototype, defined in app.js
        /*
        scope - a scope instance to be used for the modal's content (actually
        the $uibModal service is going to create a child scope of a provided scope).
        - from documentation
        */
    };

    $scope.openProfileModal = function () {
        if ($global.loggedIn() === false) {$scope.openLoginModal(); return;}
        else {
            console.log($global.loggedIn());
            console.log($global.getUser());
            $scope.modalItem = $uibModal.open(new Modal('/pages/profile.html', $scope));
        }
    }

    $scope.openLoginModal = function () {
        console.log("login");
        $scope.modalItem = $uibModal.open(new Modal('/pages/login.html', $scope));
    }

    $scope.openAddAnnounceModal = function () {
        if ($global.loggedIn() === false) {$scope.openLoginModal(); return;}
      console.log("add announce");
      $scope.modalItem = $uibModal.open(new Modal('/pages/add_announce.html', $scope));
    }

    $scope.openCouponsModal = function () {
        if ($global.loggedIn() === false) {$scope.openLoginModal(); return;}
        if ($global.getUser().isAnonymous === false) {
            openLoginModal();
            return;
        }
        console.log("View coupons");
        $scope.modalItem = $uibModal.open(new Modal('/pages/coupons.html', $scope));
    }

    $scope.whoami = function(session_id) {
        $http.post(serv_addr, {
            action: 'GetProfile',
            data: JSON.stringify({
                session_id: session_id,
                account_id: -1
            })
        })
        .success(function (data, status, headers, config) {
            if (data.result_code !== 'Session_Expired') {
                console.log(data);
                $global.setUser(data.profile);
                $global.setSessionId(session_id);
                $global.setUserAttr('isAnonymous', false);
            }
            else $scope.openLoginModal();
        })
        .error(function (data, status, headers, config) {
            alert('internal error');
        })
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
        if ($global.loggedIn() === false) {$scope.openLoginModal(); return;}
        $scope.modalItem = $uibModal.open(new Modal('/pages/user_list.html', $scope));
    }

    $scope.logoff = function () {
        sessionStorage.removeItem('session_id');
        $global.setUserAnonymous();
    }

    $scope.closeNavbar = function () {
        if ($('#navbar-toggle').css('display') !== 'none')
            document.getElementById('navbar-toggle').click();
    }

    $scope.openCreateSessionModal = function () {
        if ($global.loggedIn() === false) {$scope.openLoginModal(); return;}
        $scope.modalItem = $uibModal.open(new Modal('/pages/create_session.html'));
    }

    var session_id = sessionStorage.getItem('session_id');
    $scope.whoami(session_id);

})
