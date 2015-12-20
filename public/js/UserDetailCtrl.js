app.controller('UserDetailCtrl', function ($scope, $http, $global, $uibModal) {

  $scope.followLock = false;
  $scope.followAction = false;
  $scope.unfollowAction = false;

  function checkInit() {
    var targetAccountId = $scope.$parent.target_account_id;
    if (targetAccountId != null && targetAccountId == targetAccountId * 1) {
      //$scope.id_array = [targetAccountId];
      //$scope.$parent.id_array = [targetAccountId];
      $scope.loadElements('GetProfileList','Profile',targetAccountId);
    }
  }

  $scope.openSendMessageModal = function () {
    $scope.followAction = false;
    $scope.unfollowAction = false;
    console.log($scope.elem);
    $scope.modalItem = $uibModal.open(new Modal('/pages/edit_message.html', $scope));
  }

  $scope.closeModal = function () {
    $scope.modalItem.close();
    $scope.modalItem = $scope.$parent.modalItem;
  }

  $scope.follow = function () {
    $scope.followAction = false;
    $scope.unfollowAction = false;
    $scope.followLock = true;
    $http.post(serv_addr, {
      action: 'Follow',
      data: {
        session_id: $global.getSessionId(),
        account_id: $scope.elem.account_id
      }
    })
    .success(function (data, status, headers, config) {
      if (data.result_code === 'Success') {
        $scope.elem.followed = true;
        $scope.followLock = false;
        $scope.followAction = true;
      }
      else {
        alert("Sorry! Something went wrong T_T");
      }
    })
    .error(function (data, status, headers, config) {
      alert('Please check your network.');
    })
  }

  $scope.unfollow = function () {
    $scope.followAction = false;
    $scope.unfollowAction = false;
    $scope.followLock = true;
    $http.post(serv_addr, {
      action: 'Unfollow',
      data: {
        session_id: $global.getSessionId(),
        account_id: $scope.elem.account_id
      }
    })
    .success(function (data, status, headers, config) {
      if (data.result_code === 'Success') {
        $scope.elem.followed = false;
        $scope.followLock = false;
        $scope.unfollowAction = true;
      }
      else {
        alert("Sorry! Something went wrong T_T");
      }
    })
    .error(function (data, status, headers, config) {
      alert('Please check your network.');
    })
  }

  $scope.followOrUnfollow = function () {
    if ($scope.followLock) return;
    if ($scope.elem.followed) {
      $scope.unfollow();
    }
    else {
      $scope.follow();
    }
  }

  $scope.profileInit = function () {

    // ask for data and put data into table
    var inputField;
    var i;
    for (i = 0; i < profileContent.length; i++) {
      inputField = document.getElementById(profileContent[i]);
      inputField.readOnly = true;
    }
    document.getElementById('sex').disabled = true;
    document.getElementById('saveButton').style.display = 'none';
    document.getElementById('updateButton').style.display = 'block';
  };

  $scope.profileUpdate = function () {
    var inputField;
    var i;
    for (i = 0; i < profileContent.length; i++) {
      inputField = document.getElementById(profileContent[i]);
      inputField.readOnly = false;
    }

    document.getElementById('sex').disabled = false;
    document.getElementById('updateButton').style.display = 'none';
    document.getElementById('saveButton').style.display = 'block';
  };

  $scope.profileSave = function () {
    //get data
    //save data
    $scope.profileInit();
  };

  $scope.log = function () {
    console.log($scope);
    console.log($scope.elem);
    console.log("momoda");
  };

  $scope.log();

  checkInit();
});
