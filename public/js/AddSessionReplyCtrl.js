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
                data.field_array['profile'] = $global.getUser();
                console.log(data.field_array);
                console.log($scope.elems);
                console.log($scope);
                $scope.elems.push(data.field_array);
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