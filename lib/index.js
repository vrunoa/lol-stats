import express from 'express'
import parser from 'body-parser'
import config from '../config.json'
import Dispatcher from './Dispatcher.js'
import path from 'path'
import API from './Api.js'
import Lazy from './lazy.js'

export default function server() {
  let app = express(),
    dispatcher = new Dispatcher(path.join(__dirname, '..', 'public')),
    lazy = new Lazy(),
    api = new API(config["api_key"], lazy)
  
  app.use(express.static('public'))
  app.use(parser.json())

  app.get("/", (req, res) => {
    dispatcher.sendFile(res, 'index.html')
  })

  app.post("/status", (req, res) => {
    dispatcher.json(res, api.getStatusShardsRegion(req.body.region))
  })

  app.post("/summoner-by-name", (req, res) => {
    dispatcher.json(res, api.getSummonerByName(
      req.body.region,
      req.body.q
    ))
  })

  app.post("/summoner-sumary", (req, res) => {
    dispatcher.json(res, api.getSummary(
      req.body.region, req.body.summoner, req.body.season
    ))
  })

  app.post("/summoner-ranked", (req, res) => {
    dispatcher.json(res, api.getRanked(
      req.body.region, req.body.summoner, req.body.season
    ))
  })

  app.post("/champions", (req, res) => {
    dispatcher.json(res, api.getChampions(req.body.region))
  })
  
  return app
}
