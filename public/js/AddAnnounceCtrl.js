
app.controller("AddAnnounceCtrl", function ($scope, $http, $global) {

    $scope.lock = false;
    $scope.submit = function () {
        //$scope.gender = parseInt($scope.gender);
        if ($scope.lock) return;
        console.log($scope.announce);
        $scope.lock = true;

        $http.post(serv_addr, {
            action: "CreateAnnouncement",
            data: {
                session_id: $global.getSessionId(),
                subject: $scope.announce.title,
                description: $scope.announce.content,
            }
        })
        .success(function (data, status, headers, config) {
            $scope.lock = false;
            if (data.result_code === 'Success') {
                alert("success!");
                console.log(data);
                $scope.closeModal();
            }
            else {
                alert("something wrong happens");
                console.log(data);
            }
        })
        .error(function (data, status, header, config) {
            $scope.lock = false;
            console.log(status);
            alert('internal error');
        });
    };

    $scope.log = function () {
        // for debug use
    }
});
