app.controller("ListCtrl", function ($scope, $http, $global, $uibModal) {
  $scope.elems = [
    {
      name: "Dolor sit",
      content: "Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      name: "Sed ut",
      content: "Perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam."
    },
    {
      name: "Nemo enim",
      content: "Ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
      name: "Ut enim",
      content: "Ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"
    }
  ];

  $scope.id_array = [];
  $scope.field_array = [];
  $scope.elems = []; // get output from server

  $scope.rowClass = function (elem, elems) {
    if (elems.indexOf(elem) % 2 == 0) return 'nor';
    else return 'alt';
  };

  $scope.openDetailModal = function (html_path, elem) {
    $scope.elem = elem;
    $scope.modalItem = $uibModal.open(new Modal(html_path, $scope));
  };

  $scope.loadElements = function (action) {
    console.log("loading elements");
    console.log($scope.id_array);
    $http.post(serv_addr, {
        'action': action,
        'data': JSON.stringify({
          session_id: $global.getSessionId(),
          id_array: $scope.id_array,
          field_array: $scope.field_array
        })
      })
      .success(function (data, status, headers, config) {
        if (data.result_code === "Success")
          $scope.elems = data.element_array;
        else {
          alert('something wrong happens');
          console.log(data);
        }
        console.log($scope.elems);
      })
      .error(function (data, status, headers, config) {
        alert('internal error');
      })
  }

});

