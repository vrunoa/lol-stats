import mongo from 'mongodb'
import config from '../config.json'
import semafor from 'semafor'

let MongoClient = mongo.MongoClient
let logger = semafor()
let db

export default class Lazy{
  
  constructor() {
    this.db_url = config["db_url"]
    let instance = this
    MongoClient.connect(this.db_url, (err, _db_) => {
      if(err) {
        logger.fail(err)
      }
      db = _db_  
    })
  }

  closeConnection() {
    db.close()
  }

  queryOne(model, query, cb) {
    db.collection(model).findOne(query, (err, item) => {
      cb(item)
    })
  }

  query(model, query) {
    return db.collection(model).find(query).toArray()
  }

  insert(model, data, cb) {
    db.collection(model).insert(data, {w:1}, cb)
  }

  remove(model, query, cb) {
    db.collection(model).remove(query, {w:1}, cb)
  }

}
