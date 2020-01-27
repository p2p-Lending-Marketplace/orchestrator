const { RESTDataSource } = require('apollo-datasource-rest')

class AdminAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000/admin' // update baseURL
  }

  async loginAdmin(data) {
    return this.post('/login', data)
  }
}

module.exports = AdminAPI
