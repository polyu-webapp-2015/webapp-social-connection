app.controller("LoginCtrl", function ($scope, $http) {
  $scope.loginFail = false;
  $scope.login = function () {
      $http.post(site_join('/login'), {
          "data": JSON.stringify({
              emailOrPhoneNum: $scope.username,
              password: $scope.password
          })
      })
          .success(function (data, status, headers, config) {
              $scope.loginFail = false;
              alert("success!");
              console.log(data);
              $scope.closeLoginModal();
          })
          .error(function (data, status, header, config) {
              $scope.loginFail = true;
              console.log(status);
              alert(status);
              dump(data);
          });
  };
});
