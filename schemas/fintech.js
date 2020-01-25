const { gql } = require('apollo-server')

const fintechTypeDef = gql`
  extend type Query {
    getAllFintech: [Fintech]
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
    getAllFintech: async (_source, _args, { dataSources }) => {
      return dataSources.fintechAPI.getAllFintech()
    },
    getFintechById: async (_source, { id }, { dataSources }) => {
      return dataSources.fintechAPI.getFintechById(id)
    },
  },
  Mutation: {
    addNewFintech: async (_source, { company_name, description, min_interest, max_interest }, { dataSources }) => {
      return dataSources.fintechAPI.addNewFintech(company_name, description, min_interest, max_interest)
    },
    updateFintechRates: async (_source, _args, { dataSources }) => {
      return dataSources.fintechAPI.updateFintechRates()
    },
  },
}

module.exports = { fintechTypeDef, fintechResolvers }
