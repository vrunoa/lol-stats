import config from '../config.json'
import request from 'request'

export default class Api {

  constructor(api_key) {
    this.api_key = `?api_key=${api_key}`
    this.base_url = config["api_base_url"]
    this.api_version = config["api_version"]
  }

  url(region, version, method) {
    return [this.base_url, region, version, method, api_key].join("/")
  }

  getChampions(region) {
    let endpoint = url([region, this.api_version, "champion"])
    console.log(endpoint)
    return new Promise( (res, rej) => {
      
    })
  }
}
