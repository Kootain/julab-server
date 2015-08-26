/**
 * MainCtrl - controller
 */
 tools={};
function mainCtrl($scope,notify) {

    this.userName = 'tanki';
    this.helloText = 'Welcome in SeedProject';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';
    notify.config({duration:1500});
    tools.notify=function(type,msg){
        notify({ message: msg, classes: type, templateUrl: 'views/common/notify.html'});
    }
    tools.randomStr=function (len) {
    　　len = len || 32;
    　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    　　var maxPos = $chars.length;
    　　var pwd = '';
    　　for (i = 0; i < len; i++) {
    　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return pwd;
    }
};

function deviceOverviewCtrl() {
    
    this.userName = 'tanki';
    this.helloText = 'Welcome in SeedProject';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

};

function deviceCtrl($scope, $modal) {
    
    this.devices=[
    {id:'aa',isOnline:false},
    {id:'bb',isOnline:true}
    ];

    $scope.mustOnline=true;
    this.deviceListFilter=function(v,i,a){ 
        //console.log(v,$scope.mustOnline,$scope.mustOnline||v.isOnline);
        return !$scope.mustOnline||v.isOnline;
    };

    $scope.detectDevice = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/device/modal_add_device.html',
            size: 'sm',
            
            controller: 'deviceDetection'
        });

    };

};

function widgetFlotChart() {


    /**
     * Flot chart data and options
     */
    var d1 = [[1262304000000, 6], [1264982400000, 3057], [1267401600000, 20434], [1270080000000, 31982], [1272672000000, 26602], [1275350400000, 27826], [1277942400000, 24302], [1280620800000, 24237], [1283299200000, 21004], [1285891200000, 12144], [1288569600000, 10577], [1291161600000, 10295]];
    var d2 = [[1262304000000, 5], [1264982400000, 200], [1267401600000, 1605], [1270080000000, 6129], [1272672000000, 11643], [1275350400000, 19055], [1277942400000, 30062], [1280620800000, 39197], [1283299200000, 37000], [1285891200000, 27000], [1288569600000, 21000], [1291161600000, 17000]];

    var flotChartData1 = [
        { label: "Data 1", data: d1, color: '#17a084'},
        { label: "Data 2", data: d2, color: '#127e68' }
    ];

    var flotChartOptions1 = {
        xaxis: {
            tickDecimals: 0
        },
        series: {
            lines: {
                show: true,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 1
                    }, {
                        opacity: 1
                    }]
                }
            },
            points: {
                width: 0.1,
                show: false
            }
        },
        grid: {
            show: false,
            borderWidth: 0
        },
        legend: {
            show: false
        }
    };

    var flotChartData2 = [
        { label: "Data 1", data: d1, color: '#19a0a1'}
    ];

    var flotChartOptions2 = {
        xaxis: {
            tickDecimals: 0
        },
        series: {
            lines: {
                show: true,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 1
                    }, {
                        opacity: 1
                    }]
                }
            },
            points: {
                width: 0.1,
                show: false
            }
        },
        grid: {
            show: false,
            borderWidth: 0
        },
        legend: {
            show: false
        }
    };

    var flotChartData3 = [
        { label: "Data 1", data: d1, color: '#fbbe7b'},
        { label: "Data 2", data: d2, color: '#f8ac59' }
    ];

    var flotChartOptions3 = {
        xaxis: {
            tickDecimals: 0
        },
        series: {
            lines: {
                show: true,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 1
                    }, {
                        opacity: 1
                    }]
                }
            },
            points: {
                width: 0.1,
                show: false
            }
        },
        grid: {
            show: false,
            borderWidth: 0
        },
        legend: {
            show: false
        }
    };

    /**
     * Definition of variables
     * Flot chart
     */

    this.flotChartData1 = flotChartData1;
    this.flotChartOptions1 = flotChartOptions1;
    this.flotChartData2 = flotChartData2;
    this.flotChartOptions2 = flotChartOptions2;
    this.flotChartData3 = flotChartData3;
    this.flotChartOptions3 = flotChartOptions3;


};

