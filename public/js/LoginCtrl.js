app.controller("LoginCtrl", function ($scope, $http, $global) {
  $scope.loginFail = false;
  $scope.login = function () {
      $http.post(serv_addr, {
          "action": "Login",
          "data": JSON.stringify({
            emailOrPhoneNum: $scope.username,
            password: $scope.password
          })
      })
          .success(function (data, status, headers, config) {
            console.log(data);
            if (data.result_code == "Success") {
              $scope.loginFail = false;
              console.log(data);
              $scope.closeModal();
              $global.setUser(data.profile);
              $global.setSessionId(data.session_id);
              $global.setUserAnonymous();
              sessionStorage.setItem('session_id', data.session_id);
              console.log($global.getUser());
              console.log($global.getSessionId());
            }
            else if (data.result_code == "") {
              $scope.usernameUnique = false;
              $scope.usernameChecked = true;
            }
            else {
              console.log("result_code: " + data.result_code);
            }
          })
          .error(function (data, status, header, config) {
              $scope.loginFail = true;
              alert(status);
          });
  };

});
