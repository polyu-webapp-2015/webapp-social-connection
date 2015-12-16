app.controller("DiscussBoardCtrl", function ($scope, $http, $global, $uibModal) {

  /**
   * This is stack of param to exchange data across multi-layer of modal
   * */
  $scope.myParam={list:[],index:null};

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
  function element_name() {
    //return instance().tableName();
    return "Board";
  }

  function onDataObjectsReceived(dataObjects) {
    myParam.list = dataObjects;
    update_modal_title(element_name());
    if (dataObjects.length == 0) {
      $scope.text_before_list = "There are no " + element_name();
      $scope.elems = [];
    }
    else {
      $scope.text_before_list = "There are " + dataObjects.length + " " + element_name();
      if (dataObjects.length > 1)
        $scope.text_before_list += "s";
      var elements = dataObjects.map(function (dataObject) {
        return dataObject.toObject();
      });
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
    myParam.index = $scope.elems.indexOf(elem);
    $scope.modalItem = $uibModal.open(new Modal(html_path, $scope));
  };

  $scope.loadElements = function () {
    //console.log("loading elements");
    var filter = function (discussboard) {
      return true;
    };
    var forceUpdate = false;
    DataObjectManager.request(instance(), filter, onDataObjectsReceived, forceUpdate);
  };

  $scope.closeModal = function () {
    $scope.modalItem.close();
  }

});

