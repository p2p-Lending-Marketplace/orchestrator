const { gql } = require('apollo-server')

const fintechTypeDef = gql`
  extend type Query {
    getAllFinteches: [Fintech]
    getFintechById(id: ID!): Fintech
  }

  extend type Mutation {
    addNewFintech(
      token: String
      username: String
      password: String
      company_name: String
      description: String
      min_interest: Float
      max_interest: Float
      logoURL: String
      total_application: Int
      avg_credit_score: String
      percent_acceptance: Float
    ): Fintech

    updateFintechData(
      id: ID!
      token: String
      username: String
      password: String
      company_name: String
      description: String!
      min_interest: Float
      max_interest: Float
      logoURL: String
      total_application: Int
      avg_credit_score: String
      percent_acceptance: Float
    ): Fintech
  }

  type Fintech {
    _id: ID!
    token: String
    username: String
    password: String
    company_name: String
    description: String
    min_interest: Float
    max_interest: Float
    logoURL: String
    total_application: Int
    avg_credit_score: String
    percent_acceptance: Float
  }
`

const fintechResolvers = {
  Query: {
    getAllFinteches: async (_source, _args, { dataSources }) => {
      console.log('hello')
      return dataSources.fintechAPI.getAllFinteches()
    },
    getFintechById: async (_source, { id }, { dataSources }) => {
      const x = await dataSources.fintechAPI.getFintechById(id)
      console.log(x)
      return x
    },
  },
  Mutation: {
    addNewFintech: async (_source, args, { dataSources }) => {
      return dataSources.fintechAPI.addNewFintech(args)
    },
    updateFintechData: async (_source, args, { dataSources }) => {
      return dataSources.fintechAPI.updateFintechData(args)
    },
  },
}

module.exports = { fintechTypeDef, fintechResolvers }
