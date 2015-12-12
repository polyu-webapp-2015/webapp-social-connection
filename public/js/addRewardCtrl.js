
app.controller("AddRewardCtrl", function ($scope, $http, $global) {

    $scope.submit = function () {
        //$scope.gender = parseInt($scope.gender);
        console.log($scope.rewards);
        console.log($scope.rewards.date.getDate());
        console.log($scope.rewards.date.getTime());
        var date = $scope.rewards.date;
        var dd = date.getDate();
        var mm = date.getMonth()+1; //January is 0!
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        var time = $scope.announce.time;
        var HH = time.getHours();
        var MM = time.getMinutes();
        if (HH < 10) {
            HH = '0'+ HH;
        }
        if (MM < 10) {
            MM = '0'+ MM;
        }
        $scope.rewards.dateTime = new Date(yyyy, mm, dd, HH, MM).toString();
        console.log($scope.rewards.dateTime);
        $http.post(serv_addr, {
            action: "addRewards",
            data: {
                title: $scope.rewards.title,
                content: $scope.rewards.content,
                datetime: $scope.rewards.dateTime
            }
        })
        .success(function (data, status, headers, config) {
            $scope.usernameChecked = true;
            alert("success!");
            console.log(data);
            $scope.closeRegisterModal();
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
