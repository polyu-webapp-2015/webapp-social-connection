
app.controller("SearchCtrl", function ($scope, $http, $global, $uibModal) {
    $scope.search = {};

    $scope.submit = function () {

        $http.post(serv_addr, {
            "action": "SearchProfileList",
            "data": {
                session_id: $global.getSessionId(),
                name: $scope.search.name !== undefined? $scope.search.name: '',
                city: $scope.search.city !== undefined? $scope.search.city: '',
                country: $scope.search.country !== undefined? $scope.search.country: '',
                organization: $scope.search.organization !== undefined? $scope.search.organization: '',
                // need revised .........
            }
        })
        .success(function (data, status, headers, config) {
            $scope.elems = data.element_array;
            $scope.listItem = $uibModal.open(new Modal("/pages/search_user_list.html", $scope));
        })
        .error(function (data, status, header, config) {
            console.log(status);
            alert(status);
        });
    };

    $scope.openDetailModal = function (html_path, elem) {

        console.log("opening detial");
        $scope.elem = elem; 
        $scope.target_account_id = elem;
        
        console.log($scope.elem);
        $scope.modalItem = $uibModal.open(new Modal(html_path, $scope));
    }

    $scope.closeItem = function () {
        $scope.listItem.close();
    }

    $scope.closeModal = function () {
        $scope.modalItem.close();
        $scope.modalItem = $scope.$parent.modalItem;
    }

    $scope.log = function () {
        // for debug use
    }
});
