app.controller('AddPostCtrl', function ($scope, $http, $global, $uibModal) {

  $scope.submit = function () {
    console.log($scope.elem);
    $http.post(serv_addr, {
        //TODO create attraction (server)
        "action": "CreatePost",
        "data": {
          session_id: $global.getSessionId(),
          account_id: $global.getAccountId(),
          subject: $scope.post.subject,
          discussboard_id: $scope.elem.discussboard_id,
          description: $scope.post.description
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

});