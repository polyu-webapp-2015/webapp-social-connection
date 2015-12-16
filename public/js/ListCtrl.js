app.controller("ListCtrl", function ($scope, $http, $global, $uibModal) {
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
  };
  $scope.loadExtraElements = function (action) {
    if (action == null)
      throw new Error("ListCtrl::loadExtraElements param action must be string! (now is null)");
    utils.log("loading Extra elements of " + action);
    var target = action.toLowerCase();
    switch (target) {
      case 'reply':
        loadReplyExtra();
        break;
      default:
        throw new Error("ListCtrl : param action must be string! (now is null)");
    }
  };

  function loadReplyExtra() {
    utils.log("loading user info");
    $scope.myExtra.creator = "loading creator...";
    /* get user instance */
    var target_user_id = $scope.$parent.selectedItem.get_creator_account_id();
    var user_stub = new stub.User_stub();
    var userFilter = function (user) {
      return user.get_account_id() == target_user_id;
    };
    var usersConsumer = function (users) {
      if (users.length == 0) {
        utils.log("no matched user info");
        $scope.myExtra.creator = "Cannot found creator info";
      } else {
        /* get username instance */
        utils.log("loading username");
        var username_stub = new stub.Username();
        var usernameFilter = function (username) {
          return username.get_account_id() == target_user_id;
        };
        var usernameConsumer = function (usernames) {
          if (usernames.length == 0) {
            utils.log("no matched username");
            $scope.myExtra.creator = "Cannot found creator info";
          }
          else {
            //TODO
            $scope.myExtra.creator = usernames[0].getDisplayName();
          }
        };
        DataObjectManager.request(username_stub, usernameFilter, usernameConsumer);
      }
    };
    DataObjectManager.request(user_stub, userFilter, usersConsumer);
    //TODO
  }


});

