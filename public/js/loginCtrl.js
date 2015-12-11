app.controller("LoginCtrl", function ($scope, $http) {
  $scope.loginFail = false;
  $scope.login = function () {
      $http.post(serv_addr, {
          "action": "Login",
          "data": {
              emailOrPhoneNum: $scope.username,
              password: $scope.password
          }
      })
          .success(function (data, status, headers, config) {
              $scope.loginFail = false;
              alert("success!");
              console.log(data);
              $scope.closeModal();
          })
          .error(function (data, status, header, config) {
              $scope.loginFail = true;
              console.log(status);
              alert(status);
          });
  };
});
