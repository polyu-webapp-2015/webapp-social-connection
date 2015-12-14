app.controller("ForumCtrl", function ($scope, $http, $global, $uibModal) {

  $scope.id_array = [];
  $scope.field_array = [];
  $scope.elems = []; // get output from server

  $scope.elems = [
    {
      topic: "Dolor sit",
      intro: "Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      create_time: '19:21 20/12/2015'
    },
    {
      topic: "Dolor sit",
      intro: "Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      create_time: '19:21 20/12/2015'
    },
    {
      topic: "Ut enim",
      intro: "Ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
      create_time: '19:21 20/12/2015'
    }
  ];
  var temp;
  for (temp in $scope.elem) {
    if (temp.intro.length <= 20) {
      temp.brief = temp.intro;
    } else {
      temp.brief = temp.intro.slice(0, 16) + '...';
    }
  }
  console.log($scope);
  $scope.a = 'a';

  $scope.openDetailModal = function (html_path, elem) {
    $scope.elem = elem;
    $scope.modalItem = $uibModal.open(new Modal(html_path, $scope));
  };

  $scope.loadElements = function (action) {
    // action = 'GetForumList'
    utils.log("loading elements");
    console.log($scope.id_array);
    if (false) {
      $http.post(serv_addr, {
          'action': action,
          //TODO get all forum info (server)
          //not sure what info I should sent you (I want to get all forum info)
          'data': JSON.stringify({
            session_id: $global.getSessionId(),
            id_array: $scope.id_array,
            field_array: $scope.field_array
          })
        })
        .success(function (data, status, headers, config) {
          if (data.result_code === "Success") {
            //TODO process forum info (from server)
            //the data format I want is shown above in $scope.elems
            //$scope.elems = data.element_array;

            var temp;
            for (temp in $scope.elem) {
              if (temp.intro.length <= 20) {
                temp.brief = temp.intro;
              } else {
                temp.brief = temp.intro.slice(0, 16) + '...';
              }
            }
          }
          else {
            alert('something wrong happens');
            console.log(data);
          }
          console.log($scope.elems);
        })
        .error(function (data, status, headers, config) {
          alert('internal error');
        })
    } else {
      var instance=new stub.DiscussBoard_stub();
      var filter=function(discussBoard){return true;};
      var consumer=function(discussBoards){
        discussBoards.forEach(function(e){utils.log("received this dicussBoard"+ e.get_discussboard_id())});
      };
      var forceUpdate=false;
      DataObjectManager.request(instance,filter,consumer,forceUpdate);
    }
  }


});

