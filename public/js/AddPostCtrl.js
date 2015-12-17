app.controller('AddPostCtrl', function ($scope, $http, $global, $uibModal) {

    $scope.submit = function () {
        console.log($scope.elem);
        /*$http.post(serv_addr, {
                //TODO create attraction (server)
                "action": "CreatePost",
                "data": {
                    session_id: $global.getSessionId(),
                    subject: $scope.post.subject,
                    discussboard_id: $scope.elem.discussboard_id,
                    description: $scope.post.description
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
        var post = new stub.Post_stub();
        post.set_subject($scope.post.subject);
        post.set_discussboard_id($scope.elem.discussboard_id);
$global.getAccountId()
        post.set_description($scope.post.description);
        var consumer = function (id_array) {
            alert("The new Post is created");
        $scope.closeActionModal();
        };
        post.create_rows_on_server([post], consumer);
    };

});