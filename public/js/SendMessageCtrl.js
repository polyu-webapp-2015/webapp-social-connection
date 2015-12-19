app.controller('SendMessageCtrl', function ($scope, $http, $global, $uibModal) {

	$scope.submit = function () {
		$http.post(serv_addr, {
			action: "CreateMessage",
			data: {
				session_id: $global.getSessionId(),
				to_account_id: $scope.elem.account_id,
				msg_content: $scope.content
			}
		})
		.success(function (data, status, headers, config) {
			if (data.result_code === 'Success') {
				$scope.closeModal();
			}
			else {
				alert('Something went wrong T_T');
			}
		})
		.error(function (data, status, headers, config) {
			alert('Please check your network');
		})
	}

})