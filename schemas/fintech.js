const { gql } = require('apollo-server')

const fintechTypeDef = gql`
  extend type Query {
    getFintech: [Fintech]
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
    getFintech: async (_source, _args, { dataSources }) => {
      return dataSources.fintechAPI.getAllFintech()
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
