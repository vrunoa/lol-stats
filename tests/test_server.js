import server from '../lib/index.js'
import request from 'supertest'

let app = server().listen(5000),
test_sid = 258622, test_name = "stryderjzw",
test_name_not_found = "vrunoa";

describe("Test server routes", () => {

  it("should get index", (done) => {
    request(app)
    .get("/")
    .expect('Content-Type', /text\/html/)
    .expect(200, done)
  })

  it("should post status", (done) => {
    
    // check na status
    request(app)
    .post("/status")
    .send({region:"na"})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, res) => {
      if(err) throw err
      let data = res.body
      if(data.slug != "na") 
        throw new Error("got wrong status:, "+res.body)
    
    // check br status
    request(app)
    .post("/status")
    .send({region:"br"})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, res) => {
      if(err) throw err
      let data = res.body
      if(data.slug != "br") 
        throw new Error("got wrong status:, "+res.body)
    
    // check eune status
    request(app)
    .post("/status")
    .send({region:"eune"})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, res) => {
      if(err) throw err
      let data = res.body
      if(data.slug != "eune") 
        throw new Error("got wrong status:, "+res.body)

    // check euw status
    request(app)
    .post("/status")
    .send({region:"euw"})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, res) => {
      if(err) throw err
      let data = res.body
      if(data.slug != "euw") 
        throw new Error("got wrong status:, "+res.body)

    // check lan status
    request(app)
    .post("/status")
    .send({region:"lan"})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, res) => {
      if(err) throw err
      let data = res.body
      if(data.slug != "lan") 
        throw new Error("got wrong status:, "+res.body)

    // check las status
    request(app)
    .post("/status")
    .send({region:"las"})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, res) => {
      if(err) throw err
      let data = res.body
      if(data.slug != "las") 
        throw new Error("got wrong status:, "+res.body)

    // check oce status
    request(app)
    .post("/status")
    .send({region:"oce"})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, res) => {
      if(err) throw err
      let data = res.body
      if(data.slug != "oce") 
        throw new Error("got wrong status:, "+res.body)

    // check euw status
    request(app)
    .post("/status")
    .send({region:"pbe"})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, res) => {
      if(err) throw err
      let data = res.body
      if(data.slug != "pbe") 
        throw new Error("got wrong status:, "+res.body)

    // check ru status
    request(app)
    .post("/status")
    .send({region:"ru"})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, res) => {
      if(err) throw err
      let data = res.body
      if(data.slug != "ru") 
        throw new Error("got wrong status:, "+res.body)

    // check euw status
    request(app)
    .post("/status")
    .send({region:"tr"})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, res) => {
      if(err) throw err
      let data = res.body
      if(data.slug != "tr") 
        throw new Error("got wrong status:, "+res.body)
      
      done()

    })})})})})})})})})})
  })

  it("shouldnt get status", (done) => {
    request(app)
    .get("/status")
    .field("region", "na")
    .set('Accept', 'application/json')
    .expect(404, done)
  })

  it("should post summoner-by-name", (done) => {
    request(app)
    .post("/summoner-by-name")
    .send({region:"na", q:test_name})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done)
  })

  it("should post 404 on missing summoner-by-name", (done) => {
    request(app)
    .post("/summoner-by-name")
    .send({region:"na", q:test_name_not_found})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, res) => {
      if(!res.body.error)
        throw new Error("should have returng an error object, "+res.body)
      done()
    })
  })

  it("shouldnt get summoner-by-name", (done) => {
    request(app)
    .get("/summoner-by-name")
    .send({region:"na", q:test_name})
    .set('Accept', 'application/json')
    .expect(404, done)
  })
  
  it("should post summoner-sumary", (done) => {
    request(app)
    .post("/summoner-sumary")
    .send({region:"na", summoner:test_sid})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done)
  })

  it("shouldnt get summoner-summary", (done) => {
    request(app)
    .get("/summoner-sumary")
    .send({region:"na", summoner:test_sid})
    .set('Accept', 'application/json')
    .expect(404, done)
  })

  it("should post summoner-ranked", (done) => {
    request(app)
    .post("/summoner-ranked")
    .send({region:"na", summoner:test_sid})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done)
  })

  it("shouldnt get summoner-ranked", (done) => {
    request(app)
    .get("/summoner-ranked")
    .send({region:"na", summoner:test_sid})
    .set('Accept', 'application/json')
    .expect(404, done)
  })

})
