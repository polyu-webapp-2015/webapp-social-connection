app.controller('AddDiscussBoardCtrl', function ($scope, $http, $global, $uibModal) {

    $scope.submit = function () {
        var data =
        {
            session_id: $global.getSessionId(),
            subject: $scope.discussboard.subject,
            description: $scope.discussboard.description
        };
        var my_account_id=$global.getAccountId();
        var discussBoard = new stub.DiscussBoard_stub();
        discussBoard.set_subject($scope.discussboard.subject);
        discussBoard.set_description($scope.discussboard.description);
        discussBoard.set_creator_account_id(my_account_id);
        discussBoard.set_editor_account_id(my_account_id);
        var consumer = function (id_array) {
            //alert("new id is " + id_array[0]);
            alert("The new Discuss Board is created");
            $scope.closeModal();
        };
        discussBoard.create_rows_on_server([discussBoard], consumer);
    };

});