const { RESTDataSource } = require('apollo-datasource-rest')

class AdminAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000/admin' // update baseURL
  }

  async loginAdmin(username, password) {
    return this.post('/login', {
      username: username,
      password: password,
    })
  }
}

module.exports = AdminAPI
