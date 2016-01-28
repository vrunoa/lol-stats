import webdriver from 'selenium-webdriver'
import server from '../lib/index.js'
import chai from 'chai'

let app = server().listen(5000)
let should = chai.should()
let expect = chai.expect

describe("Test web UI", () => {
  
  let By = webdriver.By, until = webdriver.until
  let driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build()

  after( () => {
    return driver.quit()
  })

  let regions = {
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


  it("test initial state", (done) => {
    driver
    .get("http://localhost:5000")
    driver
    .findElement(By.id("region-select"))
    .isDisplayed()
    .then( (is) => {
      is.should.equal(true)
    })
    driver
    .findElement(By.className("search"))
    .isDisplayed()
    .then( (is) => {
      is.should.equal(true)    
    })
    driver
    .findElement(By.className("p-region"))
    .isDisplayed()
    .then( (is) => {
      is.should.equal(true)    
    })
    driver
    .findElement(By.className("preloader"))
    .isDisplayed()
    .then( (is) => {
      is.should.equal(false)    
    })
    driver
    .findElement(By.className("alert-danger"))
    .isDisplayed()
    .then( (is) => {
      is.should.equal(false)    
      done()
    })
  })

  it("test region select has the correct options", (done) => {
    driver
    .get("http://localhost:5000")
    driver
    .findElement(By.id("region-select"))
    .then( (el) => {
      el.findElements(By.tagName("option"))
      .then( (options) => {
        let len = options.length
        for(let i=0;i<len;i++){
          let option = options[i]
          option.getAttribute("value")
          .then( (val) => {
            if(val.indexOf("?") != -1) return
            regions[val].should.not.equal(undefined)
            option.getText().then( (text) => {
              regions[val].should.equal(text)
              if( i == (len-1)) done()
            })
          })
        }
      })
    })
  })

  it("test select change is changing region name", (done) => {
    driver
    .get("http://localhost:5000")
    driver
    .findElement(By.id("region-select"))
    .then( (el) => {
      el.findElements(By.tagName("option"))
      .then( (options) => {
        let len = options.length
        for(let i=0;i<len;i++){
          let option = options[i]
          option.getAttribute("value")
          .then( (val) => {
            if(val.indexOf("?") != -1) return
            option.click()
            driver
            .findElement(By.className("p-region"))
            .then( (p) => {
              p.getText()
              .then( (p_text) => {
                expect(p_text).to.contain(regions[val])
                if(i == (len-1)) done()
              })
            })
          })
        }
      })
    })
 
  })
})
