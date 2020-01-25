const { gql } = require('apollo-server')

const applicationTypeDef = gql`
  extend type Query {
    getAllUserApplication: [Application]
  }

  extend type Mutation {
    addNewApplication(
      userID: String
      fintechID: String
      amount: Int
      loan_term: Int
      objective: String
    ): Application
    updateApplicationDecision(id: ID, decision: String): Application
  }

  type Application {
    id: ID!
    userID: String
    fintechID: String
    amount: Int
    loan_term: Int
    objective: String
    decision: String
  }
`

const applicationResolvers = {
  Query: {
    getAllUserApplication: async (_source, { id }, { dataSources }) => {
      return dataSources.applicationAPI.getAllUserApplication(id)
    },
  },
  Mutation: {
    addNewApplication: async (_source, _args, { dataSources }) => {
      return dataSources.applicationAPI.addNewApplication()
    },
    updateApplicationDecision: async (_source, _args, { dataSources }) => {
      return dataSources.applicationAPI.updateApplicationDecision()
    },
  },
}

module.exports = { applicationTypeDef, applicationResolvers }
