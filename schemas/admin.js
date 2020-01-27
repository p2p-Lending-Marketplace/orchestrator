const { gql } = require('apollo-server')

const adminTypeDef = gql`
  extend type Query {
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
  Query: {
    loginAdmin: async (_, args, { dataSources }) => {
      return dataSources.adminAPI.loginAdmin(args)
    },
  },
}

module.exports = { adminTypeDef, adminResolvers }
