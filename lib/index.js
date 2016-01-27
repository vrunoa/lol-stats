import express from 'express'
import parser from 'body-parser'
import config from '../config.json'
import regions from './regions.js'
import Dispatcher from './Dispatcher.js'
import path from 'path'
import API from './Api.js'

export default function server() {
  let app = express(),
    region = regions(),
    dispatcher = new Dispatcher(path.join(__dirname, '..', 'public')),
    api = new API(config["api_key"])
  
  app.use(express.static('public'))
  

  app.get("/", (req, res) => {
    dispatcher.sendFile(res, 'index.html')
  })

  let jsonParser = parser.json()
  app.post("/champions", jsonParser, (req, res) => {
    region = regions(req.body.region)
    dispatcher.json(res, api.getChampions(region))
  })
  return app
}
