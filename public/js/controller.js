angular.module('LOLStats', [])

.filter('icon_url', function() {
  return function icon_url(iid) {
    var url =
      ["http://sk2.op.gg/images/profile_icons/profileIcon",iid,".jpg"].join("")
    return url
  }
})

.filter('dash', function() {
  return function dash(val) {
    return !val ? "-" : val
  }
})

.filter("pretty_date", function(){
  return function pretty_date(timestamp){
    var date = new Date(timestamp)
    var pretty_date = []
    pretty_date.push([
      date.getDate(), date.getMonth(), date.getFullYear()
    ].join("/"))
    pretty_date.push([
      date.getMinutes() < 0 ? "0"+date.getMinutes() : date.getMinutes(),
      date.getHours() < 0 ? "0"+date.getHours() : date.getHours()
    ].join(":"))
    return pretty_date.join(" ")
  }
})

.factory('Api', ["$http", function($http){
  return {
    post: function(url, data) {
      return new Promise(function(res, rej){
        $http({ method: 'POST', url: url,
          headers: { 'Content-Type':'application/json' },
          data: data
        }).then(function(response){
          try { 
            var data = response.data
            res(data)
          }catch(e){
            rej({error:"Error getting service information..."})
          }
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

.factory("Summary", ['Api', function(Api) {
  return {
    get: function(r, sid, s) {
      return Api.post('/summoner-sumary', 
        {region:r, summoner:sid, season: s}
      )
    }
  }
}])

.factory("Ranked", ["Api", function(Api) {
  return {
    get: function(r, sid, s) {
      return Api.post('/summoner-ranked', 
        {region:r, summoner:sid, season: s}
      )
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

.factory("Utils", [function(){
  return {
    clone: function(object) {
      return JSON.parse(JSON.stringify(object))
    },
    last: function(arr) {
      if(!arr) return
      if(!arr.length) return
      return arr[arr.length-1]
    }
  }
}])

.controller('StatsController', ["$scope", "Regions", "Summoner", "Summary", "Utils", "Ranked", function($scope, Regions, Summoner, Summary, Utils, Ranked) {
  $scope.regions = Regions.all();
  $scope.region = {
    region: "NA"
  }
  $scope.loading = false
  $scope.error = false
  $scope.q 
  $scope.searchTimeout
  $scope.user = false
  $scope.seasons =["SEASON3", "SEASON2014", "SEASON2015", "SEASON2016"]
  $scope.summary = {
    season: null,
    playerStatSummaries: []
  }
  $scope.ranked = Utils.clone($scope.summary)

  $scope.tab = "summary"

  $scope.isActiveTab = function(tab) {
    return $scope.tab == tab
  }

  $scope.changeTab = function(tab) {
    $scope.tab = tab == "summary" ? "summary" : "ranked"
  }

  $scope.searchUser = function() {
    clearTimeout($scope.searchTimeout)
    $scope.searchTimeout = setTimeout(function(){
      $scope.loading = true
      $scope.error = false
      Summoner.byName($scope.region.region, $scope.q)
      .then(function(data){
        $scope.$apply(function(){
          $scope.loading = false
          if(!data) $scope.user = false
          $scope.user = data[$scope.q]
        })
      }, function(err) {
        $scope.$apply(function(){
          $scope.loading = false
          $scope.error = "user not found"
        })
      })
    }, 1000)
  }

  $scope.changeRegion = function() {
    var region = $scope.region.region
    $scope.region.status = "offline"
    $scope.loading = true
    Regions.getStatus(region)
    .then(function(data){
      $scope.$apply(function(){
        $scope.region.status = data.services[0].status
        $scope.loading = false
      })
    })
  }

  $scope.changeSeason = function() {
    $scope.tab == "summary" ? $scope.getSummary() : $scope.getRanked()
  }

  $scope.getSummary = function() {
    var region = $scope.region.region
    $scope.summary.playerStateSummaries = []
    $scope.loading = true
    $scope.error = false
    Summary.get(region, $scope.user.id, $scope.summary.season)
    .then(function(data){
      $scope.$apply(function(){
        $scope.summary.playerStatSummaries = data.playerStatSummaries
        $scope.loading = false
      })
    }, function(err){
      $scope.$apply(function(){
        $scope.loading = false
        $scope.error = "user summary not available"
      })
    })
  }

  $scope.getRanked = function() {
    var region = $scope.region.region
    $scope.ranked.playerStateSummaries = []
    $scope.loading = true
    Ranked.get(region, $scope.user.id, $scope.ranked.season)
    .then(function(data){
      $scope.$apply(function(){
        $scope.ranked.playerStatSummaries = data.playerStatSummaries
        $scope.loading = false
      })
    }, function(err){
      $scope.$apply(function(){
        $scope.loading = false
        $scope.error = "user ranked not available"
      })
    })
  }

  $scope.regionStatus = function() {
    var region = $scope.region
    return region.status == "online" ? "status-online" : "status-offline"
  }

  $scope.changeRegion($scope.region.region)
}])
