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
        })
        .state('content.index', {
            url: "/index",
            templateUrl: "views/main.html",
            data: { pageTitle: 'welcome' }
        })
        //////////////////devices manage
        .state('content.device-overview', {
            url: "/device",
            templateUrl: "views/devices_list.html",
            data: { pageTitle: 'devices overview' }
        })
        .state('content.device-online', {
            url: "/is-online",
            templateUrl: "views/devices_list.html",
            data: { pageTitle: 'online devices' }
        })
        /////////////////reagent manage

        .state('content.reagent-overview', {
            url: "/reagent",
            templateUrl: "views/reagent_overview.html",
            data: { pageTitle: 'reagents overview' }
        })
        .state('content.reagent-add', {
            url: "/add",
            templateUrl: "views/devices_list.html",
            data: { pageTitle: 'add reagents' }
        })
}
angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });