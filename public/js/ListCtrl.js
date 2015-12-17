app.controller("ListCtrl", function ($scope, $http, $global, $uibModal) {
    $scope.id_array = [];
    $scope.field_array = [];
    /*selected elem in elems*/
    $scope.elem = null;
    $scope.elems = []; // get output from server
    $scope.dataObjects = [];
    $scope.selectedItem = null;
    $scope.myExtra = {};
    console.log($scope);

    $scope.rowClass = function (elem, elems) {
        if (elems.indexOf(elem) % 2 == 0) return 'nor';
        else return 'alt';
    };

    $scope.openDetailModal = function (html_path, elem) {
      console.log("opening detial");
        if (html_path == "/pages/user_detail.html") {
            $scope.target_account_id = elem;
        } else {
            $scope.elem = elem;
            $scope.selectedItem = $scope.dataObjects[$scope.elems.indexOf(elem)];
        }
        $scope.modalItem = $uibModal.open(new Modal(html_path, $scope));
        console.log($scope.modalItem);
        //console.log($scope);
    } 

    $scope.closeModal = function () {
        console.log($scope.modalItem);
        $scope.modalItem.close();
    };

    $scope.loadElements_legacy = function (action) {
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
    };

    function isLegacy(action) {
        switch (action) {
            case 'GetProfileList':
            case 'GetAnnouncementList':
                return true;
            default:
                return false;
        }
    }

    $scope.loadElements = function (action, p1, p2) {
        if (action == null)
            throw new Error("ListCtrl::loadElements param action must be string! (now is null)");
        utils.log("loading elements of " + action);
        displayName = getDisplayNameFromAction(action, p1);

        $scope.text_before_list = "Loading " + displayName + "s...";

        /* find stub instance */
        var stub_name = action.toLowerCase();
        var prefix = "";
        if (stub_name.indexOf("get") == 0)
            prefix = "get";
        var stub_array = stub.match_by_tableName(stub_name);
        if (stub_array.length == 0) {
            if (isLegacy(action)) {
                $scope.loadElements_legacy(action);
            } else {
                var message = "this is not supported by ListCtrl (" + action + ")";
                utils.log(message);
                throw new Error(message);
            }
        }
        else {
            var stub_instance = stub_array[0];
            var consumer = function (dataObject_array) {
                utils.log("received elements of " + action);
                $scope.dataObjects = dataObject_array;
                var elements = dataObject_array.map(function (dataObject) {
                    return dataObject.toObject();
                });
                var n = elements.length;
                if (n == 0)
                    $scope.text_before_list = "There are no " + displayName + " currently. Come again later";
                else if (n == 1)
                    $scope.text_before_list = "There is 1 " + displayName;
                else
                    $scope.text_before_list = "There are " + n + " " + displayName + "s";
                //$scope.elems=[];
                //elements.forEach(function (e,i){$scope.elems[i]=e;});
                $scope.elems = elements;
                //$scope.elems=angular.copy(elements);
                //$scope.$parent.closeModal();
                //$scope.$emit();
                //try {
                //    $scope.$apply();
                //} catch (exception) {
                //    console.log(exception);
                //}
                //$scope.$$ChildScope.$apply();
                utils.log("received elements of " + action);
            };
            //stub_instance.use_all_instance_list(consumer);
            var filter = getMainDataObjectFilter(stub_instance, p1);
            DataObjectManager.request(stub_instance, filter, consumer);
        }
    };

    /**
     * @param stub_instance : DataObject instance of current level
     * */
    function getMainDataObjectFilter(stub_instance, p1) {
        switch (stub_instance.tableName()) {
            case new stub.Post_stub().tableName():
                var discussboardId = $scope.$parent.selectedItem.get_discussboard_id();
                return function (post) {
                    //post.create_on_server();
                    return post.get_discussboard_id() == discussboardId;
                };
            case new stub.Reply_stub().tableName():
                var postId = $scope.$parent.selectedItem.get_post_Id();
                return function (reply) {
                    return reply.get_post_Id() == postId;
                };
            case new stub.Event_stub().tableName():
                var event_type = p1.toUpperCase().charAt(0);
                return function (event) {
                    return event.get_event_type() == event_type;
                };
            default:
                return function () {
                    return true;
                }
        }
    }

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

    $scope.loadExtraSubElements = function (action, elem) {
        if (action == null)
            throw new Error("ListCtrl::loadExtraElements param action must be string! (now is null)");
        if (elem == null)
            throw new Error("ListCtrl::loadExtraElements param elem must not be null!");
        utils.log("loading Extra elements of " + action);
        var target = action.toLowerCase();
        switch (target) {
            case 'reply':
                loadReplySubExtra(elem);
                break;
            default:
                throw new Error("ListCtrl : param action must be string! (now is null)");
        }
    };

    function loadReplyExtra() {
        utils.log("loading user info");
        $scope.myExtra.creator = "loading creator name...";
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
                        $scope.myExtra.creator = usernames[0].getDisplayName();
                    }
                };
                DataObjectManager.request(username_stub, usernameFilter, usernameConsumer);
            }
        };
        DataObjectManager.request(user_stub, userFilter, usersConsumer);
    }

    function loadReplySubExtra(elem) {
        utils.log("loading user info");
        elem.replierName = "loading replier name...";
        /* get reply instance */
        var index = $scope.elems.indexOf(elem);
        var reply = $scope.dataObjects[index];
        var target_user_id = reply.get_creator_account_id();
        var user_stub = new stub.User_stub();
        var userFilter = function (user) {
            return user.get_account_id() == target_user_id;
        };
        var usersConsumer = function (users) {
            if (users.length == 0) {
                utils.log("no matched user info");
                elem.replierName = "Cannot found replier info";
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
                        elem.replierName = "Cannot found replier info";
                    }
                    else {
                        //TODO
                        elem.replierName = usernames[0].getDisplayName();
                    }
                };
                DataObjectManager.request(username_stub, usernameFilter, usernameConsumer);
            }
        };
        DataObjectManager.request(user_stub, userFilter, usersConsumer);
        //TODO
    }

    function getDisplayNameFromAction(action, p1) {
        //TODO replaced by hard-code part for best user-friendly
        if (action == null || action == "" || action instanceof Array)
            throw Error("getDisplayNameFromAction : invalid param action! Should be string");
        switch (action) {
            case "Event":
                return p1;
            default:
                /* attempt to 'prettify' the display name */
                var name = action[0];
                var actionL = action.toUpperCase();
                var n = action.length;
                for (var i = 1; i < n; i++) {
                    if (action[i] == actionL[i])
                        name += " ";
                    name += action[i]
                }
                return name;
        }
    }

    function checkDummyModal() {
        if ($scope.text_before_list == "" || $scope.text_before_list == null) {
            $scope.closeModal();
            utils.log("dummy modal detected");
        }
    }
    $scope.deleteSubElement = function (elem) {
      console.log("deleting element");
    }

    $scope.openCreatePostModal = function () {
        if ($global.loggedIn() === false) {
          $scope.openLoginModal();
          return;
        }
        console.log("Add Post");
        $scope.modalActionItem = $uibModal.open(new Modal('/pages/add_post.html', $scope));
    };

    $scope.closeActionModal = function () {
      $scope.modalActionItem.close();
    }

    $scope.openCreateReplyModal = function () {
        if ($global.loggedIn() === false) {
          $scope.openLoginModal();
          return;
        }
        console.log("Add Reply");
        $scope.modalActionItem = $uibModal.open(new Modal('/pages/add_reply.html', $scope));
    }

});

