registerModal = {
    backdrop: true,
    backdropClick: true,
    dialogFade: false,
    keyboard: true,
    templateUrl: '/pages/register.html',
}

modals = {};

var dumpTarget;
function dump(data){
    dumpTarget.innerHTML=data;
}

app.controller('MainCtrl', function ($scope, $http, $uibModal) {

    $scope.openRegisterModal = function () {
        console.log("register");
        modals['registerModal'] = $uibModal.open(registerModal);
    };
})
