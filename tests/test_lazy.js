import Lazy from '../lib/lazy.js'
import Api from '../lib/Api.js'
import config from '../config.json'
import chai from 'chai'

let test_name = "stryderjzw",
  test_region = "na", lazy = new Lazy(),
  test_model = "summoner",
  should = chai.should()


describe("Test Lazy class", () => {
        
  it("Test lazy methods", (done) => {
    let summoner = {name:test_name}
    setTimeout( () => {
      lazy.remove(test_model, {})
      lazy.query(test_model, {})
      .then( (data) => {
        data.should.be.a("array")
        data.length.should.equal(0)
        lazy.insert(test_model, summoner, (err, data) => {
          if(err) throw new Error(err)
          lazy.queryOne(test_model, summoner, (one) => {
            one.should.be.a("object")
            one.should.not.equal(null)
            one.should.not.equal(undefined)
            one.name.should.equal(test_name)
            lazy.query(test_model, {})
              .then( (data) => {
              data.should.be.a("array")
              data.should.not.equal(null)
              data.should.not.equal(undefined)
              data.length.should.equal(1)
              data[0].name.should.equal(test_name)
              done()
            })
          })
        })
      })
    }, 1000)
  })

  it("Test Api getSummonerByName is saving and getting local info", (done) => {
    let api = new Api(config["api_key"], lazy)
       
    setTimeout( () => {
      lazy.remove("summoner", {name:test_name})
      api.getSummonerByName(test_region, test_name)
      .then( (data) => {
        data.cached.should.equal(false)
        api.getSummonerByName(test_region, test_name)
        .then( (data) => {
          data.cached.should.equal(true)      
          done()
        })
      })
    }, 1000)
  })

})
