
app.controller("RegisterCtrl", function ($scope, $http, $global) {
    $scope.usernameUnique = true;
    $scope.re_password = '';
    $scope.re_password_valid = false;
    $scope.password = '';
    $scope.password_valid = false;
    $scope.usernameChecked = false;

    $scope.checkUsername = function () {
        console.log("focus out of field");
        if ($scope.registerForm.username.$dirty) {
          $http.post(serv_addr, {"action": "IsEmailOrPhoneNumUnique", "data": {"emailOrPhoneNum": $scope.username}})
          .success(function(data, status, headers, config) {
            console.log(data.ResultCode);
            if (data.ResultCode == "Success") {
              $scope.usernameUnique = true;
              $scope.usernameChecked = true;
            }
            else if (data.ResultCode == "Duplicated") {
              $scope.usernameUnique = false;
              $scope.usernameChecked = true;
            }
            else {
              console.log("ResultCode: " + data.ResultCode);
            }
          })
          .error(function(data, status, header, config) {
            console.log("error ResultCode: " + data.ResultCode);
          });
        }
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
        if (!($scope.usernameChecked && $scope.usernameUnique)) return;
        if (!$scope.password_valid || !$scope.re_password_valid)    return;
        $http.post(serv_addr, {
            "action": "createUser",
            "data": {
                session_id: $global.getSessionId(),
                emailOrPhoneNum: $scope.username,
                password: $scope.password,
                sex: parseInt($scope.sex),
                account_type: $scope.account_type,
            }
        })
        .success(function (data, status, headers, config) {
            alert("success!");
            console.log(data);
            $scope.closeModal();
        })
        .error(function (data, status, headers, config) {
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
