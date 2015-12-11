
app.controller("SearchCtrl", function ($scope, $http, $global) {

    $scope.submit = function () {
        $http.post(serv_addr, {
            "action": "search user",
            "data": {
                name: $scope.username,
                password: $scope.password,
                sex: parseInt($scope.sex)
                // need revised .........
            }
        })
        .success(function (data, status, headers, config) {
            alert("success!");
        })
        .error(function (data, status, header, config) {
            console.log(status);
            alert(status);
        });
    };

    $scope.log = function () {
        // for debug use
    }
});
