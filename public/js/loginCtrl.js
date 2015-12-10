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
              $scope.loginFail = false;
              alert("success!");
              console.log(data);
              $scope.closeModal();
              $global.setUser(data.profile);
              $global.setUserAttr('isAnonymous', false);
              console.log(data);
              console.log($global.getUser());
          })
          .error(function (data, status, header, config) {
              $scope.loginFail = true;
              console.log(status);
              alert(status);
          });
  };

});
