app.controller('AddReplyCtrl', function ($scope, $http, $global, $uibModal) {

    $scope.submit = function () {
        var data = {
            session_id: $global.getSessionId(),
            account_id: $global.getAccountId(),
            description: $scope.comment
        };
        var consumer = function (id_array) {
            alert("The new Reply is created");
            $scope.closeActionModal();
            $scope.closeModal();
        };
        var reply = new stub.Reply_stub();
        reply.set_post_Id($scope.$parent.selectedItem.get_post_Id());
        reply.set_creator_account_id($global.getAccountId());
        reply.set_editor_account_id($global.getAccountId());
        reply.set_message($scope.comment);
        reply.create_rows_on_server([reply], consumer);
    };

});