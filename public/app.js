var app = angular.module("meet-in-the-middle", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/'); 
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: './views/home.html', 
    controller: 'appController'
  })

});