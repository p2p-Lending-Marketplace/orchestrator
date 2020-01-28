const { RESTDataSource } = require('apollo-datasource-rest')

class ApplicationAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000/application' // update baseURL
  }

  async getOneApplication({ id, token }) {
    return this.get(`${id}`, null, { headers: { token } })
  }

  async getAllApplications() {
    return this.get(`/`)
  }

  async getAllFintechApplications({ fintechID, token }) {
    return this.get(`/fintech/${fintechID}`, null, {
      headers: { token },
    })
  }

  async getAllUserApplications({ token }) {
    return this.get(`user`, null, {
      headers: {
        token,
      },
    })
  }

  async addNewApplication({ fintechID, amount, loan_term, objective, token }) {
    return this.post(
      `/`,
      {
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

  async updateApplicationDecision({ token, id, amount, loan_term, decision }) {
    const application = await this.patch(
      `/${id}/decision`,
      {
        amount,
        loan_term,
        decision,
      },
      { headers: { token } }
    )
    console.log(application)

    await this.post(
      '/sendpush',
      {
        _id: application.user_id,
        title: "Application's updated",
        body: "Your application's decision has been updated! Review now!",
      },
      { headers: { token } }
    )
    return application
  }
}

module.exports = ApplicationAPI
