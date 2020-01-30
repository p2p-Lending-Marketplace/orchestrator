const { RESTDataSource } = require('apollo-datasource-rest')

class FintechAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000/fintech' // update baseURL
  }

  async getAllFinteches() {
    return this.get('/')
  }

  async getFintechById(id) {
    return this.get(`/${id}`)
  }

  async addNewFintech({
    token,
    username,
    password,
    company_name,
    description,
    min_interest,
    max_interest,
    logoURL,
    total_application,
    avg_credit_score,
    percent_acceptance,
  }) {
    return this.post(
      `/`,
      {
        company_name,
        description,
        min_interest,
        max_interest,
        logoURL,
        username,
        password,
        total_application,
        avg_credit_score,
        percent_acceptance,
      },
      { headers: { token } }
    )
  }

  async updateFintechData({
    token,
    username,
    password,
    id,
    company_name,
    description,
    min_interest,
    max_interest,
    logoURL,
    total_application,
    avg_credit_score,
    percent_acceptance,
  }) {
    return this.patch(
      `/${id}`,
      {
        company_name,
        description,
        min_interest,
        max_interest,
        logoURL,
        username,
        password,
        total_application,
        avg_credit_score,
        percent_acceptance,
      },
      { headers: { token } }
    )
  }
}

module.exports = FintechAPI
