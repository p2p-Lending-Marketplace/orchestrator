const { RESTDataSource } = require('apollo-datasource-rest')

class FintechAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000' // update baseURL
  }

  async getAllFintech() {
    return this.get()
  }

  async addNewFintech(company_name, description, min_interest, max_interest) {
    return this.post(`/`, {
      company_name: company_name,
      description: description,
      min_interest: min_interest,
      max_interest: max_interest,
    })
  }

  async updateFintechRates(id, min_interest, max_interest) {
    return this.patch(`/${id}/rates`, {
      min_interest: min_interest,
      max_interest: max_interest,
    })
  }
}

module.exports = FintechAPI
