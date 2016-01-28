angular.module('LOLStats', [])

.factory('Api', ["$http", function($http){
  return {
    post: function(url, data) {
      return new Promise(function(res, rej){
        $http({ method: 'POST', url: url,
          headers: { 'Content-Type':'application/json' },
          data: data
        }).then(function(response){
          res(JSON.parse(response.data))
        }, function(response){
          rej(response.err)
        })
      })
    }
  }
}])

.factory('Summoner', ['Api', function(Api){
  return {
    byName: function(r, q) {
      return Api.post('/summoner-by-name', {region:r, q:q})
    }
  }
}])

.factory('Regions', ["Api", function(Api){
  return {
    all: function() {
      return {
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
    },
    getStatus: function(r) {
      return Api.post('/status', {region:r})
    }
  }
}])

.controller('StatsController', ["$scope", "Regions", "Summoner", function($scope, Regions, Summoner) {
  $scope.regions = Regions.all();
  $scope.region = {
    region: "NA"
  }
  $scope.q 
  $scope.searchTimeout
  $scope.user = false

  $scope.searchUser = function() {
    clearTimeout($scope.searchTimeout)
    $scope.searchTimeout = setTimeout(function(){
      Summoner.byName($scope.region.region, $scope.q)
      .then(function(data){
        $scope.$apply(function(){
          if(!data) $scope.user = false
          $scope.user = data[$scope.q]
        })
      })
    }, 1000)
  }

  $scope.changeRegion = function() {
    var region = $scope.region.region
    $scope.region.status = "offline"
    Regions.getStatus(region)
    .then(function(data){
      $scope.$apply(function(){
        $scope.region.status = data.services[0].status
      })
    })
  }

  $scope.regionStatus = function() {
    var region = $scope.region
    return region.status == "online" ? "status-online" : "status-offline"
  }

  $scope.changeRegion($scope.region.region)
}])
