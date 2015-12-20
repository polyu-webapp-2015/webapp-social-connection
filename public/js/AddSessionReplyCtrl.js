app.controller('AddSessionReplyCtrl', function ($scope, $http, $global, $uibModal) {
    $scope.showAlert = false;

    $scope.submit = function () {
        if (!$scope.comment) {
            $scope.showAlert = true;
            return;
        }
        $http.post(serv_addr, {
            action: 'CreateSessionReply',
            data: {
                session_id: $global.getSessionId(),
                event_id: $scope.elem.event_id,
                message: $scope.comment
            }
        })
        .success(function (data, status, headers, config) {
            if (data.result_code === 'Success') {
                $scope.elems.push(data.field_array);
                console.log(elems);
                $scope.closeActionModal();
            }
            else {
                alert('something went wrong');
            }
        })
        .error(function (data, status ,headers, config) {
            alert('Please check your network.');
        });
    };

});