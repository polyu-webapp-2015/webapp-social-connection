
app.controller("AddExhibitionCtrl", function ($scope, $http, $global) {
    $scope.exhibition = {};
    $scope.exhibition.date = new Date();
    $scope.submit = function () {
        //$scope.gender = parseInt($scope.gender);
        console.log($scope.exhibition);
        console.log($scope.exhibition.date.getDate());
        console.log($scope.exhibition.date.getTime());
        var date = $scope.exhibition.date;
        var dd = date.getDate();
        var mm = date.getMonth()+1; //January is 0!
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        } 
        if (mm < 10) {
            mm = '0' + mm;
        }

        var time = $scope.exhibition.time;
        var HH = time.getHours();
        var MM = time.getMinutes();
        if (HH < 10) {
            HH = '0'+ HH;
        }
        if (MM < 10) {
            MM = '0'+ MM;
        }
        $scope.exhibition.dateTime = yyyy+'-'+mm+'-'+dd+' '+HH+':'+MM+':00';

        console.log($scope.exhibition.dateTime);
        $http.post(serv_addr, {
            action: "CreateExhibition",
            data: {
                exhibition_id: $global.getExhibitionId(),
                subject: $scope.exhibition.subject,
                venue: $scope.exhibition.venue,
                quota: $scope.exhibition.quota,
                description: $scope.exhibition.description,
                event_time: $scope.exhibition.dateTime,
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
