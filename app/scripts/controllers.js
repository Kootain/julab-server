/**
 * MainCtrl - controller
 */
tools={};
function mainCtrl($scope,notify) {

    this.userName = 'tanki';
    this.helloText = 'Welcome in SeedProject';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';
    tools.notify=function(type,msg){
        notify.config({duration:1500});
        notify({ message: msg, classes: type, templateUrl: 'views/common/notify.html'});
    };
    tools.deletenotify=function(type,msg,dur,_scope){
        notify.config({duration:dur});
        notify({ message: msg, classes: type, scope: _scope, templateUrl: 'views/common/deletenotify.html'});
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

    $scope.commingSoon=function(){
        tools.notify('alert-info','this function will come soon.');
    }

    $scope.webStatus=true;
    Offline.on('down', function () {
        console.log('down');
        $scope.webStatus=false;
        tools.notify('alert-danger','lose connection with router.');
        $scope.$apply();
    });
    Offline.on('up', function () {
        console.log('up');
        $scope.webStatus=true;
        tools.notify('alert-success','reconneted to the router.');
        $scope.$apply();
    });
};

function statusCtrl($scope){
};

function deviceOverviewCtrl() {
}; 

function deviceCtrl($scope, $modal, Device) {

    $scope.devices=Device.find(
        function(val){
            console.log(val);
        },
        function(res){
            tools.notify('alert-danger','load devices failed, please try again.');
    });


    $scope.mustOnline=true;
    this.deviceListFilter=function(v,i,a){ 
        // console.log(v,!$scope.mustOnline||v.isOnline);
        return !$scope.mustOnline||v.isOnline;
    };

    $scope.detectDevice = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/device/modal_add_device.html',
            size: 'sm',
            controller: 'deviceDetection',
            scope:$scope
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
    $scope.iconType={
        scanner: 'fa-bullseye',
        scale: 'fa-bars',
        mobile: 'fa-mobile-phone',
        web: 'fa-laptop'
    };

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
            },
            scope:$scope
        });

    };

    //$a=$scope;
};

function addDevice($scope, $modalInstance, deviceInfo, Scale, RfidInfo){
    $scope.formDetails={
                        name:deviceInfo.name,
                        MAC:deviceInfo.MAC,
                        type:deviceInfo.type,
                        reagent: ""
                    };
    $scope.reagents=[{'name':'oooops, nothing','id':-1}];
    $scope.selectedReagents=[];
    $scope.search = function(keyword){
        console.log(keyword);
        return RfidInfo.find({filter:{ "order":"id desc","where":{"name":{"like":"%"+keyword+"%"}}}},function(val){
            $scope.reagents=val;
            console.log();
        },
        function(res){
             tools.notify('alert-danger',res.data.error.message);
        }).$promise;
    };

    $a=$scope;
    
    $scope.submit = function() {
        if ($scope.detailForm.$valid) {
            Scale.create(
            {
                MAC:deviceInfo.MAC,
                name:$scope.formDetails.name,
                type:deviceInfo.type,
                // reagent: $scope.formDetails.reagent
            }
            ,function (val,resHeader){
                $modalInstance.close();
                tools.notify('alert-success','register device success');
                $scope.$parent.$parent.devices=Device.find(
                    function(val){
                        // debugger;
                        $scope.$apply();
                        console.log(val);
                    },
                    function(res){
                });
            }
            ,function (res){
                tools.notify('alert-danger',res.data.error.message);
            });
        }
    }
    var refreshChosen=function(){
        $('#myChosen').chosen('destroy').chosen({max_selected_options: 1});
        $('.search-field input').on('keyup',function(){
            var ele= $('.search-field input');
            var key = ele.val();
            $scope.search(key).then(function(){
                console.log('wetraewrrser');
                ele.val(key);
            });
        });
    };
    RfidInfo.find({filter:{ "order":"id desc","where":{"name":{"like":"%"+''+"%"}}}},function(val){
            $scope.reagents=val;
            console.log();
        },
        function(res){
             tools.notify('alert-danger',res.data.error.message);
        }).$promise.then(refreshChosen,refreshChosen);

};


