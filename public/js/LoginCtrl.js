app.controller("LoginCtrl", function ($scope, $http, $global) {
  $scope.userNotExist = false;
  $scope.wrongPassword = false;
  $scope.login = function () {
    $scope.userNotExist = false;
    $scope.wrongPassword = false;
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
          $global.setUser(data.profile);
          $global.setSessionId(data.session_id);
          $global.setUserAttr('isAnonymous', false);
          sessionStorage.setItem('session_id', data.session_id);
          if (data.profile.account_type == "attendee" || data.profile.account_type == "speaker") {
            console.log(window.location);
            if (window.location.pathname.indexOf("nav_client") > 0) {
              $scope.closeModal();
              $scope.viewDiscover();
              return;
            }
            window.location.replace("nav_client.html");
          }
          else if (data.profile.account_type == "admin") {
            if (window.location.pathname.indexOf("nav_admin") > 0) {
              $scope.closeModal();
              $scope.viewConsole();
              return;
            }
              window.location.replace("nav_admin.html");
          }
        }
        else if (data.result_code == "Password_Wrong") {
          $scope.wrongPassword = true;
        }
        else if (data.result_code == "User_Not_Exist") {
          $scope.userNotExist = true;
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