function deviceDetection($scope, $http, $modal, $modalInstance){
    $scope.deviceList=[];
    $scope.isLoading;
    var modal={
        ok: function () {
            console.log('$scope work');
                $modalInstance.close();
            },

        cancel: function () {
                    $modalInstance.dismiss('cancel');
                }
        };
    $scope.scan=function(){
        $scope.isLoading=true;
        $http.get('env/devices')
        .success(function(data, status, headers, config){
            $scope.deviceList=angular.fromJson(data);
            $scope.isLoading=false;
        })
        .error(function(data, status, headers, config){
            $scope.isLoading=false;
            tools.notify('alert-danger', 'get device list error,please try again.');
        });
    }
    $scope.scan();
    $scope.deviceDetail={};
    $scope.ok=modal.ok;
    $scope.cancel=modal.cancel;
    $('#list').slimScroll({
        height: '250px'
    });

    $scope.registerDevice=function (deviceInfo) {
        $modal.open({
            templateUrl: 'views/device/device_add_form.html',
            size: 'md',
            controller: 'addDevice',
            resolve:{
                'deviceInfo':function(){
                    return deviceInfo;
                }
            }
        });

    };
};

function addDevice($scope, $modalInstance, deviceInfo){
    console.log(deviceInfo);
    $scope.formDetails={'deviceInfo':deviceInfo};
    $scope.submit = function() {
        if ($scope.detailForm.$valid) {
            $http.post('api/devices', $scope.formDetails)
            .success(function(data, status, headers, config){
                tools.notify('alert-success','register device success');
            })
            .error(function(data, status, headers, config){
                rools.notify('alert-danger','register device with error, please try again');
            });
        }
    }
}



