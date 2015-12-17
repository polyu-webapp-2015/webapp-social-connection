app.controller('AddAttractionCtrl', function ($scope, $http, $global, $uibModal) {

    $scope.submit = function () {
        /*$http.post(serv_addr, {
                //TODO create attraction (server)
                "action": "createAttraction",
                "data": {
                    session_id: $global.getSessionId(),
                    title: $scope.title,
                    location: $scope.location,
                    intro: $scope.intro
                }
            })
            .success(function (data, status, headers, config) {
                alert("success!");
                console.log(data);
                $scope.closeModal();
            })
            .error(function (data, status, headers, config) {
                console.log(status);
                alert(status);
            });*/
        var attraction = new stub.Event_stub();
        attraction.set_event_type(event_type.A);
        attraction.set_subject($scope.title);
        attraction.set_description($scope.intro);
        attraction.set_venue_id($scope.location);
        var consumer = function (id_array) {
            alert("The new Attraction is created");
            $scope.closeModal();
        };
        attraction.create_rows_on_server([attraction], consumer);
    };

});