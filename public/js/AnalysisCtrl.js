app.controller("AnalysisCtrl", function ($scope, $http, $global, $uibModal) {

    //$scope.mainModal = null;
    //$scope.modalItem = null;

    $scope.title_event_by_user = "Show Event by User Count";
    $scope.analysis_child_title = '';

    $scope.showMainModal = function () {
        $scope.mainModal = $uibModal.open(new Modal('/pages/analysis_main.html', $scope));
    };

    $scope.openDetailModal = function (html_path, child_title) {
        $scope.analysis_child_title = child_title;
        $scope.modalItem = $uibModal.open(new Modal(html_path, $scope));
    };
    $scope.closeModal = function () {
        if ($scope.modalItem != null)
            $scope.modalItem.close();
        else if ($scope.mainModal != null)
            $scope.mainModal.close();
        else {
            console.log($scope);
            console.log("attempted to close modal, but there is no modal");
        }
    };

    function array_to_v_bar_chart_text(data, width, height) {
        //var data_text = '10,50,60,80,40,15,120';
        //var title_text = '|Jan|Feb|Mar|Apr|May|Jun|Jul';
        var data_text = '';
        var title_text = '';
        if (data.value.length == 0) {
            data_text = '0';
            title_text = '|_';
        } else {
            data_text = data.value.reduce(function (a, e) {
                return a + ',' + e
            }, '');
            data_text = data_text.substring(1);
            title_text = data.title.reduce(function (a, e) {
                return a + '|' + e
            }, '');
        }
        var text = 'https://chart.googleapis.com/chart?cht=bvs&chs=' + width + 'x' + height + '&chd=t:' + data_text + '&chxt=x,y&chxl=0:' + title_text + '&chds=a';
        //var text = 'https://chart.googleapis.com/chart?cht=bhg&chs=' + width + 'x' + height + '&chd=t:' + data_text + '&chxt=x,y&chxl=0:' + title_text + '&chds=a';
        //var demo_text = 'https://chart.googleapis.com/chart?cht=bvs&chs=300x200&chd=t:10,50,60,80,40,15,120&chxt=x,y&chxl=0:|Jan|Feb|Mar|Apr|May|Jun|Jul&chds=a';
        return text;
    }

    var _chart_max_pixel = 300000;
    //var _chart_max_width = 1000;
    var _chart_max_width = 400;

    function array_to_h_bar_chart_text(data) {
        //var data_text = '10,50,60,80,40,15,120';
        //var title_text = '|Jan|Feb|Mar|Apr|May|Jun|Jul';
        var data_text = '';
        var title_text = '';
        if (data.value.length == 0) {
            data_text = '0';
            title_text = '|_';
        } else {
            data_text = data.value.reduce(function (a, e) {
                return a + ',' + e
            }, '');
            data_text = data_text.substring(1);
            title_text = data.title.reduce(function (a, e) {
                return a + '|' + e
            }, '');
        }
        var height = 30 * (data.value.length + 2) + 10;
        var width = Math.floor(_chart_max_pixel / height * 0.9);
        width = Math.min(width, _chart_max_width);
        var text = 'https://chart.googleapis.com/chart?cht=bhg&chs=' + width + 'x' + height + '&chd=t:' + data_text + '&chxt=x,y&chxl=1:' + title_text + '&chds=a';
        //var demo_text = '"http://chart.apis.google.com/chart?cht=bhg&chs=550x400&chd=t:1431,1085,1393,345,2514,2128&chxt=x,y&chxl=1:|Alexander|Amy|Barry|Brenda|Collin|Dwayne|&chxr=0,2600,20&chds=0,2600&chco=4D89F9&chbh=35,0,15&chg=8.33,0,5,5"';
        return text;
    }

    function draw_event_by_user_count(event_array) {
        //console.log(event_array);
        var data = {
            value: [],
            title: []
        };
        event_array.forEach(function (event, i) {
            data.value.push(event.user_count);
            data.title.push(event.subject);
        });
        var container = document.getElementById('chart');
        var image = document.createElement('img');
        container.appendChild(image);
        image.src = array_to_h_bar_chart_text(data)
        ;
    }

    $scope.load_event_by_user_count = function () {
        $http.post(serv_addr, {
                'action': _api_GetSessionList,
                'data': JSON.stringify({
                    session_id: $global.getSessionId(),
                    id_array: []
                })
            })
            .success(function (data, status, headers, config) {
                if (data.result_code === "Success") {
                    $scope.elems = data.element_array;
                    draw_event_by_user_count(data.element_array);
                }
                else {
                    alert('something wrong happens');
                    console.log(data);
                }
            })
            .error(function (data, status, headers, config) {
                alert('internal error');
            })
    };
});

