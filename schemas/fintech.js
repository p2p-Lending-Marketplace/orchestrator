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
    addNewFintech: async (
      _source,
      {
        token,
        username,
        password,
        company_name,
        description,
        min_interest,
        max_interest,
        logoURL,
      },
      { dataSources }
    ) => {
      console.log(logoURL)
      return dataSources.fintechAPI.addNewFintech(
        token,
        username,
        password,
        company_name,
        description,
        min_interest,
        max_interest,
        logoURL
      )
    },
    updateFintechData: async (
      _source,
      {
        token,
        username,
        password,
        company_name,
        description,
        min_interest,
        max_interest,
        logoURL,
      },
      { dataSources }
    ) => {
      return dataSources.fintechAPI.updateFintechData(
        token,
        username,
        password,
        company_name,
        description,
        min_interest,
        max_interest,
        logoURL
      )
    },
  },
}

module.exports = { fintechTypeDef, fintechResolvers }
