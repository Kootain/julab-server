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

}
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
        //console.log(v,$scope.mustOnline,$scope.mustOnline||v.isOnline);
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
};

function addDevice($scope, $modalInstance, deviceInfo, Device){
    console.log(deviceInfo);
    $scope.formDetails={name:tools.randomStr(5)};
    $scope.submit = function() {
        console.log('submit');
        if ($scope.detailForm.$valid) {
            Device.create(
            {
                MAC:deviceInfo.MAC,
                name:$scope.detailForm.name,
                type:deviceInfo.type
            }
            ,function (val,resHeader){
                $modalInstance.close();
                tools.notify('alert-success','register device success');
                $scope.$parent.$parent.devices=Device.find(
                    function(val){
                        debugger;
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
            // console.log($('input',nRow).attr('id'));
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
        console.log("check");
        for(var x in selected) {
            //if($('#'+x).length>0)
                selected[x]=selectAll;
            //else selected[x]=false;
        }
        console.log(selected);
    };


    $scope.toggleOne=function(id){
        console.log("check");
        $scope.selected[id]=!$scope.selected[id];
        console.log($scope.selected);
    }

    $scope.find=function(selected){
        console.log(selected);
        var toFind=[];
        for(var i in selected) 
            if(selected[i]) toFind.push(i);
        socket.emit('submit job',{serial: tools.randomStr(10), list: toFind});
        socket.on('search result',function(data){
            console.log(data);
        })
    }
    $scope.queryReagents=function(){
        $scope.reagents=RfidInfo.find(function(val){
            for(var x=0;x<$scope.reagents.length;x++) 
                 $scope.selected[$scope.reagents[x].id]=false;
        },
        function(res){
             tools.notify('alert-danger',res.data.error.message);
        });
    }
    $scope.queryReagents();
    // [{cas:'120-3112-44',rfid:'R0012313AB1234',ops:''},
    // {cas:'120-3112-44',rfid:'R0012313AB1234',ops:''},
    // {cas:'12234-3112-44',rfid:'R0xxx12313AB1234',ops:''},
    // {cas:'130-3112-44',rfid:'R0012313AB1234',ops:''},
    // {cas:'120-3112-44',rfid:'R0012313AB1234',ops:''}]
    

    $scope.refresh=function(){
        $('#reagent-box').fadeOut(function(){
            var display=function(){
                $('#reagent-box').fadeIn();
                $scope.selected={};
                for(var x=0;x<$scope.reagents.length;x++) $scope.selected[$scope.reagents[x]]=false;
                console.log($scope.selected);
            }
            $scope.reagents= RfidInfo.find(
                function(val){
                    console.log('success');
                    console.log(val);
                    display();
                },
                function(res){
                    console.log('failed');
                    console.log(res);
                    tools.notify('alert-danger','refresh reagent list error, please check your connection');
                    display();
                });

        
        });
        
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
                $scope.reagents.push(val);
                console.log(val);
                console.log(resHeader);
            },
            function(res){//error
                console.log(res);
                tools.notify('alert-danger', res.data.error.message);
            });
        }
    };

    $scope.addReagent=function(id){

         if(!$('#cas-'+id).val()||!$('#cas-'+id).val()){
            return;
        }

        var info={
            name: $('#cas-'+id).val(),
            rfid:$('#rfid-'+id).val()
        };
        RfidInfo.create(info,
            function(val, resHeader){//success
                //$scope.close(id);
                val.flag=true;
                $scope.reagents.push(val);
                console.log(val);
                console.log(resHeader);
            },
            function(res){//error
                console.log(res);
                tools.notify('alert-danger', res.data.error.message);
            });
    };

    $scope.deleteReagent=function(selected){
        console.log(selected);
        var ids=[];
        for( var i in selected) if(selected[i]) ids.push(i);
        var _delete=function(_id){
            RfidInfo.deleteById({id: _id},
                function(){
                        //delete selected[_id];
                        //$scope.close(_id);
                },
                function(res){
                    console.log(res);
                    tools.notify('alert-danger', res.data.error.message);
                }
            );        
        }
        for(var x=0;x<ids.length;x++){
            _delete(ids[x]);
            $scope.queryReagents();
        }
        
    };

    $scope.delReagent=function(id){
        selected={};
        selected[id]=true;
        $scope.deleteReagent(selected);
    };

    $scope.editReagent=function(id){
        // console.log(id);
        var oTable=$('#reagents-table').dataTable();
        cas='<input id="cas-{0}" type="text" class="form-control" value="{1}" style="height:27px;padding-left: 0px; width:95%">'.format(id,$("#cas-"+id).text());
        rfid='<input id="rfid-{0}" type="text" class="form-control" value="{1}" style="height:27px;padding-left: 0px; width:95%"">'.format(id,$("#rfid-"+id).text());
        ops='<ops id="{0}"><ops>'.format(id);
        oTable.fnUpdate(cas,oTable.fnGetPosition($('#cas-'+id)[0])[0],1);
        oTable.fnUpdate(rfid,oTable.fnGetPosition($('#cas-'+id)[0])[0],2);
        oTable.fnUpdate(ops,oTable.fnGetPosition($('#cas-'+id)[0])[0],3);
        console.log("ops");
        $('#cas-{0}'.format(id)).replaceWith($compile($('#cas-{0}'.format(id)))($scope));
        $('#rfid-{0}'.format(id)).replaceWith($compile($('#rfid-{0}'.format(id)))($scope));
        // console.log(cas,rfid);
        // console.log(a.reagent.rfid);
        comp=$compile(
             '<a ng-click="saveReagent(\'{0}\')" class="btn btn-xs btn-outline btn-primary"><i class="fa fa-check"></i></a>&nbsp;&nbsp;'.format(id)+
             '<a ng-click="cancel(\'{0}\')" class="btn btn-xs btn-outline btn-danger"><i class="fa fa-remove"></i></a>'.format(id)
             )($scope);
        $('ops').html(comp);
    }

    $scope.saveReagent = function(id){
        data={
            "rfid": $("input#rfid-"+id).val(),
            "name": $("input#cas-"+id).val(),
            "id": id
            };
        RfidInfo.update({"where" : {"id":id}},data,function(val, resHeader){//success
            $scope.queryReagents();
        },function(res){//error
            tools.notify('alert-danger', res.data.error.message);
        });
    }

    $scope.cancel = function(){
        // $scope.reagents=RfidInfo.find(function(val){
        //     for(var x=0;x<$scope.reagents.length;x++) 
        //         $scope.selected[$scope.reagents[x].id]=false;
        // },function(res){
        //     tools.notify('alert-danger',res.data.error.message);
        // });
        $scope.queryReagents();
    }

    $scope.close=function(id){
        $('#reagents-table').dataTable().fnDeleteRow(
            $('#reagents-table').dataTable().fnGetPosition($('#'+id).parents('td')[0])[0]);
    }

    $scope.add=function(){
        var id=tools.randomStr(10);
        $('#reagents-table').dataTable().fnAddData(
            ['',
             '<input id="cas-{0}" type="text" class="form-control" style="height:27px;padding-left: 0px;width:95%">'.format(id),
             '<input id="rfid-{0}" type="text" class="form-control" style="height:27px;padding-left: 0px;width:95%">'.format(id),
             '<ops id="{0}"><ops>'.format(id)
            ]);
        comp=$compile(
             '<a ng-click="addReagent(\'{0}\')" class="btn btn-xs btn-outline btn-primary"><i class="fa fa-check"></i></a>&nbsp;&nbsp;'.format(id)+
             '<a ng-click="close(\'{0}\')" class="btn btn-xs btn-outline btn-danger"><i class="fa fa-remove"></i></a>'.format(id)
             )($scope);
        $('#cas-{0}'.format(id)).replaceWith($compile($('#cas-{0}'.format(id)))($scope));
        $('#rfid-{0}'.format(id)).replaceWith($compile($('#rfid-{0}'.format(id)))($scope));
        $('ops#'+id).html(comp);
        socket.emit('submit job', { serial: id, type:'add reagent' });
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
        a=$scope;

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

}

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




