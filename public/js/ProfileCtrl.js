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
		$scope.city = user.city;
		$scope.country = user.country;
		$scope.organization = user.organization;

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

	$scope.submit = function () {
		$scope.title = $scope.title === undefined? '':$scope.title;
		$scope.firstname = $scope.firstname === undefined? '':$scope.firstname;
		$scope.lastname = $scope.lastname === undefined? '':$scope.lastname;
		$scope.organization = $scope.organization === undefined? '':$scope.organization;
		$scope.sex = $scope.sex === undefined? '':$scope.sex;
		$scope.country = $scope.country === undefined? '':$scope.country;
		$scope.city = $scope.city === undefined? '':$scope.city;
		$http.post(serv_addr, {
			action: 'EditProfile',
			data: JSON.stringify({
				session_id: $global.getSessionId(),
				account_id: $global.getAccountId(),
				field_array: {
					first_name: $scope.firstname,
					last_name: $scope.lastname,
					title: $scope.title,
					organization: $scope.organization,
					sex: $scope.sex,
					country: $scope.country,
					city: $scope.city
				}	
			})
		})
		.success(function (data) {
			if (data.result_code === 'Success') {
				$scope.whoami($global.getSessionId());
			}
			else alert('Something wrong happens');
		})
		.error(function (){
			alert('Please check your network');
		})
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