function reagentCtrl($scope, $modal, $compile, $timeout, RfidInfo, DTColumnBuilder, DTOptionsBuilder, DTColumnDefBuilder) {
    var table=$('#reagents-table').dataTable();
    sel = 
    $scope.selected={};
    $scope.selectAll=false;

    this.dtOptions = DTOptionsBuilder.newOptions()
    .withPaginationType('full_numbers').withDisplayLength(10)
    .withOption('rowCallback', function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
        $('td', nRow).unbind('click');
        $('td', nRow).bind('click', function() {
            console.log($('input',nRow).attr('id'));
        });
        return nRow;
    });
    this.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0).notSortable(),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3).notSortable(),
    ];

    $scope.toggleAll=function(selectAll, selected){
        for(var x in selected) {
            //if($('#'+x).length>0)
                selected[x]=selectAll;
            //else selected[x]=false;
        }
        console.log(selected);
    };


    $scope.toggleOne=function(id){
        $scope.selected[id]=!$scope.selected[id];
        console.log($scope.selected);
    }

    $scope.find=function(selected){
        console.log(selected);
        var toFind=[];
        for(var i in selected) 
            if(selected[i]) toFind.push(i);
        socket.emit('search',{serial: tools.randomStr(10), list: toFind});
        socket.on('search result',function(data){
            console.log(data);
        })
    }
    $scope.reagents=RfidInfo.find(
        function(val){
            console.log($scope.reagents);
            for(var x=0;x<$scope.reagents.length;x++) 
                $scope.selected[$scope.reagents[x].id]=false;
        },
        function(res){
            tools.notify('alert-danger',res.data.error.message);
        });
    // [{cas:'120-3112-44',rfid:'R0012313AB1234',ops:''},
    // {cas:'120-3112-44',rfid:'R0012313AB1234',ops:''},
    // {cas:'12234-3112-44',rfid:'R0xxx12313AB1234',ops:''},
    // {cas:'130-3112-44',rfid:'R0012313AB1234',ops:''},
    // {cas:'120-3112-44',rfid:'R0012313AB1234',ops:''}]
    

    $scope.refresh=function(){
        $('#reagent-box').addClass('animated fadeOut');
        var display=function(){
            $('#reagent-box').removeClass('animated fadeOut');
            $('#reagent-box').addClass('animated fadeIn');
        }
        $scope.reagents= RfidInfo.find(
            function(val){
                console.log(val);
                $timeout(display,1000);
            },
            function(res){
                console.log(res);
                tools.notify('alert-danger',res.data.error.message);
                display();
            });
        for(var x=0;x<$scope.reagents.length;x++) $scope.selected[$scope.reagents[x]]=false;
        
    }

    $scope.addReagent=function(id){
        var info={
            name: $('#cas-'+id).val(),
            rfid:$('#rfid-'+id).val()
        };
        console.log(info);
        RfidInfo.create(info,
            function(val, resHeader){//success
                $scope.close(id);
                info.flag=true;
                $scope.reagents.push(info);
                console.log(val);
                console.log(resHeader);
            },
            function(res){//error
                console.log(res);
                tools.notify('alert-danger', res.data.error.message);
            });


    };

    $scope.close=function(id){
        $(id).parents('tr').remove();
    }

    $scope.add=function(){
        var id=tools.randomStr(10);
        $('#reagents-table').dataTable().fnAddData(
            ['',
             '<input id="cas-{0}" type="text" id="CAS" class="form-control">'.format(id),
             '<input id="rfid-{0}" type="text" id="RFID" class="form-control">'.format(id),
             '<ops id="{0}"><ops>'.format(id)
            ]);
        comp=$compile(
             '<a ng-click="addReagent(\'{0}\')" class="btn btn-xs btn-outline btn-primary"><i class="fa fa-check"></i></a>&nbsp;&nbsp;'.format(id)+
             '<a ng-click="close(\'{0}\')" class="btn btn-xs btn-outline btn-danger"><i class="fa fa-remove"></i></a>'.format(id)
             )($scope);
        $('ops#'+id).html(comp);
        socket.emit('web reagent add', { serial: id });
        socket.on('reagent rfid result',function(data){
            console.log(data);
            if(data.serial!=id) return;
            $('#rfid-'+id).val(data.rfid);
        });

        console.log($scope.reagents);
    }



    $scope.mustOnline=true;
    this.deviceListFilter=function(v,i,a){ 
        //console.log(v,$scope.mustOnline,$scope.mustOnline||v.isOnline);
        return !$scope.mustOnline||v.isOnline;
    };

    $scope.detectDevice = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/device/modal_add_device.html',
            size: 'sm',
            
            controller: 'deviceDetection'
        });

    };

};
/**
 * chartJsCtrl - Controller for data for ChartJs plugin
 * used in Chart.js view
 */
