
app.controller("AddDiscussionCtrl", function ($scope, $http, $global) {
    $scope.session = {};
    $scope.session.date = new Date();
    $scope.submit = function () {
        //$scope.gender = parseInt($scope.gender);
        console.log($scope.session);
        console.log($scope.session.date.getDate());
        console.log($scope.session.date.getTime());
        var date = $scope.session.date;
        var dd = date.getDate();
        var mm = date.getMonth()+1; //January is 0!
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        } 
        if (mm < 10) {
            mm = '0' + mm;
        }

        var time = $scope.session.time;
        var HH = time.getHours();
        var MM = time.getMinutes();
        if (HH < 10) {
            HH = '0'+ HH;
        }
        if (MM < 10) {
            MM = '0'+ MM;
        }
        $scope.session.dateTime = new Date(yyyy, mm, dd, HH, MM).toString();
        console.log($scope.session.dateTime);
        $http.post(serv_addr, {
            action: "AddSession",
            data: {
                session_id: $global.getSessionId(),
                subject: $scope.session.title,
                description: $scope.session.content,
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