app.controller("DiscussBoardCtrl", function ($scope, $http, $global, $uibModal) {

  /**
   * This function cannot be replaced by constant,
   * because this controller instance is created
   * before the stub scrips are loaded
   * */
  function instance() {
    return new stub.DiscussBoard_stub();
  }

  /**
   * @return string : user friendly display name
   * */
  //TODO replace this value manually for each controller
  function element_name() {
    return instance().tableName();
  }

  function reloadUI(elements) {
    update_modal_title(element_name());
    if (elements.length == 0) {
      $scope.text_before_list = "There are no " + element_name();
      $scope.elems = [];
    }
    else {
      $scope.text_before_list = "There are " + elements.length + " " + element_name();
      if (elements.length > 1)
        $scope.text_before_list += "s";
      $scope.elems = elements;
    }
  }

  /**
   * @param name:string the User friendly display name of this controller's model
   * */
  function update_modal_title(name) {
    $scope.modal_title = "All " + name;
  }

  $scope.modal_title = "";

  $scope.text_before_list = "Loading elements...";

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

  $scope.loadElements = function () {
    console.log("loading elements");
    console.log($scope.id_array);
    //$http.post(serv_addr, {
    //    'action': action,
    //    'data': JSON.stringify({
    //      session_id: $global.getSessionId(),
    //      id_array: $scope.id_array,
    //      field_array: $scope.field_array
    //    })
    //  })
    //  .success(function (data, status, headers, config) {
    //    if (data.result_code === "Success")
    //      $scope.elems = data.element_array;
    //    else {
    //      alert('something wrong happens');
    //      console.log(data);
    //    }
    //    console.log($scope.elems);
    //  })
    //  .error(function (data, status, headers, config) {
    //    alert('internal error');
    //  });
    var filter = function (x) {
      console.log('checking');
      return true;
    };
    var consumer = function (xs) {
      console.log('received results');
      var legacy_list = xs.map(function (x) {
        return x.toObject(x);
      });
      reloadUI(legacy_list);
    };
    var forceUpdate = false;
    DataObjectManager.request(instance(), filter, consumer, forceUpdate);
  }

});

