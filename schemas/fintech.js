const { gql } = require('apollo-server')

const fintechTypeDef = gql`
  extend type Query {
    getAllFinteches: [Fintech]
    getFintechById(id: ID!): Fintech
  }

  extend type Mutation {
    addNewFintech(
      company_name: String
      description: String
      min_interest: Int
      max_interest: Int
    ): Fintech
    updateFintechRates(id: ID, min_interest: Int, max_interest: Int): Fintech
  }

  type Fintech {
    id: ID!
    company_name: String
    description: String
    min_interest: Int
    max_interest: Int
  }
`

const fintechResolvers = {
  Query: {
    getAllFinteches: async (_source, _args, { dataSources }) => {
      return dataSources.fintechAPI.getAllFinteches()
    },
    getFintechById: async (_source, { id }, { dataSources }) => {
      return dataSources.fintechAPI.getFintechById(id)
    },
  },
  Mutation: {
    addNewFintech: async (_source, _args, { dataSources }) => {
      return dataSources.fintechAPI.addNewFintech()
    },
    updateFintechRates: async (_source, _args, { dataSources }) => {
      return dataSources.fintechAPI.updateFintechRates()
    },
  },
}

module.exports = { fintechTypeDef, fintechResolvers }
