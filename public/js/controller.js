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

.controller('StatsController', ["$scope", "Regions", function($scope, Regions) {
  $scope.regions = Regions.all();
  $scope.region = {
    region: "NA"
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
