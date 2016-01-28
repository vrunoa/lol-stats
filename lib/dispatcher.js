import path from 'path'
import Entities from 'html-entities'

let AllHtmlEntities = Entities.AllHtmlEntities
let entities = new AllHtmlEntities()

export default class Dispatcher {
  
  constructor(base_path) {
    this.base_path = base_path
  }

  sendFile(res, file) {
    file = path.join(this.base_path, file)
    res.sendFile(file)
  }

  json(res, promise) {
    promise.then( (data) => {
      res.json(data)
    }, 
    (err) => {
        try {
          var msg = entities.encode(err.message)
          res.json({error:msg})
        }catch(e) {
          res.json({error:"an error occurr while getting server response..."})
        }
    })
  }
  
}
