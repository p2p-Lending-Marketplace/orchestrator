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

    updateFintechData(id: ID!, company_name: String, description: String!, min_interest: Int, max_interest: Int): Fintech
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
    updateFintechData: async (_source, { company_name, description, min_interest, max_interest }, { dataSources }) => {
      return dataSources.fintechAPI.updateFintechData(company_name, description, min_interest, max_interest)
    },
  },
}

module.exports = { fintechTypeDef, fintechResolvers }
