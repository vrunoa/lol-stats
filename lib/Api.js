import request from 'request'

const api_endpoint = ".api.pvp.net/api/lol"
const default_region = "na"
const regions = ["br", "eune", "euw", "lan", "las", "na", "oce", "pbe", "ru", "tr"]
const rankedTypes = ["RANKED_SOLO_5x5", "RANKED_TEAM_3x3", "RANKED_TEAM_5x5"]
const seasons = ["SEASON_3", "SEASON_2014", "SEASON_2015", "SEASON_2016"]

export default class Api {

  constructor(api_key) {
    this.api_key = `?api_key=${api_key}`
    this.default_region = default_region
    this.default_season = seasons.splice(-1)
  }

  getRegions() {
    return regions
  }

  getRankedTypes() {
    return rankedTypes
  }

  setDefaultRegion(region) {
    this.default_region = regions.indexOf(region) == -1 ? 
      default_region : region
  }

  getDefaultRegion() {
    return this.default_region
  }

  getRegion(region) {
    region = region || this.default_region
    region = region.trim().toLowerCase()
    return regions.indexOf(region) == -1 ?
      this.default_region : region
  }

  makeRequest(endpoint) {
    return new Promise( (res, rej) => {
      request.get(endpoint, (err, body, response) => {
        console.log(response)
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

  getChampions(region) {
    let endpoint = 
      `https://${region}${api_endpoint}/${region}/v1.2/champion/${this.api_key}`
    return this.makeRequest(endpoint)
  }

  getChampionById(region, id) {
    let endpoint =  
      `https://${region}${api_endpoint}/${region}/v1.2/champion/${id}/${this.api_key}`
    return this.makeRequest(endpoint)
  }
  
  
  getChampionMasteryBySummonerNChampionId(platform, sid, cid) {
    let platforms = this.getPlatforms()
    let endpoint =  
      `https://${platform}${api_endpoint}/championmastery/location/${platforms[platform]}/player/${sid}/champion/${cid}${this.api_key}`
    return this.makeRequest(endpoint)
  }
  
  getChampionMasteryBySummonerChampions(platform, sid) {
    let platforms = this.getPlatforms()
    let endpoint =  
      `https://${platform}${api_endpoint}/championmastery/location/${platforms[platform]}/player/${sid}/champions/${this.api_key}`
    return this.makeRequest(endpoint)
  }

  getChampionMasteryBySummonerScore(platform, sid) {
    let platforms = this.getPlatforms()
    let endpoint =  
      `https://${platform}${api_endpoint}/championmastery/location/${platforms[platform]}/player/${sid}/score${this.api_key}`
    return this.makeRequest(endpoint)
  }

  getChampionMasteryBySummonerTopChampion(platform, sid, count) {
    count = count || 10
    let platforms = this.getPlatforms()
    let endpoint =  
      `https://${platform}${api_endpoint}/championmastery/location/${platforms[platform]}/player/${sid}/topchampions${this.api_key}&count=${count}`
    return this.makeRequest(endpoint)
  }

  getCurrentGame(platform, sid) {
    let platforms = this.getPlatforms()
    let endpoint =  
      `https://${platform}${api_endpoint}/observer-mode/rest/consumer/getSpectatorGameInfo/${platforms[platform]}/${sid}${this.api_key}`
    return this.makeRequest(endpoint)
  }

  getFeaturedGames(region) {
    let endpoint =  
      `https://${region}${api_endpoint}/observer-mode/rest/featured${this.api_key}`
    return this.makeRequest(endpoint)
  }

  getGames(region, sid) {
    let endpoint =  
      `https://${region}${api_endpoint}/${region}/v1.3/game/by-summoner/${sid}/recent${this.api_key}`
    return this.makeRequest(endpoint)
  }

  getLeagueBySummoner(region, sid) {
    let endpoint =  
      `https://${region}${api_endpoint}/${region}/v2.5/league/by-summoner/${sid}${this.api_key}`
    return this.makeRequest(endpoint)
  }

  getLeagueBySummonerEntry(region, sid) {
    let endpoint =  
      `https://${region}${api_endpoint}/${region}/v2.5/league/by-summoner/${sid}/entry${this.api_key}`
    return this.makeRequest(endpoint)
  }

  getLeagueByTeam(region, tid) {
    let endpoint =  
      `https://${region}${api_endpoint}/${region}/v2.5/league/by-team/${sid}${this.api_key}`
    return this.makeRequest(endpoint)
  }

  getLeagueByTeamEntry(region, sid) {
    let endpoint =  
      `https://${region}${api_endpoint}/${region}/v2.5/league/by-team/${sid}/entry${this.api_key}`
    return this.makeRequest(endpoint)
  }

  getLeagueChallenger(region, type) {
    let endpoint =  
      `https://${region}${api_endpoint}/${region}/v2.5/league/challenger${this.api_key}&type=${type}`
    return this.makeRequest(endpoint)
  }

  getLeagueMaster(region, type) {
    let endpoint =  
      `https://${region}${api_endpoint}/${region}/v2.5/league/master${this.api_key}&type=${type}`
    return this.makeRequest(endpoint)
  }

  getStaticDataRegionChampion(region) {
    let endpoint =  
      `https://global${api_endpoint}/static-data/${region}/v1.2/champion${this.api_key}&type=${type}`
 
    return this.makeRequest(endpoint)
  }

  getStaticDataRegionChampionById(region, cid) {
    let endpoint =  
      `https://global${api_endpoint}/static-data/${region}/v1.2/champion/${cid}${this.api_key}&type=${type}`
 
    return this.makeRequest(endpoint)
  }

  getStaticDataRegionItem(region) {
    let endpoint =  
      `https://global${api_endpoint}/static-data/${region}/v1.2/item${this.api_key}&type=${type}`
 
    return this.makeRequest(endpoint)
  }

  getStaticDataRegionItemById(region, cid) {
    let endpoint =  
      `https://global${api_endpoint}/static-data/${region}/v1.2/item/${cid}${this.api_key}&type=${type}`
 
    return this.makeRequest(endpoint)
  }

  getStaticDataRegionLanguageStrings(region, locale) {
    locale = locale || "en_US"
    let endpoint =  
      `https://global${api_endpoint}/static-data/${region}/v1.2/language-strings${this.api_key}&locale=${locale}`
 
    return this.makeRequest(endpoint)
  }

  getStaticDataRegionLanguages(region) {
    let endpoint =  
      `https://global${api_endpoint}/static-data/${region}/v1.2/languages${this.api_key}`
    return this.makeRequest(endpoint)
  }

  getStaticDataRegionMap(region, locale) {
    locale = locale || "en_US"
    let endpoint =  
      `https://global${api_endpoint}/static-data/${region}/v1.2/map${this.api_key}&locale=${locale}`
 
    return this.makeRequest(endpoint)
  }

  getStaticDataRegionMastery(region, locale) {
    locale = locale || "en_US"
    let endpoint =  
      `https://global${api_endpoint}/static-data/${region}/v1.2/mastery${this.api_key}&locale=${locale}`
    return this.makeRequest(endpoint)
  }

  getStaticDataRegionMasteryById(region, mid, locale) {
    locale = locale || "en_US"
    let endpoint =  
      `https://global${api_endpoint}/static-data/${region}/v1.2/mastery/${mid}${this.api_key}&locale=${locale}`
    return this.makeRequest(endpoint)
  }

  getStaticDataRegionRealm(region) {
    locale = locale || "en_US"
    let endpoint =  
      `https://global${api_endpoint}/static-data/${region}/v1.2/realm${this.api_key}&locale=${locale}`
    return this.makeRequest(endpoint)
  }

  getStaticDataRegionRune(region, locale) {
    locale = locale || "en_US"
    let endpoint =  
      `https://global${api_endpoint}/static-data/${region}/v1.2/rune${this.api_key}&locale=${locale}`
    return this.makeRequest(endpoint)
  }

  getStaticDataRegionRuneById(region, rid, locale) {
    locale = locale || "en_US"
    let endpoint =  
      `https://global${api_endpoint}/static-data/${region}/v1.2/rune/${rid}${this.api_key}&locale=${locale}`
    return this.makeRequest(endpoint)
  }

  getStaticDataRegionSpell(region, locale) {
    locale = locale || "en_US"
    let endpoint =  
      `https://global${api_endpoint}/static-data/${region}/v1.2/summoner-spell${this.api_key}&locale=${locale}`
    return this.makeRequest(endpoint)
  }

  getStaticDataRegionSpellById(region, rid, locale) {
    locale = locale || "en_US"
    let endpoint =  
      `https://global${api_endpoint}/static-data/${region}/v1.2/summoner-spell/${rid}${this.api_key}&locale=${locale}`
    return this.makeRequest(endpoint)
  }

  getStaticDataRegionVersions(region) {
    locale = locale || "en_US"
    let endpoint =  
      `https://global${api_endpoint}/static-data/${region}/v1.2/versions${this.api_key}&locale=${locale}`
    return this.makeRequest(endpoint)
  }

  getStatusShards() {
    return this.makeRequest(`http://status.leagueoflegends.com/shards${this.api_key}`)
  }

  getStatusShardsRegion(r) {
    let region = this.getRegion(r)
    let ralph = region == "pbe" ? "pbe." : "" // pbe has a special url
    let endpoint = 
      `http://status.${ralph}leagueoflegends.com/shards/${region}${this.api_key}`
    return this.makeRequest(endpoint)
  }

  getMatch(region, mid) {
    let endpoint =
      `https://${region}${api_endpoint}/${region}/v2.2/match/${mid}${this.api_key}`
    return this.makeRquest(endpoint)
  }

  getRanked(region, sid, season) {
    let endpoint =
      `https://${region}${api_endpoint}/${region}/v1.3/stats/by-summoner/${sid}/ranked${this.api_key}&season=${season}`
    return this.makeRquest(endpoint)
  }

  getSummary(region, sid, season) {
    season = season || this.default_season
    let endpoint =
      `https://${region}${api_endpoint}/${region}/v1.3/stats/by-summoner/${sid}/summary${this.api_key}&season=${season}`
    return this.makeRquest(endpoint)
  }

  getSummonerByAccount(region, aid) {
    let endpoint =
      `https://${region}${api_endpoint}/${region}/v1.4/summoner/by-account/${aid}${this.api_key}`
    return this.makeRquest(endpoint)
  }

  getSummonerByName(region, name) {
    let endpoint =
      `https://${region}${api_endpoint}/${region}/v1.4/summoner/by-name/${name}${this.api_key}`
    return this.makeRquest(endpoint)
  }

  getSummoner(region, sid) {
    let endpoint =
      `https://${region}${api_endpoint}/${region}/v1.4/summoner/${sid}${this.api_key}`
    return this.makeRquest(endpoint)
  }

  getSummonerMasteries(region, sid) {
    let endpoint =
      `https://${region}${api_endpoint}/${region}/v1.4/summoner/${sid}/masteries${this.api_key}`
    return this.makeRquest(endpoint)
  }

  getSummonerName(region, sid) {
    let endpoint =
      `https://${region}${api_endpoint}/${region}/v1.4/summoner/${sid}/name${this.api_key}`
    return this.makeRquest(endpoint)
  }
  
  getSummonerRunes(region, sid) {
    let endpoint =
      `https://${region}${api_endpoint}/${region}/v1.4/summoner/${sid}/runes${this.api_key}`
    return this.makeRquest(endpoint)
  }

  getTeamsBySummoner(region, sid) {
    let endpoint =
      `https://${region}${api_endpoint}/${region}/v2.4/team/by-summoner/${sid}${this.api_key}`
    return this.makeRquest(endpoint)
  }
  
  getTeam(region, tid) {
    let endpoint =
      `https://${region}${api_endpoint}/${region}/v2.4/team/${tid}${this.api_key}`
    return this.makeRquest(endpoint)
  }
}
