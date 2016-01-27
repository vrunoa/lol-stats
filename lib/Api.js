import config from '../config.json'
import request from 'request'

export default class Api {

  constructor(api_key) {
    this.api_key = `?api_key=${api_key}`
    this.base_url = config["api_base_url"]
    this.api_version = config["api_version"]
  }

  getChampions(region) {
    let endpoint = 
      `https://${region}${this.base_url}/${region}/${this.api_version}/champion/${this.api_key}`
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
      `https://${region}${this.base_url}/${region}/${this.api_version}/champion/${id}/${this.api_key}`
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
      `https://${platform}${this.base_url}/championmastery/location/${platforms[platform]}/player/${sid}/champion/${cid}${this.api_key}`
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
      `https://${platform}${this.base_url}/championmastery/location/${platforms[platform]}/player/${sid}/champions/${this.api_key}`
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
      `https://${platform}${this.base_url}/championmastery/location/${platforms[platform]}/player/${sid}/score${this.api_key}`
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
      `https://${platform}${this.base_url}/championmastery/location/${platforms[platform]}/player/${sid}/topchampions${this.api_key}&count=${count}`
    return new Promise( (res, rej) => {
      request.get(endpoint, (err, body, response) => {
        if(err) return rej(err)
        res(response)
      })
    })
  }

}
