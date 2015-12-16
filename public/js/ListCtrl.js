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
  /*selected elem in elems*/
  $scope.elem = null;
  $scope.elems = []; // get output from server
  $scope.dataObjects = [];
  $scope.selectedItem = null;
  $scope.myExtra = {};

  $scope.rowClass = function (elem, elems) {
    if (elems.indexOf(elem) % 2 == 0) return 'nor';
    else return 'alt';
  };

  $scope.openDetailModal = function (html_path, elem) {
    $scope.elem = elem;
    $scope.selectedItem = $scope.dataObjects[$scope.elems.indexOf(elem)];
    $scope.modalItem = $uibModal.open(new Modal(html_path, $scope));
    //console.log($scope);
  };
  $scope.closeModal = function () {
    $scope.modalItem.close();
  };

  $scope.loadElements = function (action) {
    if (action == null)
      throw new Error("ListCtrl::loadElements param action must be string! (now is null)");
    utils.log("loading elements of " + action);
    //console.log("loading elements");
    //console.log($scope.id_array);
    /*$http.post(serv_addr, {
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
     })*/

    /* find stub instance */
    var stub_name = action.toLowerCase();
    var prefix = "";
    if (stub_name.indexOf("get") == 0)
      prefix = "get";
    var stub_array = stub.match_by_tableName(stub_name);
    if (stub_array.length == 0)
      utils.log("this is not supported by ListCtrl (" + stub_name + ")");
    else {
      var stub_instance = stub_array[0];
      var consumer = function (dataObject_array) {
        utils.log("received elements of " + action);
        $scope.dataObjects = dataObject_array;
        var elements = dataObject_array.map(function (dataObject) {
          return dataObject.toObject();
        });
        $scope.elems = elements;
      };
      stub_instance.use_all_instance_list(consumer);
    }
    //TODO test
  };
  $scope.loadExtraElements = function (action) {
    if (action == null)
      throw new Error("ListCtrl::loadExtraElements param action must be string! (now is null)");
    utils.log("loading Extra elements of " + action);
    var target = action.toLowerCase();
    switch (target) {
      case 'reply':
        utils.log("loading post info");
        $scope.myExtra.creator = "loading creator...";
        var target_id = $scope.$parent.selectedItem.get_post_Id();
        var instance = new stub.Post_stub();
        var filter = function (post) {
          return post.get_post_Id() == target_id;
        };
        var consumer = function (posts) {
          if (posts.length == 0)
            $scope.myExtra.creator = "Cannot found creator info";
          else {
            //TODO
            $scope.myExtra.creator = "found creator info";
          }
        };
        DataObjectManager.request(instance, filter, consumer);
        //TODO
        break;
      default:
        throw new Error("ListCtrl : param action must be string! (now is null)");
    }
  }


});

