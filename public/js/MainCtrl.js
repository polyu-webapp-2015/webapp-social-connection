// controller of index.html
app.controller('MainCtrl', function ($scope, $http, $uibModal, $compile, $global) {
  _$http = $http;
  /*
   $global: self-defined global variables, look at app.js, app.factory for reference
   You should save infomation of the user there (USING setter and getter)

   $uibModal: take a brief look at http://angular-ui.github.io/bootstrap/, documentation about $uibModal service
   */

  $scope.closeModal = function () {
    //console.log($scope);
    //console.log($scope.modalItem);
    if ($scope.modalActionItem != null) {
      $scope.modalActionItem.close();
      return;
    }
    if ($scope.modalItem != null)
      $scope.modalItem.close();
    else {
      console.log($scope.modalItem);
      console.log($scope);
      console.log("attempted to close modal, but there is no modal");
    }
  };

  $scope.openRegisterModal = function () {
    if ($global.loggedIn() === false) {
      $scope.openLoginModal();
      return;
    }
    console.log("register");
    $scope.modalItem = $uibModal.open(new Modal('/pages/register.html', $scope));
    // Modal prototype, defined in app.js
    /*
     scope - a scope instance to be used for the modal's content (actually
     the $uibModal service is going to create a child scope of a provided scope).
     - from documentation
     */
  };

  $scope.openProfileModal = function () {
    if ($global.loggedIn() === false) {
      $scope.openLoginModal();

    }
    else {
      console.log($global.loggedIn());
      console.log($global.getUser());
      $scope.modalItem = $uibModal.open(new Modal('/pages/profile.html', $scope));
    }
  };

  $scope.openLoginModal = function () {
    console.log("login");
    $scope.modalItem = $uibModal.open(new Modal('/pages/login.html', $scope));
  };

  $scope.openAddAnnounceModal = function () {
    if ($global.loggedIn() === false) {
      $scope.openLoginModal();
      return;
    }
    console.log("add announce");
    $scope.modalItem = $uibModal.open(new Modal('/pages/add_announce.html', $scope));
  };

  $scope.openAddDiscussionModal = function () {
    if ($global.loggedIn() === false) {
      $scope.openLoginModal();
      return;
    }
    console.log("Add Discussion");
    $scope.modalItem = $uibModal.open(new Modal('/pages/add_discussion.html', $scope));
  };
  $scope.openAddAttractionModal = function () {
    if ($global.loggedIn() === false) {
      $scope.openLoginModal();
      return;
    }
    console.log("Add attraction");
    $scope.modalItem = $uibModal.open(new Modal('/pages/add_attraction.html', $scope));
  };

  $scope.whoami = function (session_id) {
    $http.post(serv_addr, {
        action: 'GetProfile',
        data: JSON.stringify({
          session_id: session_id,
          account_id: -1
        })
      })
      .success(function (data, status, headers, config) {
        if (data.result_code !== 'Session_Expired') {
          console.log(data);
          $global.setUser(data.element_array[0]);
          $global.setSessionId(session_id);
          $global.setUserAttr('isAnonymous', false);
          $scope.user = $global.getUser();

          $scope.viewConsole($global.getAccountType());
        }
        else $scope.openLoginModal();
      })
      .error(function (data, status, headers, config) {
        alert('internal error');
      })
  };

  $scope.logii = function () {
    // for test & debug usage
    console.log("log!!!");
    var user = $global.getUser(); // get a user profile copy
    console.log(user);
    user['b'] = 3;  // DO NOT set User's attributes in this way
    $global.setUserAttr("a", 3);
    console.log($global.getUser());

  };

  $scope.logoff = function () {
    sessionStorage.removeItem('session_id');
    $global.setUserAnonymous();
  };

  $scope.closeNavbar = function () {
    if ($('#navbar-toggle').css('display') !== 'none')
      document.getElementById('navbar-toggle').click();
  };

  $scope.openAddSessionModal = function () {
    if ($global.loggedIn() === false) {
      $scope.openLoginModal();
      return;
    }
    $scope.modalItem = $uibModal.open(new Modal('/pages/add_session.html', $scope));
  };

    $scope.openViewRewardsModal = function () {
        if ($global.loggedIn() === false) {$scope.openLoginModal(); return;}
        console.log("view rewards");
        $scope.modalItem = $uibModal.open(new Modal('/pages/view_rewards_admin.html', $scope));
    }

    $scope.openAddDiscussionModal = function () {
        if ($global.loggedIn() === false) {$scope.openLoginModal(); return;}
        console.log("Add Discussion");
        $scope.modalItem = $uibModal.open(new Modal('/pages/add_discussion.html', $scope));
      }

  $scope.openAddExhibitionModal = function () {
    if ($global.loggedIn() === false) {
      $scope.openLoginModal();
      return;
    }

    $scope.modalItem = $uibModal.open(new Modal('/pages/add_exhibition.html', $scope));
  };

  $scope.openUsersModal = function () {
    if ($global.loggedIn() === false) {
      $scope.openLoginModal();
      return;
    }
    $scope.modalItem = $uibModal.open(new Modal('/pages/user_list.html', $scope));
  };

  $scope.viewConsole = function (account_type) {
    if ($global.loggedIn() === false) {
      $scope.openLoginModal();
      return;
    }
    if (account_type === undefined) account_type = 'admin';
    if (account_type === 'admin') {
      $.get("/pages/console.html", {}, function (data, status, headers, config) {
        $("#content").html($compile(data)($scope));
      });
      $scope.selectedAnchor.removeClass("selected");
      $scope.selectedAnchor = $("#bottom-console-anchor");
      $scope.selectedAnchor.addClass("selected");
    }
    else {
      $.get("/pages/discover.html", {}, function (data, status, headers, config) {
        $("#content").html($compile(data)($scope));
      })
      $scope.selectedAnchor.removeClass("selected");
      $scope.selectedAnchor = $("#bottom-console-anchor");
      $scope.selectedAnchor.addClass("selected");
    }
  };

  $scope.viewSessions = function () {
    if ($global.loggedIn() === false) {
      $scope.openLoginModal();
      return;
    }
    $.get("/pages/sessions.html", {}, function (data, status, headers, config) {
      $("#content").html($compile(data)($scope));
    });
    $scope.selectedAnchor.removeClass("selected");
    $scope.selectedAnchor = $("#bottom-sessions-anchor");
    $scope.selectedAnchor.addClass("selected");
  };

  $scope.viewForum = function () {
    if ($global.loggedIn() === false) {
      $scope.openLoginModal();
      return;
    }
    //$.get("/pages/forum.html", {}, function (data, status, headers, config) {
    $.get("/pages/discussboard_list.html", {}, function (data, status, headers, config) {
      $("#content").html($compile(data)($scope));
    });
    $scope.selectedAnchor.removeClass("selected");
    $scope.selectedAnchor = $("#bottom-forum-anchor");
    $scope.selectedAnchor.addClass("selected");
  };

  $scope.viewInbox = function () {
    if ($global.loggedIn() === false) {
      $scope.openLoginModal();
      return;
    }
    //$.get("/pages/forum.html", {}, function (data, status, headers, config) {
    $.get("/pages/inbox.html", {}, function (data, status, headers, config) {
      $("#content").html($compile(data)($scope));
    });
    $scope.selectedAnchor.removeClass("selected");
    $scope.selectedAnchor = $("#bottom-inbox-anchor");
    $scope.selectedAnchor.addClass("selected");
  };

  /* add more modal function here ? */
  $scope.openDiscussBoardsModal = function () {
    if ($global.loggedIn() === false) {
      $scope.openLoginModal();
      return;
    }
    $scope.modalItem = $uibModal.open(new Modal('/pages/discussboard_list.html', $scope));
  };

  $scope.openAddDiscussBoardModal = function () {

    if ($global.loggedIn() === false) {
      $scope.openLoginModal();
      return;
    }
    $scope.modalItem = $uibModal.open(new Modal('/pages/add_discuss_board.html', $scope));
  }

  $scope.viewUserEvents = function () {

    if ($global.loggedIn() === false) {
      $scope.openLoginModal();
      return;
    }
    $scope.modalItem = $uibModal.open(new Modal('/pages/user_session_list.html', $scope));
  }

  $scope.openUserModal = function (account_id) {
      $scope.elem = {}; // todo
      $http.post(serv_addr, {
        action: 'GetProfileList',
        data: {
          session_id: $global.getSessionId(),
          id_array: [account_id],
        }
      })
      .success(function (data, status, headers, config) {
        console.log(data);
        $scope.elem = data.element_array[0];
        $scope.modalItem = $uibModal.open(new Modal('pages/user_detail.html', $scope));
      })
      .error(function (data, status, headers, config) {
        alert("Please check your network");
      });
  }

  var session_id = sessionStorage.getItem('session_id');
  $scope.whoami(session_id);
  $scope.selectedAnchor = $("#bottom-console-anchor");
  $scope.selectedAnchor.addClass("selected");

});
