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
      logoURL: String
    ): Fintech

    updateFintechData(id: ID!, company_name: String, description: String!, min_interest: Int, max_interest: Int): Fintech
  }

  type Fintech {
    _id: ID!
    company_name: String
    description: String
    min_interest: Int
    max_interest: Int
    logoURL: String
  }
`

const fintechResolvers = {
  Query: {
    getAllFinteches: async (_source, _args, { dataSources }) => {
      console.log("hello")
      return dataSources.fintechAPI.getAllFinteches()
    },
    getFintechById: async (_source, { id }, { dataSources }) => {
      return dataSources.fintechAPI.getFintechById(id)
    },
  },
  Mutation: {
    addNewFintech: async (_source, { company_name, description, min_interest, max_interest, logoURL }, { dataSources }) => {
      console.log(logoURL)
      return dataSources.fintechAPI.addNewFintech(company_name, description, min_interest, max_interest, logoURL)
    },
    updateFintechData: async (_source, { company_name, description, min_interest, max_interest }, { dataSources }) => {
      return dataSources.fintechAPI.updateFintechData(company_name, description, min_interest, max_interest)
    },
  },
}

module.exports = { fintechTypeDef, fintechResolvers }
