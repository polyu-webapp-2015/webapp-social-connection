app.controller('ProfileCtrl', function  ($scope, $http, $global, $uibModal) {

	$scope.id_array = [];
	$scope.field_array = [];
	$scope.elems = []; // get output from server

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

});