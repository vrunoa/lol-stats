angular.module('LOLStats', [])

.factory('Champions', ["$http", function($http){
  return {
    getByRegion: function(r) {
      return new Promise(function(res, rej){
        $http({
          method: 'POST',
          url: '/champions',
          data: {region:r}
        })
        .then(function(response){
          res(response)
        }, 
        function(response){
          rej(response)
        })        
      })
    }
  }
}])

.controller('StatsController', ["$scope", "Champions", function($scope, Champions) {
  $scope.regions = {
    "BR": "Brasil", 
    "EUNE" : "Europe Nordic & East", 
    "EUW" :"Europe West", 
    "LAN":"Latin North America", 
    "LAS":"Latin South America", 
    "NA":"North America", 
    "OCE":"OCEANIA", 
    "PBE": "Korea",
    "RU":"Russia", 
    "TR":"Turkey"
  }
  $scope.region = document.location.pathname.replace("/","")
  $scope.changeRegion = function() {
    Champions.getByRegion($scope.region)
    .then(function(res){
      console.log(res)
    })
  }
}])
