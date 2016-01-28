import express from 'express'
import parser from 'body-parser'
import config from '../config.json'
import Dispatcher from './Dispatcher.js'
import path from 'path'
import API from './Api.js'

export default function server() {
  let app = express(),
    dispatcher = new Dispatcher(path.join(__dirname, '..', 'public')),
    api = new API(config["api_key"])
  
  app.use(express.static('public'))

  app.get("/", (req, res) => {
    dispatcher.sendFile(res, 'index.html')
  })

  let jsonParser = parser.json()

  app.post("/status", jsonParser, (req, res) => {
    dispatcher.json(res, api.getStatusShardsRegion(req.body.region))
  })

  app.post("/summoner-by-name", jsonParser, (req, res) => {
    dispatcher.json(res, api.getSummonerByName(
      req.body.region,
      req.body.q
    ))
  })

  app.post("/summoner-sumary", jsonParser, (req, res) => {
    dispatcher.json(res, api.getSummary(
      req.body.region, req.body.summoner, req.body.season
    ))
  })

  app.post("/champions", jsonParser, (req, res) => {
    dispatcher.json(res, api.getChampions(req.body.region))
  })
  
  return app
}