function reagentCtrl($scope, $modal, $compile, $timeout, $sce, RfidInfo ,ngTableParams, DTColumnBuilder, DTOptionsBuilder, DTColumnDefBuilder) {
    var table=$('#reagents-table').dataTable();

    $scope.selectAll=false;
    $scope.reagentsAdd=[];

    // this.dtOptions = DTOptionsBuilder.newOptions()
    // .withPaginationType('full_numbers').withDisplayLength(10)
    // .withOption('rowCallback', function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
    //     $('td', nRow).unbind('click');
    //     $('td', nRow).bind('click', function() {
    //         // console.log($('input',nRow).attr('id'));
    //     });
    //     return nRow;
    // });
    // this.dtColumnDefs = [
    //     DTColumnDefBuilder.newColumnDef(0).notSortable(),
    //     DTColumnDefBuilder.newColumnDef(1),
    //     DTColumnDefBuilder.newColumnDef(2),
    //     DTColumnDefBuilder.newColumnDef(3).notSortable(),
    // ];

 

    $scope.toggleAll=function(){
        $scope.selectAll=!$scope.selectAll;
        for(var x=0;x<$scope.reagents.length;x++) {
            $scope.reagents[x].selected = $scope.selectAll;
        }
    };

    $scope.find=function(){
        var toFind=[];
        for(var x=0;x<$scope.reagents.length;x++){ 
            if($scope.reagents[x].selected) toFind.push($scope.reagents[x].id);
        }
        socket.emit('submit job',{serial: tools.randomStr(10), list: toFind});
        socket.on('search result',function(data){
            console.log(data);
        })
    }

    $scope.queryReagents=function(cb){
        $scope.reagentsAdd=[];
        RfidInfo.find({filter:{"order":"id desc"}},function(val){
            $scope.reagents=val;
            for(var x=0;x<$scope.reagents.length;x++) {
                $scope.reagents[x].selected = false;
                $scope.reagents[x].readonly = true;
            }
        },
        function(res){
             tools.notify('alert-danger',res.data.error.message);
        })
        .$promise.then(function(){
            $scope.reagentsBak=angular.copy($scope.reagents);
            if(cb)cb();
        });
    }

    $scope.queryReagents();

    $scope.talbeParams = new ngTableParams(
        {page:1, count:9},
        {
            getData: function($defer, params){
                $defer.resolve($scope.reagents);
            }
        }
    );
    $scope.searchFilter="";

    $scope.refresh=function(){
        $('#reagent-box').fadeOut(function(){
            $scope.queryReagents(function(){$('#reagent-box').fadeIn();});
        });
        console.log("Refresh");
    }


    $scope.makedata=function(){
        for(var i=0;i<20;i++){
            var info={
                name: String(Math.floor(Math.random()*99))+"-"+String(Math.floor(Math.random()*9999))+"-"+String(Math.floor(Math.random()*999)),
                rfid: tools.randomStr(2)+"-"+String(Math.floor(Math.random()*9999999))
            }
            RfidInfo.create(info,
            function(val, resHeader){//success
                //$scope.close(id);
                val.flag=true;
                val.readonly=true;
                $scope.reagents.unshift(val);
            },
            function(res){//error
                console.log(res);
                tools.notify('alert-danger', res.data.error.message);
            });
        }
    };

    
    $a=$scope;
    $scope.deletea=function(_id,cb){
            RfidInfo.deleteById({id: $scope.reagents[_id].id},
                function(){
                    $scope.reagentsBak.splice(_id,1);
                    console.log("delete");
                    if(cb){
                        console.log("confirm cb");
                        cb;
                    }
                },
                function(res,_id){
                    console.log("delete failed");
                    $scope.reagents.unshift($scope.reagentsBak[_id]);
                    $scope.reagentsBak.unshift($scope.reagents.splice(0,1));
                    tools.notify('alert-danger', res.data.error.message);
                }
            );
            $scope.reagents.splice(_id,1);
    };

    $scope.deleteReagent=function(id,cb){
        var _delete=function(_id,cb){
            RfidInfo.deleteById({id: ['1','2']},
                function(){
                    console.log("delete"+_id);
                    if(cb){
                        console.log("confirm cb");
                        cb;
                    }
                },
                function(res,_id){
                    console.log("delete failed");
                    tools.notify('alert-danger', res.data.error.message);
                }
            );
            // $scope.reagents.splice(_id,1);
        }
        if(id||id==0){
            //_delete(id,cb);
            _childScope=$scope.$new();
            _childScope.reagentDeleted=$scope.reagents[id];
            tools.deletenotify('alert-success',$scope.reagents[id].name+' Delete Success!',3000,_childScope);
            _childScope.undo=function(){
                $timeout.cancel(this.deleteSet);
                $scope.reagents.unshift(this.reagentDeleted);
                $scope.reagentsBak.unshift(this.reagentDeleted);
            }
            _childScope.job=function(){
                this.deleteSet=$timeout(_delete.bind(null,this.reagentDeleted.id,cb),3000);
            }
            _childScope.job();
            $scope.reagents.splice(id,1);
            $scope.reagentsBak.splice(id,1);
        }else{
            for(var x=$scope.reagents.length-1;x>=0;x--){
                if($scope.reagents[x].selected){
                    _delete($scope.reagents[x].id,cb);
                    $scope.reagents.splice(x,1);
                    $scope.reagentsBak.splice(x,1);
                }
            }
        }
    };



    $scope.deleteReagents=function(){
        $scope.deleteReagent();
    };

    $scope.saveReagent = function(id){
        data={
            "rfid": $scope.reagents[id].rfid,
            "name": $scope.reagents[id].name,
            "id": $scope.reagents[id].id,
            };
            if(!(data.name)||(!data.rfid)){
                tools.notify('alert-danger', "Name or Rfid can't be empty!");
                return;
            }
            RfidInfo.update({"where" : {"id":$scope.reagents[id].id}},data,function(val, resHeader){//success
            //$scope.queryReagents();            
            $scope.reagents[id].readonly = true;
        },function(res){//error
            tools.notify('alert-danger', res.data.error.message);
        });
    }

    $scope.cancel = function(id){
        $scope.reagents[id].name = $scope.reagentsBak[id].name;
        $scope.reagents[id].rfid = $scope.reagentsBak[id].rfid;
        $scope.reagents[id].readonly = true;
    }

    $scope.close = function(id){
        $scope.reagentsAdd.splice(id,1);
    }

    $scope.add=function(){
        var rid=tools.randomStr(10);
        var data={
            name : "",
            rfid : "",
            id : rid
        };
        $scope.reagentsAdd.unshift(data);
    }

    $scope.addReagent=function(id){
        if(!$scope.reagentsAdd[id].name||!$scope.reagentsAdd[id].rfid){
            tools.notify('alert-danger', "Name or Rfid can't be empty!");
            return;
        }

        var info={
             name: $scope.reagentsAdd[id].name,
             rfid: $scope.reagentsAdd[id].rfid
        };
        RfidInfo.create(info,
            function(val, resHeader){//success
                //$scope.close(id);
                $scope.reagentsBak.unshift(val);
                $scope.reagentsAdd.splice(id,1);
                val.flag=true;
                val.readonly=true;
                $scope.reagents.unshift(val);
             },
            function(res){//error
                console.log(res);
                tools.notify('alert-danger', res.data.error.message);
            });

    };

 



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

function reagentOverviewCtrl($scope, $http, $modal, RfidInfo, Weight, Scale){
    $scope.floor=window.Math.floor;
    $scope.reagentUsage=[
        {
            data:[[0,10000],[1,7563],[2,3650],[3,1324],[4,3641],[5,34577],[6,24356],[7,21237]],
            //data:oilprices,
            label:'reagentA'
        },
        {
            data:[[0,1000],[1,2563],[2,7650],[3,5324],[4,2641],[5,4577],[6,1356],[7,11237]],
            //data:exchangerates,
            label:'reagentB'
        },
        {
            data:[[0,1000],[1,22563],[2,12650],[3,9324],[4,5641],[5,2457],[6,4356],[7,1237]],
            //data:oilprices,
            label:'reagentA'
        },
        {
            data:[[0,20300],[1,15634],[2,12650],[3,9324],[4,5641],[5,3577],[6,2356],[7,1237]],
            //data:exchangerates,
            label:'reagentB'
        },
    ];
    $scope.from=new Date();
    $scope.to=new Date();
    $scope.option = {
        series: {
            lines: {
                show: false,
                fill: true
            },
            splines: {
                show: true,
                tension: 0.4,
                lineWidth: 1,
                fill: 0.4
            },
            points: {
                radius: 0.2,
                show: true
            },
            shadowSize: 2,
            grow: {stepMode:"linear",stepDirection:"up",steps:80}
        },
        grow: {stepMode:"linear",stepDirection:"up",steps:80},
        grid: {
            hoverable: true,
            clickable: true,
            tickColor: "#d5d5d5",
            borderWidth: 1,
            color: '#d5d5d5'
        },
        colors: ["#1ab394", "#464f88"],
        xaxis: {
        },
        yaxis: {
            ticks: 4
        },
        tooltip: false
    };
    this.sliderOptions = {
        min: new Date("Aug 09 2015 19:14:24 GMT+0800 (CST)").getTime(),
        max: new Date().getTime(),
        type: 'double',
        force_edges: true,
        values_separator: '→',
        grid: true,
        prettify: function(num){
            return new Date(num).format("yyyy-MM-dd");
        },
        onFinish: function(data){
            $scope.from=new Date(data.from);
            $scope.to=new Date(data.to);
            // $scope.reagentUsage=weight.find({filter:
            //     {where:{
            //             gmt_create:{gt:newDate(data.from),lt:new Date(data.to)},
            //             id:{inq:$scope.selectedReagents.map(function(e){return e.id})}
            //         }
            //     }
            //     },
            //     function(){},
            //     function(err){
            //         tools.notify('alert-danger',err.data.error.message);
            //     });
        }
    };

    $scope.reagents=[{name:'awetaw'},{name:'23wter'},{name:'awetaw'},{name:'23wter'},{name:'awetaw'},{name:'23wter'}];
    $scope.selectedReagents=[];
    // $scope.$watch('selectedReagents',function(oval,nval,scope){
    //     $scope.reagentUsage=Weight.find({filter:
    //             {where:{
    //                     gmt_create:{gt: scope.from,lt: scope.to},
    //                     id:{inq:scope.selectedReagents.map(function(e){return e.id})}
    //                 }
    //             }
    //             },
    //             function(){},
    //             function(err){
    //                 tools.notify('alert-danger',err.data.error.message);
    //             });
    // });
    $scope.color=['label-success', 'label-info', 'label-primary', 'label-default', 'label-primary'];
    $scope.latestSearchedReagent=RfidInfo.find({filter:{order:'gmt_visited DESC',limit:5}},
        function(){
        },
        function(err){
            tools.notify('alert-danger',err.data.error.message);
        }
        );
    $scope.latestSearchedReagent.$promise.then(function(){
        for(var x=0;x<$scope.latestSearchedReagent.length;x++){
            $scope.latestSearchedReagent[x].gmt_visited=new Date($scope.latestSearchedReagent[x].gmt_visited);
            console.log($scope.latestSearchedReagent[x]);
        }
    });

    console.log($scope.latestSearchedReagent);

    // $http.post('api/scale/status').success(function(data){
    //     $scope.reagentsScale = $data;
    // });
    $scope.scaleDetail = function (reagentName) {
        var modalInstance = $modal.open({
            templateUrl: 'views/reagent/reagent_detail.html',
            controller: 'scaleDetail',
            resolve :{
                'reagentName':function(){
                    return reagentName;
                }
            },
        });

    };

    $scope.reagentScales = Scale.find();
    console.log($scope.reagentScales);
    $scope.reagentScales=[
            {
                id:'11',
                reagent_name:'11',
                weight:'20',
                full_weight:'100'
            },
            {
                id:'22',
                reagent_name:'11',
                weight:'20',
                full_weight:'30'
            },
            {
                id:'33',
                reagent_name:'11',
                weight:'20',
                full_weight:'20'
            }
        ];
};

function scaleDetail($scope, reagentName, $modalInstance){
    console.log($modalInstance);
    $scope.reagentName = reagentName;
    $scope.close = $modalInstance.close;
};

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

    .controller('reagentCtrl', reagentCtrl)
    .controller('reagentOverviewCtrl',reagentOverviewCtrl)
    .controller('scaleDetail',scaleDetail);




