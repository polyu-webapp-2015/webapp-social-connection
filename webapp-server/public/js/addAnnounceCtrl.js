
app.controller("AddAnnounceCtrl", function ($scope, $http, $global) {

    $scope.submit = function () {
        $scope.usernameChecked = false;
        if (!$scope.usernameUnique) return;
        if (!$scope.password_valid || !$scope.re_password_valid)    return;
        console.log($scope.sex);
        //$scope.gender = parseInt($scope.gender);
        console.log($scope.announce);
        $http.post(serv_addr, {
            "action": "addAnnouncement",
            "data": {
                $scope.announce
            }
        })
        .success(function (data, status, headers, config) {
            $scope.usernameChecked = true;
            alert("success!");
            console.log(data);
            $scope.closeRegisterModal();
        })
        .error(function (data, status, header, config) {
            console.log(status);
            alert(status);
        });
    };

    $scope.log = function () {
        // for debug use
    }
});