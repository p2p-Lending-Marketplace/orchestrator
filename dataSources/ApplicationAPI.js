const { RESTDataSource } = require('apollo-datasource-rest')

class ApplicationAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000/application' // update baseURL
  }

  async getAllApplications() {
    return this.get(`/`)
  }

  async getAllFintechApplications({ fintechID, token }) {
    return this.get(`/fintech/${fintechID}`, null, {
      headers: { token },
    })
  }

  async getAllUserApplications(userID, token) {
    return this.get(`/user/${userID}`, null, {
      headers: {
        token: token,
      },
    })
  }

  async addNewApplication(
    userID,
    fintechID,
    amount,
    loan_term,
    objective,
    token
  ) {
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

  async updateApplicationDecision({ id, amount, loan_term, decision }) {
    const application = await this.patch(`/${id}`, {
      amount,
      loan_term,
      decision,
    })
    console.log(application)

    await this.post('/sendpush', {
      _id: application.user_id,
      title: "Application's updated",
      body: "Your application's decision has been updated! Review now!",
    })
    return application
  }
}

module.exports = ApplicationAPI
