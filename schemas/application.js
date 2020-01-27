const { gql } = require('apollo-server')

const applicationTypeDef = gql`
  extend type Query {
    getAllApplications: [Application]
    getAllFintechApplications(fintechID: String!, token: String!): [Application]
    getAllUserApplications(userID: ID!, token: String!): [Application]
  }

  extend type Mutation {
    addNewApplication(
      userID: ID!
      fintechID: ID!
      amount: Int!
      loan_term: Int!
      objective: String!
      token: String!
    ): Application

    updateApplicationDecision(
      id: ID!
      amount: Int!
      loan_term: Int
      decision: String!
    ): Application
  }

  type Application {
    _id: ID!
    user_id: ID!
    fintech_id: ID!
    amount: Int
    logoURL: String!
    company_name: String
    loan_term: Int
    objective: String
    decision: String
    createdAt: String
    status: String
  }
`

const applicationResolvers = {
  Query: {
    getAllApplications: async (_source, _args, { dataSources }) => {
      return dataSources.applicationAPI.getAllApplications()
    },
    getAllFintechApplications: async (_source, args, { dataSources }) => {
      return dataSources.applicationAPI.getAllFintechApplications(args)
    },
    getAllUserApplications: async (
      _source,
      { userID, token },
      { dataSources }
    ) => {
      return dataSources.applicationAPI.getAllUserApplications(userID, token)
    },
  },
  Mutation: {
    addNewApplication: async (
      _source,
      { userID, fintechID, amount, loan_term, objective, token },
      { dataSources }
    ) => {
      return dataSources.applicationAPI.addNewApplication(
        userID,
        fintechID,
        amount,
        loan_term,
        objective,
        token
      )
    },
    updateApplicationDecision: async (_source, {}, { dataSources }) => {
      return dataSources.applicationAPI.updateApplicationDecision()
    },
  },
}

module.exports = { applicationTypeDef, applicationResolvers }
