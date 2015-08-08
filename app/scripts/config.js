/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/main/index");

    $stateProvider
        //////////////////index
        .state('content', {
            abstract: true,
            url: "/main",
            templateUrl: "views/common/content.html",
            ncyBreadcrumb:{
                label:'index'
            }
        })
        .state('content.index', {
            url: "/index",
            templateUrl: "views/main.html",
            controller: 'MainCtrl',
            data: { pageTitle: 'Dashboard' },
            ncyBreadcrumb:{
                label:'Dashboard'
            }
        })
        //////////////////devices manage
        .state('content.devices', {
            url: "/devices",
            template: '<ui-view/>',
            ncyBreadcrumb:{
                label:'devices'
            }
        })
        .state('content.devices.overview', {
            url: "/overview",
            templateUrl: "views/device/overview.html",
            controller: 'deviceOverviewCtrl as deviceOverview',
            data: { pageTitle: 'devices overview' },
            ncyBreadcrumb:{
                label:'overview',
            },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'angles',
                            files: ['scripts/plugins/angles.js', '../bower_components/Chart.js/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['../bower_components/peity/jquery.peity.min.js', 
                                    '../bower_components/angular-peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            name: 'angular-flot',
                            files: [ '../bower_components/flot/jquery.flot.js', 
                                     '../bower_components/flot/jquery.flot.time.js',
                                     '../bower_components/flot.tooltip.pib/js/jquery.flot.tooltip.min.js', 
                                     '../bower_components/jquery.flot.spline/index.js', 
                                     '../bower_components/flot/jquery.flot.resize.js', 
                                     '../bower_components/flot/jquery.flot.pie.js', 
                                     '../bower_components/flot.curvedlines/curvedLines.js', 
                                     '../bower_components/angular-flot/angular-flot.js', ]
                        }
                    ]);
                }
            }
        })
        .state('content.devices.list', {
            url: "/list",
            templateUrl: "views/device/devices_list.html",
            controller: 'deviceCtrl as device',
            data: { pageTitle: 'online devices' },
            ncyBreadcrumb:{
                label: 'device list',
            }
        })
        /////////////////reagent manage

        .state('content.reagent-overview', {
            url: "/reagent",
            templateUrl: "views/reagent/overview.html",
            data: { pageTitle: 'reagents overview' },
            ncyBreadcrumb:{
                label:'reagents',
                parent:'content'
            }
        })
        .state('content.reagent-add', {
            url: "/add",
            templateUrl: "views/device/devices_list.html",
            data: { pageTitle: 'add reagents' },
            ncyBreadcrumb:{
                label: 'reagents list',
                parent: 'content.reagent-overview'
            }
        })
}
angular
    .module('julab')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });