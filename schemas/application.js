const { gql } = require('apollo-server')

const applicationTypeDef = gql`
  extend type Query {
    getAllApplications: [Application]
    getAllFintechApplications(fintechID: String!, token: String!): [Application]
    getAllUserApplications(userID: ID, token: String!): [Application]
    getOneApplication(id: ID, token: String!): Application
  }

  extend type Mutation {
    addNewApplication(
      # userID: ID
      fintechID: ID!
      amount: Int!
      loan_term: Int!
      objective: String!
      token: String!
    ): Application

    updateApplicationDecision(
      token: String
      id: ID!
      amount: Int
      loan_term: Int
      decision: String
    ): Application
  }

  type Application {
    _id: ID!
    user_id: User
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
    getAllUserApplications: async (_source, args, { dataSources }) => {
      return dataSources.applicationAPI.getAllUserApplications(args)
    },
    getOneApplication: async (_, args, { dataSources }) => {
      return dataSources.applicationAPI.getOneApplication(args)
    },
  },
  Mutation: {
    addNewApplication: async (_source, args, { dataSources }) => {
      return dataSources.applicationAPI.addNewApplication(args)
    },
    updateApplicationDecision: async (_source, args, { dataSources }) => {
      console.log('testttttt')
      return dataSources.applicationAPI.updateApplicationDecision(args)
    },
  },
}

module.exports = { applicationTypeDef, applicationResolvers }
