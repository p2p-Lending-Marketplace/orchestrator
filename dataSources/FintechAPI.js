const { RESTDataSource } = require('apollo-datasource-rest')

class FintechAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000/fintech' // update baseURL
  }

  async getAllFinteches() {
    return this.get()
  }

  async getFintechById(id) {
    return this.get(`/${id}`)
  }

  async addNewFintech(company_name, description, min_interest, max_interest) {
    return this.post(`/`, {
      company_name: company_name,
      description: description,
      min_interest: min_interest,
      max_interest: max_interest,
    })
  }

  async updateFintechData(
    id,
    company_name,
    description,
    min_interest,
    max_interest
  ) {
    return this.patch(`/${id}`, {
      company_name: company_name,
      description: description,
      min_interest: min_interest,
      max_interest: max_interest,
    })
  }
}

module.exports = FintechAPI
