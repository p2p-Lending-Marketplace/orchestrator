const { gql } = require('apollo-server')

const adminTypeDef = gql`
  # extend type Query {
  #   loginAdmin(username: String!, password: String!): Admin
  # }

  extend type Mutation {
    loginAdmin(username: String!, password: String!): Admin
  }

  type Admin {
    _id: ID!
    username: String!
    role: String
    fintech_id: String
    token: String
  }
`

const adminResolvers = {
  // Query: {
  //   loginAdmin: async (_, args, { dataSources }) => {
  //     return dataSources.adminAPI.loginAdmin(args)
  //   },
  // },
  Mutation: {
    loginAdmin: async (_source, { username, password }, { dataSources }) => {
      return dataSources.adminAPI.loginAdmin(username, password)
    },
  },
}

module.exports = { adminTypeDef, adminResolvers }
