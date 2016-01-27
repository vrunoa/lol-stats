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
  
  app.use(express.static('public'));
  app.use(parser.urlencoded({ extended: false }));
  app.use(parser.json());

  app.get("/", (req, res) => {
    dispatcher.sendFile(res, 'index.html')
  })

  app.post("/champions", (req, res) => {
    console.log("champions")
    console.log(req.params)
    region = regions(req.params["region"])
    dispatcher.json(res, api.getChampions(region))
  })
  return app
}
