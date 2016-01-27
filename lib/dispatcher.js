import path from 'path'

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
      res.json({error:err})
    })
  }
  
}
