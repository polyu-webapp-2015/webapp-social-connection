app.controller('ProfileCtrl', function  ($scope, $http, $global, $uibModal) {
	console.log('gether');
	$scope.id_array = [];
	$scope.field_array = [];
	$scope.elems = []; // get output from server

	var profileContent = ['firstName', 'lastName', 'userCity', 'organizationName', 'organizationType', 'organizationCountry'];

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
			if (data.result_code === "Success") 
				$scope.elems = data.element_array;
			else {
				alert('something wrong happens');
				console.log(data);
			}
			console.log($scope.elems);
		})
		.error (function (data, status, headers, config) {
			alert('internal error');
		})
	}

	$scope.profileInit = function() {
		var user = $global.getUser();
		console.log(user);
		$scope.firstName = user.first_name;
		$scope.lastName = user.last_name;
		$scope.sex = user.sex;
		$scope.title = user.title;
		$scope.userCity = user.user_city;
		$scope.organizationCountry = user.organization_country;
		$scope.organizationName = user.organization_name;
		$scope.organizationType = user.organization_type;

		var inputField;
		var i;
		for (i=0; i<profileContent.length; i++) {
			inputField = document.getElementById(profileContent[i]);
			inputField.readOnly = true;
		}
		document.getElementById('sex').disabled = true;
		document.getElementById('title').disabled = true;
		document.getElementById('saveButton').style.display = 'none';
		document.getElementById('updateButton').style.display = 'block';
	}

	$scope.profileUpdate = function() {
		var inputField;
		var i;
		for (i=0; i<profileContent.length; i++) {
			inputField = document.getElementById(profileContent[i]);
			inputField.readOnly = false;
		}

		document.getElementById('sex').disabled = false;
		document.getElementById('title').disabled = false;
		document.getElementById('updateButton').style.display = 'none';
		document.getElementById('saveButton').style.display = 'block';
	}

	$scope.profileSave = function() {
		//TODO 
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