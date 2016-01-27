import request from 'request'

const api_endpoint = ".api.pvp.net/api/lol"
const default_region = "NA"
const regions = ["br", "eune", "euw", "lan", "las", "na", "oce", "pbe", "ru", "tr"]

export default class Api {

  constructor(api_key) {
    this.api_key = `?api_key=${api_key}`
  }

  getRegions() {
    return regions
  }

  getChampions(region) {
    let endpoint = 
      `https://${region}${api_endpoint}/${region}/v1.2/champion/${this.api_key}`
    console.log(endpoint)
    return new Promise( (res, rej) => {
      request.get(endpoint, (err, body, response) => {
        if(err) return rej(err)
        res(response)
      })
    })
  }

  getChampionById(region, id) {
    let endpoint =  
      `https://${region}${api_endpoint}/${region}/${this.api_version}/champion/${id}/${this.api_key}`
    return new Promise( (res, rej) => {
      request.get(endpoint, (err, body, response) => {
        if(err) return rej(err)
        res(response)
      })
    })
  }
  
  getPlatforms() {
    return {
      "na" : "NA1", "ru" : "RU", "tr" : "TR1", "kr" : "KR",
      "br" : "BR1", "lan": "LA1", "las": "LA2", "eune": "EUN1",
      "oce" : "OC1", "euw" : "EUW1"
    }
  }

  getChampionMasteryBySummonerNChampionId(platform, sid, cid) {
    let platforms = this.getPlatforms()
    let endpoint =  
      `https://${platform}${api_endpoint}/championmastery/location/${platforms[platform]}/player/${sid}/champion/${cid}${this.api_key}`
    return new Promise( (res, rej) => {
      request.get(endpoint, (err, body, response) => {
        if(err) return rej(err)
        res(response)
      })
    })
  }
  
  getChampionMasteryBySummonerChampions(platform, sid) {
    let platforms = this.getPlatforms()
    let endpoint =  
      `https://${platform}${api_endpoint}/championmastery/location/${platforms[platform]}/player/${sid}/champions/${this.api_key}`
    return new Promise( (res, rej) => {
      request.get(endpoint, (err, body, response) => {
        if(err) return rej(err)
        res(response)
      })
    })
  }

  getChampionMasteryBySummonerScore(platform, sid) {
    let platforms = this.getPlatforms()
    let endpoint =  
      `https://${platform}${api_endpoint}/championmastery/location/${platforms[platform]}/player/${sid}/score${this.api_key}`
    return new Promise( (res, rej) => {
      request.get(endpoint, (err, body, response) => {
        if(err) return rej(err)
        res(response)
      })
    })
  }

  getChampionMasteryBySummonerTopChampion(platform, sid, count) {
    count = count || 10
    let platforms = this.getPlatforms()
    let endpoint =  
      `https://${platform}${api_endpoint}/championmastery/location/${platforms[platform]}/player/${sid}/topchampions${this.api_key}&count=${count}`
    return new Promise( (res, rej) => {
      request.get(endpoint, (err, body, response) => {
        if(err) return rej(err)
        res(response)
      })
    })
  }

  getCurrentGame(platform, sid) {
    let platforms = this.getPlatforms()
    let endpoint =  
      `https://${platform}${api_endpoint}/observer-mode/rest/consumer/getSpectatorGameInfo/${platforms[platform]}/${sid}${this.api_key}`
    return new Promise( (res, rej) => {
      request.get(endpoint, (err, body, response) => {
        if(err) return rej(err)
        res(response)
      })
    })
  }

  getFeaturedGames(region) {
    let endpoint =  
      `https://${region}${api_endpoint}/observer-mode/rest/featured${this.api_key}`
    return new Promise( (res, rej) => {
      request.get(endpoint, (err, body, response) => {
        if(err) return rej(err)
        res(response)
      })
    })
  }

}
