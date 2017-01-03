var gardenApp = angular.module('gardenApp', ['ui.router']);

gardenApp.config(function($stateProvider, $urlRouterProvider){
   $urlRouterProvider.otherwise('/home');

   $stateProvider
       .state('homeView', {
           url: '/home',
           templateUrl: './html/homeView.html'
       })
       .state('serviceView', {
           url: '/service',
           templateUrl: './html/serviceView.html',
           controller: 'headerCtrl'
       })
       .state('aboutView', {
           url: '/about',
           templateUrl: './html/aboutView.html'
       })
       .state('loginReturnCustView', {
           url: '/login/returningCust',
           templateUrl: './html/loginReturnCustView.html',
           controller: 'loginCtrl'
       })
       .state('loginNewCustView', {
           url: '/login/newCust',
           templateUrl: './html/loginNewCustView.html',
           controller: 'loginCtrl'
       })
       .state('profileEdit', {
           url: '/profileEdit',
           templateUrl: './html/profileEdit.html',
           controller: 'loginCtrl'
       })
       .state('listCustView', {
           url: '/listCustView',
           templateUrl: './html/listCustView.html',
           controller: 'listCustCtrl'
       })
       .state('routeView', {
           url: '/routeView',
           templateUrl: './html/routeView.html',
           controller: 'listCustCtrl'
       })

});