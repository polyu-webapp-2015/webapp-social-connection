app.controller('AddDiscussBoardCtrl', function ($scope, $http, $global, $uibModal) {

  $scope.submit = function () {
    $http.post(serv_addr, {
        //TODO create attraction (server)
        "action": "CreateDiscussBoard",
        "data": {
          session_id: $global.getSessionId(),
          subject: $scope.discussboard.subject,
          description: $scope.discussboard.description,
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