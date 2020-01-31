const { RESTDataSource } = require('apollo-datasource-rest')

class ApplicationAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://34.87.75.195/application' // update baseURL
  }

  async getAllUserApplication(id) {
    return this.get(`/${id}`)
  }

  async addNewApplication(userID, fintechID, amount, loan_term, objective) {
    return this.post(`/`, {
      userID: userID,
      fintechID: fintechID,
      amount: amount,
      loan_term: loan_term,
      objective: objective
    })
  }

  async updateApplicationDecision(id, decision) {
    return this.patch(`/${id}`, {
      id: id,
      decision: decision,
    })
  }
}

module.exports = ApplicationAPI
