app.controller("LoginCtrl", function ($scope, $http, $global) {
  $scope.loginFail = false;
  $scope.login = function () {
      $http.post(serv_addr, {
          "action": "login",
          "data": {
              emailOrPhoneNum: $scope.username,
              password: $scope.password
          }
      })
          .success(function (data, status, headers, config) {
              $scope.loginFail = false;
              alert("success!");
              console.log(data);
              var profile =data.Profile;
              $scope.closeModal();
          })
          .error(function (data, status, header, config) {
              $scope.loginFail = true;
              console.log(status);
              alert(status);
          });
  };
});
