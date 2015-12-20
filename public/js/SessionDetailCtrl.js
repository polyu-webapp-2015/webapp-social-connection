app.controller('SessionDetailCtrl', function ($scope, $http, $global, $uibModal) {

  var modalItem;
  $scope.buttonText = $scope.elem.joined? 'Who Also Attends': 'Join';

  if ($scope.elem.user_count*1 >= $scope.elem.quota*1) $scope.buttonText = 'Full';

  $scope.actionButtonClick = function () {
    if ($scope.buttonText === 'Who Also Attends') {
      $scope.showUserList();
    }
    else $scope.joinSession();
  }

  $scope.showUserList = function () {
    modalItem = $uibModal.open(new Modal('/pages/attendee_user_list.html', $scope));
  }

  $scope.closeModal = function () {
    if (modalItem === undefined) {
      $scope.$parent.modalItem.close();
      return;
    }
    modalItem.close();
    modalItem = $scope.$parent.modalItem;
  }

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

  $scope.openDiscussionBoard = function () {
    modalItem = $uibModal.open(new Modal('/pages/session_reply_list.html', $scope));
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