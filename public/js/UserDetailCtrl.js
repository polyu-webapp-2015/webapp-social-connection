app.controller('UserDetailCtrl', function ($scope, $http, $global, $uibModal) {

  function checkInit() {
    var targetAccountId = $scope.$parent.target_account_id;
    if (targetAccountId != null && targetAccountId == targetAccountId * 1) {
      $scope.id_array = [targetAccountId];
      $scope.loadElements('GetProfileList');
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