import Api from '../lib/Api.js'
import config from '../config.json'
import chai from 'chai'

let api = new Api(config["api_key"])
let should = chai.should()

describe("Tes Api methods", () => {
  
  it("test defaults are setted", (done) => {
    let defaults = api.getDefaults()
    defaults.season.should.not.equal(undefined)
    defaults.region.should.not.equal(undefined)
    done()
  })

  it("test regions list", (done) => {
    let regions = api.getRegions()
    regions.should.not.equal(undefined)
    regions.should.be.a("array")
    regions.indexOf("br").should.not.equal(-1)
    regions.indexOf("eune").should.not.equal(-1)
    regions.indexOf("euw").should.not.equal(-1)
    regions.indexOf("lan").should.not.equal(-1)
    regions.indexOf("las").should.not.equal(-1)
    regions.indexOf("na").should.not.equal(-1)
    regions.indexOf("oce").should.not.equal(-1)
    regions.indexOf("pbe").should.not.equal(-1)
    regions.indexOf("ru").should.not.equal(-1)
    regions.indexOf("tr").should.not.equal(-1)
    done()
  })

  it("test ranked types list", (done) => {
    let rankedTypes = api.getRankedTypes()
    rankedTypes.should.not.equal(undefined)
    rankedTypes.should.be.a("array")
    rankedTypes.indexOf("RANKED_SOLO_5x5").should.not.equal(-1)
    rankedTypes.indexOf("RANKED_TEAM_3x3").should.not.equal(-1)
    rankedTypes.indexOf("RANKED_TEAM_5x5").should.not.equal(-1)
    done()
  })

  it("test is setting default", (done) => {
    let regions = api.getRegions()
    regions.map( (region) => {
      api.setDefaultRegion(region)
      let default_region = api.getDefaultRegion()
      default_region.should.equal.region
    })
    api.setDefaultRegion("na")
    api.setDefaultRegion("other_region")
    api.getDefaultRegion().should.equal("na")
    done()
  })

  it("test get region", (done) => {
    let regions = api.getRegions()
    regions.map( (region) => {
      api.getRegion(region).should.equal(region)
    })
    done()
  })

  it("test make request returns a promise", (done) => {
    let promise = api.makeRequest()
    promise.should.be.a("promise")
    done()
  })

  it("test get platforms", (done) => {
    let platforms = api.getPlatforms()
    platforms.should.not.equal(undefined)
    let keys = ["na", "ru", "tr", "kr", "br", "lan", "las", "eune", "oce", "euw"]
    keys.map( (key) => {
      platforms[key].should.not.equal(undefined)
    })
    done()
  })
  
  it("test get status by region", (done) => {
    let regions = api.getRegions()
    let testGetStatus = function(arr, done){
      let region = arr.pop()
      if(region == undefined) return done()
      api.getStatusShardsRegion(region)
      .then( (response) => {
        response.slug.should.equal(region)  
        testGetStatus(arr, done)
      })
    }
    testGetStatus(regions.slice(0), done)
  })
  
})
