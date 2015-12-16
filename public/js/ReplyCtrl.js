app.controller("ReplyCtrl", function ($scope, $http, $global, $uibModal) {

  /**
   * This is stack of param to exchange data across multi-layer of modal
   * @deprecated //TODO replace this part using scope hierarchy
   * */
  if ($scope.myParamStack == null) {
    $scope.myParamStack = [];
  }
  var myParamStackOffset = $scope.myParamStack.length;
  var myParam = {};
  myParam.list = [];
  myParam.index = null;
  $scope.myParamStack.push(myParam);
  var parentParam = $scope.myParamStack[myParamStackOffset - 1];

  /**
   * This function cannot be replaced by constant,
   * because this controller instance is created
   * before the stub scrips are loaded
   * */
  function instance() {
    return new stub.Reply_stub();
  }

  /**
   * @return string : user friendly display name
   * */
  function element_name() {
    //return instance().tableName();
    return "Reply";
  }

  $scope.current_post = {
    subject: "loading",
    description: "loading",
    creator: "loading"
  };

  function onDataObjectsReceived(dataObjects) {
    myParam.list = dataObjects;
    var elementName = element_name();
    update_modal_title(elementName);
    if (dataObjects.length == 0) {
      $scope.text_before_list = "There are no " + elementName;
      $scope.elems = [];
    }
    else {
      $scope.text_before_list = "There are " + dataObjects.length + " " + elementName;
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
    /* display post info */
    var post = parentParam.list[parentParam.index];
    //$scope.current_post.creator=post.get_creator_account_id();
    $scope.current_post.subject = post.get_subject();
    $scope.current_post.description = post.get_description();
    var target_account_id = post.get_creator_account_id();
    /* request creator name */
    //use_creator_name(post, function (name) {
    //  $scope.current_post.creator = name;
    //});
    var usernameInstance = new stub.Username();
    DataObjectManager.request(usernameInstance, function (username) {
      return username.get_account_id() == target_account_id;
    }, function (usernames) {
      if (usernames.length == 0)
        $scope.current_post.creator = "cannot found user";
      else
        $scope.current_post.creator = usernames[0].getDisplayName();
    });
    /* request reply list */
    var target_post_id = post.get_post_Id();
    var filter = function (reply) {
      return reply.get_post_Id() == target_post_id;
    };
    var forceUpdate = false;
    DataObjectManager.request(instance(), filter, onDataObjectsReceived, forceUpdate);
  };

  $scope.closeModal = function () {
    $scope.modalItem.close();
  };

  /**@deprecated use complex stub to avoid repeating the code*/
  function use_creator_name(post, consumer) {
    var instance = new stub.User_stub();
    var creatorAccountId = post.get_creator_account_id();
    var userFilter = function (user) {
      return user.get_account_id() == creatorAccountId
    };
    var userConsumer = function (users) {
      if (users.length < 1) {
        consumer("Cannot Find User");
      } else {
        var user = users[0];
        var instance = new stub.Title_stub();
        var titleFilter = function (title) {
          return title.get_title_id() == user.get_title_id();
        };
        var titleConsumer = function (titles) {
          var title = "";
          if (titles.length < 1) {
          } else {
          }
        };
        DataObjectManager.request(instance, titleFilter, titleConsumer);
      }
    };
    DataObjectManager.request(instance, userFilter, userConsumer);
  }

});

