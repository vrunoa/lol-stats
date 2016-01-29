import webdriver from 'selenium-webdriver'
import server from '../lib/index.js'
import chai from 'chai'

let app = server().listen(5000)
let should = chai.should()
let expect = chai.expect
let test_name = "stryderjzw", test_name_not_found = "vrunoa"

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
    })
    driver
    .findElement(By.className("user-search-form"))
    .isDisplayed()
    .then( (is) => {
      is.should.equal(true)
    })
    driver
    .findElement(By.id("user"))
    .isDisplayed()
    .then( (is) => {
      is.should.equal(true)
      done()
    })
    
  })

  it("test region select has the correct options", (done) => {
    driver
    .findElement(By.className("navbar-form"))
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
                if(i == (len-1)) {
                  options[6].click()
                  done()
                }
              })
            })
          })
        }
      })
    })
  })

  it("test right user search shows user info container", (done) => {
    let didDone = false
    driver
    .findElement(By.id("user"))
    .sendKeys(test_name)
    driver
    .wait( () => {
      driver.isElementPresent(By.id("user-container"))
      driver.findElement(By.id("user-container"))
      .then( (el) => {
        el.isDisplayed()
        .then( (is) => {
          if(is && !didDone)  {
            didDone = true
            return done()  
          }
        })
      })
    }, 5000)
  })

  it("test wring user search hides user info container", (done) => {
    let didDone = false
    driver
    .findElement(By.id("user"))
    .clear()
    driver
    .findElement(By.id("user"))
    .sendKeys(test_name_not_found)
    driver
    .wait( () => {
      driver.isElementPresent(By.id("user-container"))
      driver.findElement(By.id("user-container"))
      .then( (el) => {
        el.isDisplayed()
        .then( (is) => {
          if(!is && !didDone) { 
            didDone = true
            return done()
          }
        })
      })
    }, 5000)
  })

  it("test right user search shows user info container info, again", (done) => {
    let didDone = false
    driver
    .findElement(By.id("user"))
    .clear()
    driver
    .findElement(By.id("user"))
    .sendKeys(test_name)
    driver
    .wait( () => {
      driver.isElementPresent(By.id("user-container"))
      driver.findElement(By.id("user-container"))
      .then( (el) => {
        el.isDisplayed()
        .then( (is) => {
          if(is && !didDone) {
            didDone = true
            return done()  
          }
        })
      })
    }, 5000)
  })

  it("test user-profile is showing info",  (done) => {
    driver
    .findElement(By.id("user-container"))
    .then( (el) => {
      el.isDisplayed()
      .then( (is) => {
        is.should.equal(true)
      })
    })
    driver
    .findElement(By.id("user-profile-id"))
    .then( (el) => {
      el.getText()
      .then( (text) => {
        expect(text).to.match(/^Id\:\s+\d+/)
      })
    })
    driver
    .findElement(By.id("user-profile-level"))
    .then( (el) => {
      el.getText()
      .then( (text) => {
        expect(text).to.match(/^Level\:\s+\d+/)
      })
    })
    driver
    .findElement(By.id("user-profile-name"))
    .then( (el) => {
      el.getText()
      .then( (text) => {
        expect(text).to.contain(test_name)
      })
    })
    driver
    .findElement(By.className("profile-icon"))
    .then( (el) => {
      el.getAttribute("src")
      .then( (src) => {
        expect(src).to.match(/http:\/\/sk2\.op\.gg\/images\/profile_icons\/profileIcon\d+.jpg/)
        done()
      })
    })
  })

  it("test user tabs are showing",  (done) => {
    driver
    .findElement(By.id("summary-tab-link"))
    .then( (el) => {
      el.isDisplayed()
      .then( (is) => {
        is.should.equal(true)    
      })
    })
    driver
    .findElement(By.id("ranked-tab-link"))
    .then( (el) => {
      el.isDisplayed()
      .then( (is) => {
        is.should.equal(true)    
      })
    })
    driver
    .findElement(By.className('tab-summary'))
    .then( (el) => {
      el.isDisplayed()
      .then( (is) => {
        is.should.equal(true)
      })
    })
    driver
    .isElementPresent(By.className("tab-ranked"))
    .then( (is) => {
      is.should.equal(true)
    })
    driver
    .findElement(By.className("tab-ranked"))
    .then( (el) => {
      el.isDisplayed()
      .then( (is) => {
        is.should.equal(false)
        done()
      })
    })
  })

  it("test tab ranked click is changing tab displayed", (done) => {
    driver
    .findElement(By.id("ranked-tab-link"))
    .click()
    driver
    .findElement(By.id("summary-tab-link"))
    .then( (el) => {
      el.isDisplayed()
      .then( (is) => {
        is.should.equal(true)
        el.getAttribute("class")
        .then( (classes) => {
          expect(classes).to.not.contain("active")
        })
      })
    }) 
    driver
    .findElement(By.id("ranked-tab-link"))
    .then( (el) => {
      el.isDisplayed()
      .then( (is) => {
        is.should.equal(true)
        el.getAttribute("class")
        .then( (classes) => {
          expect(classes).to.contain("active")
        })
      })
    }) 
    driver
    .findElement(By.className("tab-summary"))
    .then( (el) => {
      el.isDisplayed()
      .then( (is) => {
        is.should.equal(false)
      })
    })
    driver
    .findElement(By.className("tab-ranked"))
    .then( (el) => {
      el.isDisplayed()
      .then( (is) => {
        is.should.equal(true)
        done()
      })
    })
  })

  it("test tab summary click is changing the displayed tab", (done) => {
    driver
    .findElement(By.id("summary-tab-link"))
    .click()
    driver
    .findElement(By.id("summary-tab-link"))
    .then( (el) => {
      el.isDisplayed()
      .then( (is) => {
        is.should.equal(true)
        el.getAttribute("class")
        .then( (classes) => {
          expect(classes).to.contain("active")
        })
      })
    }) 
    driver
    .findElement(By.id("ranked-tab-link"))
    .then( (el) => {
      el.isDisplayed()
      .then( (is) => {
        is.should.equal(true)
        el.getAttribute("class")
        .then( (classes) => {
          expect(classes).to.not.contain("active")
        })
      })
    }) 
    driver
    .findElement(By.className("tab-summary"))
    .then( (el) => {
      el.isDisplayed()
      .then( (is) => {
        is.should.equal(true)
      })
    })
    driver
    .findElement(By.className("tab-ranked"))
    .then( (el) => {
      el.isDisplayed()
      .then( (is) => {
        is.should.equal(false)
        done()
      })
    })
  })

  it("test summary tab season has the correct options", (done) => {
    let seasons = ["SEASON3", "SEASON2014", "SEASON2015", "SEASON2016"]
    driver
    .findElement(By.id("select-season-summary"))
    .then( (el) => {
      el.findElements(By.tagName("option"))
      .then( (options) => {
        let len = options.length
        for(let i=0;i<len;i++){
          let option = options[i]
          option.getAttribute("value")
          .then( (val) => {
            if(val.indexOf("?") != -1) return
            seasons.indexOf(val).should.not.equal(-1)
            option.getText().then( (text) => {
              seasons.indexOf(text).should.not.equal(-1)
              if( i == (len-1)) done()
            })
          })
        }
      })
    })
  })

  it("test summary table has the correct titles", (done) => {
    
    let titles = [
      "", "Type", "Total Neutral Minions Killed",
      "Total Minions Killed", "Total Champion Minions Killed",
      "Total Assists", "Total Turrets Killed", "Wins"
    ]
    driver
    .findElement(By.id("summary-table"))
    .then( (el) => {
      el.findElements(By.tagName("th"))
      .then( (ths) => {
        let len = ths.length
        for(let i=0; i<len;i++) {
          let th = ths[i]
          th.getText()
          .then( (text) => {
            console.log(text)
            text.trim().should.equal(titles[i])
            if(i == (len-1)) done()
          })
        }
      })
    })
  })

  it("test season change is showing summary info", (done) => {
    let seasons = ["SEASON3", "SEASON2014", "SEASON2015", "SEASON2016"]
    driver
    .findElement(By.id("summary-table"))
    .then( (el) => {
      el.isDisplayed()
      .then( (is) => {
        is.should.equal(true)
      })
    })
    driver
    .findElement(By.id("select-season-summary"))
    .then( (el) => {
      el.findElements(By.tagName("option"))
      .then( (options) => {
        let len = options.length
        options[1].click()
        done()        
      })
    })
  })
  
  it("test is showing summary info", (done) => {
    let didDone = false
    driver
    .wait( () => {
      driver
      .findElements(By.className("summary-row"))
      .then( (rows) => {
        if(rows.length > 0 && !didDone) {
          didDone = true
          done()         
        }
      })
    }, 3000)
  })

})
