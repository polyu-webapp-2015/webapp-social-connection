app.controller('AddReplyCtrl', function ($scope, $http, $global, $uibModal) {

  $scope.submit = function () {
    $http.post(serv_addr, {
        //TODO create attraction (server)
        "action": "createReply",
        "data": {
          session_id: $global.getSessionId(),
          account_id: $global.getAccountId(),
          description: $scope.comment,
        }
      })
      .success(function (data, status, headers, config) {
        alert("success!");
        console.log(data);
        $scope.closeActionModal();
      })
      .error(function (data, status, headers, config) {
        console.log(status);
        alert(status);
      });
  };

});