function chartJsCtrl() {

    /**
     * Data for Polar chart
     */
    this.polarData = [
        {
            value: 300,
            color:"#a3e1d4",
            highlight: "#1ab394",
            label: "App"
        },
        {
            value: 140,
            color: "#dedede",
            highlight: "#1ab394",
            label: "Software"
        },
        {
            value: 200,
            color: "#b5b8cf",
            highlight: "#1ab394",
            label: "Laptop"
        }
    ];

    /**
     * Options for Polar chart
     */
    this.polarOptions = {
        scaleShowLabelBackdrop : true,
        scaleBackdropColor : "rgba(255,255,255,0.75)",
        scaleBeginAtZero : true,
        scaleBackdropPaddingY : 1,
        scaleBackdropPaddingX : 1,
        scaleShowLine : true,
        segmentShowStroke : true,
        segmentStrokeColor : "#fff",
        segmentStrokeWidth : 2,
        animationSteps : 100,
        animationEasing : "easeOutBounce",
        animateRotate : true,
        animateScale : false
    };

    /**
     * Data for Doughnut chart
     */
    this.doughnutData = [
        {
            value: 300,
            color:"#a3e1d4",
            highlight: "#1ab394",
            label: "App"
        },
        {
            value: 50,
            color: "#dedede",
            highlight: "#1ab394",
            label: "Software"
        },
        {
            value: 100,
            color: "#b5b8cf",
            highlight: "#1ab394",
            label: "Laptop"
        }
    ];

    /**
     * Options for Doughnut chart
     */
    this.doughnutOptions = {
        segmentShowStroke : true,
        segmentStrokeColor : "#fff",
        segmentStrokeWidth : 2,
        percentageInnerCutout : 45, // This is 0 for Pie charts
        animationSteps : 100,
        animationEasing : "easeOutBounce",
        animateRotate : true,
        animateScale : false
    };

    /**
     * Data for Line chart
     */
    this.lineData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Example dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "Example dataset",
                fillColor: "rgba(26,179,148,0.5)",
                strokeColor: "rgba(26,179,148,0.7)",
                pointColor: "rgba(26,179,148,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(26,179,148,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    this.lineDataDashboard4 = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Example dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 40, 51, 36, 25, 40]
            },
            {
                label: "Example dataset",
                fillColor: "rgba(26,179,148,0.5)",
                strokeColor: "rgba(26,179,148,0.7)",
                pointColor: "rgba(26,179,148,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(26,179,148,1)",
                data: [48, 48, 60, 39, 56, 37, 30]
            }
        ]
    };

    /**
     * Options for Line chart
     */
    this.lineOptions = {
        scaleShowGridLines : true,
        scaleGridLineColor : "rgba(0,0,0,.05)",
        scaleGridLineWidth : 1,
        bezierCurve : true,
        bezierCurveTension : 0.4,
        pointDot : true,
        pointDotRadius : 4,
        pointDotStrokeWidth : 1,
        pointHitDetectionRadius : 20,
        datasetStroke : true,
        datasetStrokeWidth : 2,
        datasetFill : true
    };

    /**
     * Options for Bar chart
     */
    this.barOptions = {
        scaleBeginAtZero : true,
        scaleShowGridLines : true,
        scaleGridLineColor : "rgba(0,0,0,.05)",
        scaleGridLineWidth : 1,
        barShowStroke : true,
        barStrokeWidth : 2,
        barValueSpacing : 5,
        barDatasetSpacing : 1
    };

    /**
     * Data for Bar chart
     */
    this.barData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(26,179,148,0.5)",
                strokeColor: "rgba(26,179,148,0.8)",
                highlightFill: "rgba(26,179,148,0.75)",
                highlightStroke: "rgba(26,179,148,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    /**
     * Data for Radar chart
     */
    this.radarData = {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(26,179,148,0.2)",
                strokeColor: "rgba(26,179,148,1)",
                pointColor: "rgba(26,179,148,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    };

    /**
     * Options for Radar chart
     */
    this.radarOptions = {
        scaleShowLine : true,
        angleShowLineOut : true,
        scaleShowLabels : false,
        scaleBeginAtZero : true,
        angleLineColor : "rgba(0,0,0,.1)",
        angleLineWidth : 1,
        pointLabelFontFamily : "'Arial'",
        pointLabelFontStyle : "normal",
        pointLabelFontSize : 10,
        pointLabelFontColor : "#666",
        pointDot : true,
        pointDotRadius : 3,
        pointDotStrokeWidth : 1,
        pointHitDetectionRadius : 20,
        datasetStroke : true,
        datasetStrokeWidth : 2,
        datasetFill : true
    };
};


angular
    .module('julab')
    .controller('mainCtrl', mainCtrl)
    .controller('widgetFlotChart',widgetFlotChart)
    .controller('chartJsCtrl',chartJsCtrl)

    .controller('deviceOverviewCtrl',deviceOverviewCtrl)
    .controller('deviceCtrl', deviceCtrl)
    .controller('deviceDetection', deviceDetection)
    .controller('addDevice', addDevice)

    .controller('reagentCtrl', reagentCtrl);




