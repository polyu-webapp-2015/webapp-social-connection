app.controller('SendMessageCtrl', function ($scope, $http, $global, $uibModal) {

	$scope.showAlert = false;
	$scope.submitLock = false;
	$scope.msg = {};

	$scope.submit = function (account_id, close) {
		console.log($scope.msg.content);
		var close = close === undefined? true: false;
		if (account_id === undefined) 
			var account_id = $scope.elem.account_id;
		if ($scope.msg.content === undefined) {
			$scope.showAlert = true;
			return;
		}
		$scope.submitLock = true;
		$http.post(serv_addr, {
			action: "CreateMessage",
			data: {
				session_id: $global.getSessionId(),
				to_account_id: account_id,
				msg_content: $scope.msg.content
			}
		})
		.success(function (data, status, headers, config) {
			$scope.submitLock = false;
			if (data.result_code === 'Success') {
				if (close)
					$scope.closeModal();
				else {
					$scope.elem.element_array.push(data.message)
					console.log($scope.elem.element_array);
					$scope.msg.content = '';
				}
			}
			else {
				alert('Something went wrong T_T');
			}
		})
		.error(function (data, status, headers, config) {
			alert('Please check your network');
			$scope.submitLock = false;
		})
	}

})