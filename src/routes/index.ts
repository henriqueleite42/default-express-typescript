import fs from 'fs'
import path from 'path'
import { Express } from 'express'

class Index {
  public constructor (server: Express) {
    fs
      .readdirSync(__dirname)
      .filter(file => (file.indexOf('.') !== 0 && (file !== "index.js")))
      .forEach(file => {
        var File = require(path.resolve(__dirname, file));
        if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
          return new File(server)
        } else {
          return new File.default(server)
        }
      })
  }
}

export default Index