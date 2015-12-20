app.controller('ProfileCtrl', function  ($scope, $http, $global, $uibModal) {
	console.log('gether');
	$scope.id_array = [];
	$scope.field_array = [];
	$scope.elems = []; // get output from server

	var profileContent = ['firstName', 'lastName', 'userCity', 'organizationName', 'organizationType', 'organizationCountry'];

	$scope.profileInit = function() {
		var user = $global.getUser();
		console.log(user);
		$scope.firstname = user.first_name;
		$scope.lastname = user.last_name;
		$scope.sex = user.sex;
		$scope.title = user.title;
		$scope.city = user.user_city;
		$scope.country = user.organization_country;
		$scope.organization = user.organization_name;

		var inputField;
		var i;
	}

	$scope.profileUpdate = function() {
		var inputField;
		var i;
		for (i=0; i<profileContent.length; i++) {
			inputField = document.getElementById(profileContent[i]);
			inputField.readOnly = false;
		}

	}

	$scope.profileSave = function() {
		//TODO edit profile (server)
		$http.post(serv_addr, {
			'action': 'EditProfile',
			'data': JSON.stringify({
				// $scope.firstName 
				// $scope.lastName 
				// $scope.sex 
				// $scope.title 
				// $scope.userCity
				// $scope.organizationCountry 
				// $scope.organizationName 
				// $scope.organizationType 
			})

		})
		.success(function (data, status, headers, config) {
            console.log(data);
            if (data.result_code == "Success") {
              console.log(data);
              $global.setUser(data.profile);
            }
            else {
              console.log("result_code: " + data.result_code);
            }
          })
          .error(function (data, status, header, config) {
              alert(status);
        });

		$scope.profileInit();
	}

});