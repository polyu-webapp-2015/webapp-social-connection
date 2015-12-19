app.controller('SessionDetailCtrl', function ($scope, $http, $global, $uibModal) {

  $scope.joinSession = function () {
    $http.post(serv_addr, {
      'action': 'JoinEvent',
      'data': {
        session_id: $global.getSessionId(),
        event_id: $scope.elem.event_id
      }
    })
    .success (function (data, status, headers, config) {
      if (data.result_code === 'Success') {
        $scope.elem.joined = true;
      }
      else alert('Sorry! Something went wrong T_T');
    })
    .error(function (data, status, headers, config) {
      alert('Sorry! Something went wrong T_T');
    });
  }

  $scope.exitSession = function () {
    $http.post(serv_addr, {
      'action': 'UnJoinEvent',
      'data': {
        session_id: $global.getSessionId(),
        event_id: $scope.elem.event_id
      }
    })
    .success (function (data, status, headers, config) {
      if (data.result_code === 'Success')
        $scope.elem.joined = false;
      else {
        alert('Sorry! Something went wrong T_T');
      }
    })
    .error(function (data, status, headers, config) {
      alert('Sorry! Something went wrong T_T');
    });
  }

  $scope.log = function () {
    console.log($scope);
    console.log($scope.elem);
  };

  $scope.log();

});