
app.controller("SearchCtrl", function ($scope, $http, $global) {
    $scope.search = {};

    $scope.submit = function () {

        $http.post(serv_addr, {
            "action": "SearchProfileList",
            "data": {
                session_id: $global.getSessionId(),
                name: $scope.search.name !== undefined? $scope.search.name: '',
                city: $scope.search.city !== undefined? $scope.search.city: '',
                country: $scope.search.country !== undefined? $scope.search.country: '',
                organization: $scope.search.organization !== undefined? $scope.search.organization: '',
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
