
app.controller("AddAnnounceCtrl", function ($scope, $http, $global) {

    $scope.submit = function () {
        //$scope.gender = parseInt($scope.gender);
        console.log($scope.announce);
        console.log($scope.announce.date.getDate());
        console.log($scope.announce.date.getTime());
        var date = $scope.announce.date;
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
        $scope.announce.dateTime = new Date(yyyy, mm, dd, HH, MM).toString();
        console.log($scope.announce.dateTime);
        $http.post(serv_addr, {
            action: "addAnnouncement",
            data: {
                title: $scope.announce.title,
                content: $scope.announce.content,
                datetime: $scope.announce.dateTime
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