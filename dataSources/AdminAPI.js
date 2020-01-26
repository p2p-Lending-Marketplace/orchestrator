const { RESTDataSource } = require('apollo-datasource-rest')

class AdminAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000/imageUpload' // update baseURL
  }

  async uploadImage(image) {
    console.log(image)
    return this.post('/', { image })
  }
}

module.exports = AdminAPI
