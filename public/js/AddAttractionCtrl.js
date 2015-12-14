app.controller('AddAttractionCtrl', function ($scope, $http, $global, $uibModal) {
  $scope.id_array = [];
  $scope.field_array = [];
  $scope.elems = []; // get output from server

  $scope.submit = function () {
    $http.post(serv_addr, {
        //TODO .................
        "action": "createAttraction",
        "data": {
          session_id: $global.getSessionId(),
          title: $scope.title,
          location: $scope.location,
          intro: $scope.intro
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