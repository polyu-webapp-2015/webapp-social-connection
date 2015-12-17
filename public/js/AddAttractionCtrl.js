app.controller('AddAttractionCtrl', function ($scope, $http, $global, $uibModal) {

    $scope.submit = function () {
        var attraction = new stub.Event_stub();
        attraction.set_event_type(event_type.A);
        attraction.set_subject($scope.title);
        attraction.set_description($scope.intro);
        attraction.set_venue_id($scope.location);
        attraction.set_creator_account_id($global.getAccountId());
        attraction.set_editor_account_id($global.getAccountId());
        var consumer = function (id_array) {
            alert("The new Attraction is created");
            $scope.closeMdisodal();
        };
        attraction.create_rows_on_server([attraction], consumer);
    };

});