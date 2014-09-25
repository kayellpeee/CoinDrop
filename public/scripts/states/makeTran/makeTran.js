;(function(){
  'use strict';
  angular.module('coindropApp')
  .config(['$stateProvider', configuration]);

  function configuration($stateProvider) {
    $stateProvider
      .state('makeTran', {
        url: '/makeTran',
        templateUrl: 'scripts/states/makeTran/makeTran.html',
        controller: 'MakeTranController'
      });
    }
}).call(this);
