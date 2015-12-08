
app.controller("RegisterCtrl", function ($scope, $http, $global) {
    $scope.usernameUnique = true;
    $scope.re_password = '';
    $scope.re_password_valid = false;
    $scope.password = '';
    $scope.password_valid = false;
    $scope.usernameChecked = false;

    $scope.checkUsername = function () {
        console.log("focus out of field");
        console.log($scope.registerForm.pwd);
        console.log($scope.registerForm.username.$dirty);
        if (true) return;
        $http.post(serv_addr, {"action": "isEmailOrPhoneNumUnique", "data": {"emailOrPhoneNum": $scope.username}})
        .success(function(data, status, headers, config) {
          if (data.resultCode == 0) {
            $scope.usernameUnique = data.params.isEmailOrPhoneNumUnique;
          }
          else {
            alert("resultCode: " + data.resultCode);
          }
        })
        .error(function(data, status, header, config) {
          alert("status: " + status);
        });
    };

    $scope.checkPassword = function () {
        console.log("checking password");
        if (!$scope.registerForm.pwd.$dirty && !$scope.registerForm.re_pwd.$dirty) {
            $scope.registerForm.pwd.$setUntouched();
            $scope.registerForm.re_pwd.$setUntouched();
        }
        console.log($scope.registerForm.pwd.$touched);
        if ($scope.password && $scope.password.length <= 15 && $scope.password.length >= 6)
            $scope.password_valid = true;
        else {
            $scope.password_valid = false;
        }
        console.log("pwd_valid: " + $scope.password_valid);
        console.log("pwd_touched: " + $scope.password_valid);
        console.log("pwd_dirty: " + $scope.registerForm.pwd.$dirty);
        console.log("display: " + (!$scope.password_valid && $scope.registerForm.pwd.$touched && $scope.registerForm.pwd.$dirty));
        if (!$scope.registerForm.re_pwd.$dirty) return;
        if ($scope.password == $scope.re_password && $scope.password_valid) {
            $scope.re_password_valid = true;
        } else {
            $scope.re_password_valid = false;
        }
        console.log($scope.re_password);
        console.log("re_valid: " + $scope.re_password_valid);
        console.log("dirty: " + $scope.registerForm.re_pwd.$dirty);
    };

    $scope.onChangeRePwd = function () {
        console.log("changing");
        if (!$scope.registerForm.re_pwd.$touched) return;
        $scope.checkPassword();
    }

    $scope.submit = function () {
        $scope.usernameChecked = false;
        if (!$scope.usernameUnique) return;
        if (!$scope.password_valid || !$scope.re_password_valid)    return;
        console.log($scope.sex);
        //$scope.gender = parseInt($scope.gender);
        $http.post(serv_addr, {
            "action": "createUser",
            "data": {
                emailOrPhoneNum: $scope.username,
                password: $scope.password,
                sex: parseInt($scope.sex),
                account_type: 'attendee'
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
        $scope.registerForm.pwd.$setUntouched();
        console.log("hehe");
        console.log($scope);
        console.log("loging");
        console.log("pwd_valid: " + $scope.password_valid);
        console.log("pwd_dirty: " + $scope.registerForm.pwd.$dirty);
        console.log("pwd_touched: " + $scope.registerForm.pwd.$touched);
        console.log("display: " + (!$scope.password_valid && ($scope.registerForm.pwd.$touched && $scope.registerForm.pwd.$dirty)));
    }
});
