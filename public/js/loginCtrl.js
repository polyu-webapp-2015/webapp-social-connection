app.controller("LoginCtrl", function ($scope, $http, $global) {
  $scope.loginFail = false;
  $scope.login = function () {
      $http.post(serv_addr, {
          "action": "Login",
          "data": JSON.stringify({
            account_id: $global,
            emailOrPhoneNum: $scope.username,
            password: $scope.password
          })
      })
          .success(function (data, status, headers, config) {
              $scope.loginFail = false;
              alert("success!");
              console.log(data);
              $scope.closeModal();
              $global.setUser(data.profile);
              $global.setSessionId(data.session_id);
              $global.setUserAnonymous();
              
              sessionStorage.setItem('session_id', data.session_id);

              console.log(data);
              console.log($global.getUser());
              console.log($global.getSessionId());
          })
          .error(function (data, status, header, config) {
              $scope.loginFail = true;
              console.log(status);
              alert(status);
          });
  };

});
