const { gql } = require('apollo-server')

const applicationTypeDef = gql`
  extend type Query {
    getAllApplications: [Application]
    getAllFintechApplications(fintechID: String!): [Application]
    getAllUserApplications(userID: String!): [Application]
  }

  extend type Mutation {
    addNewApplication(
      userID: ID!
      fintechID: ID!
      amount: Int!
      loan_term: Int!
      objective: String!
    ): Application

    updateApplicationDecision(id: ID!, amount: Int!, loan_term: Int, decision: String!): Application
  }

  type Application {
    _id: ID!
    userID: ID!
    fintechID: ID!
    amount: Int
    loan_term: Int
    objective: String
    decision: String
  }
`

const applicationResolvers = {
  Query: {
    getAllApplications: async (_source, _args, { dataSources }) => {
      return dataSources.applicationAPI.getAllApplications()
    },
    getAllFintechApplications: async (
      _source,
      { fintechID },
      { dataSources }
    ) => {
      return dataSources.applicationAPI.getAllFintechApplications(fintechID)
    },
    getAllUserApplications: async (_source, { userID }, { dataSources }) => {
      return dataSources.applicationAPI.getAllUserApplications(userID)
    },
  },
  Mutation: {
    addNewApplication: async (
      _source,
      { userID, fintechID, amount, loan_term, objective },
      { dataSources }
    ) => {
      return dataSources.applicationAPI.addNewApplication(
        userID,
        fintechID,
        amount,
        loan_term,
        objective
      )
    },
    updateApplicationDecision: async (_source, {}, { dataSources }) => {
      return dataSources.applicationAPI.updateApplicationDecision()
    },
  },
}

module.exports = { applicationTypeDef, applicationResolvers }
