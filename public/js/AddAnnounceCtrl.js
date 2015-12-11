
app.controller("AddAnnounceCtrl", function ($scope, $http, $global) {

    $scope.submit = function () {
        //$scope.gender = parseInt($scope.gender);
        console.log($scope.announce);
        
        $http.post(serv_addr, {
            action: "CreateAnnouncement",
            data: {
                subject: $scope.announce.title,
                description: $scope.announce.content,
            }
        })
        .success(function (data, status, headers, config) {
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
            console.log(status);
            alert('internal error');
        });
    };

    $scope.log = function () {
        // for debug use
    }
});
