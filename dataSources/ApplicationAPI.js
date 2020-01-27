const { RESTDataSource } = require('apollo-datasource-rest')

class ApplicationAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000/application' // update baseURL
  }

  async getAllApplications() {
    return this.get(`/`)
  }

  async getAllFintechApplications(fintechID) {
    return this.get(`/fintech/${fintechID}`)
  }

  async getAllUserApplications(userID, token) {
    return this.get(`/user/${userID}`,null,{
      headers: {
        token: token
      }
    })
  }

  async addNewApplication(userID, fintechID, amount, loan_term, objective, token) {
    return this.post(
      `/`,
      {
        user_id: userID,
        fintech_id: fintechID,
        amount: amount,
        loan_term: loan_term,
        objective: objective,
      },
      {
        headers: {
          token: token,
        },
      }
    )
  }

  async updateApplicationDecision(id, decision) {
    return this.patch(`/${id}`, {
      id: id,
      decision: decision,
    })
  }
}

module.exports = ApplicationAPI
