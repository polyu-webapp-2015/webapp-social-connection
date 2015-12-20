app.controller("AnalysisCtrl", function ($scope, $http, $global, $uibModal) {

    //$scope.mainModal = null;
    //$scope.modalItem = null;

    $scope.title_event_by_user = "Show Event by User Count";

    $scope.showMainModal = function () {
        $scope.mainModal = $uibModal.open(new Modal('/pages/analysis_main.html', $scope));
    };

    $scope.openDetailModal = function (html_path, elem) {
        $scope.elem = elem;
        $scope.modalItem = $uibModal.open(new Modal(html_path, $scope));
        //console.log($scope);
    }
});

