app.controller('UserDetailCtrl', function ($scope, $http, $global, $uibModal) {

  function checkInit() {
    var targetAccountId = $scope.$parent.target_account_id;
    if (targetAccountId != null && targetAccountId == targetAccountId * 1) {
      $scope.id_array = [targetAccountId];
      $scope.loadElements('GetProfileList');
    }
  }

  $scope.loadElements = function (action) {
    console.log("loading elements");
    console.log($scope.id_array);
    $http.post(serv_addr, {
        'action': action,
        'data': JSON.stringify({
          session_id: $global.getSessionId(),
          id_array: $scope.id_array,
          field_array: $scope.field_array
        })
      })
      .success(function (data, status, headers, config) {
        if (data.result_code === "Success") {
          $scope.elems = data.element_array;
          $scope.elem = data.element_array[0];
        }
        else {
          alert('something wrong happens');
          console.log(data);
          throw new Error("failed to get profile info");
        }
        console.log($scope.elems);
      })
      .error(function (data, status, headers, config) {
        alert('internal error');
      })
  };

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