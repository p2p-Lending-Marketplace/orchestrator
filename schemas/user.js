const { gql } = require('apollo-server')
const { RESTDataSource } = require('apollo-datasource-rest')

const userTypeDef = gql`
  extend type Query {
    getUserById(id: ID!): User
    getOTP(phone_number: String!): User
    signInUser($phone_number: String!, $pin: Int!): User
  }

  extend type Mutation {
    addNewUser(
      name: String
      email: String
      phone_number: Int
      pin: Int
      address: String
      photo_url: String
      id_url: String
      salary_slip_url: String
      current_job: String
      salary: Int
    ): User
    updateUserPhoneNumber(id: ID, phone_number: Int): User
    updateUserPIN(id: ID, pin: Int, update_type: String): User
    updateUserPhotoURL(id: ID, photo_url: String, update_type: String): User
    updateUserIDURL(id: ID, id_url: String, update_type: String): User
    updateUserSalarySlipURL(
      id: ID
      salary_slip_url: String
      update_type: String
    ): User
    updateUserCurrentJob(id: ID, current_job: String, update_type: String): User
    updateUserSalaryURL(id: ID, salary: Int, update_type: String): User
  }

  type User {
    id: ID!
    id_number: Int
    name: String
    email: String
    pin: Int
    phone_number: Int
    address: String
    photo_url: String
    id_url: String
    salary_slip_url: String
    current_job: String
    salary: Int
    update_type: String
  }
`

const userResolvers = {
  Query: {
    getUserById: async (_source, { id }, { dataSources }) => {
      return dataSources.userAPI.getUserById(id)
    },
  },
  Mutation: {
    addNewUser: async (_source, _args, { dataSources }) => {
      return dataSources.userAPI.addNewUser()
    },
    updateUserPhoneNumber: async (_source, _args, { dataSources }) => {
      return dataSources.userAPI.updateUserData()
    },
    updateUserPIN: async (_source, _args, { dataSources }) => {
      return dataSources.userAPI.updateUserData()
    },
    updateUserPhotoURL: async (_source, _args, { dataSources }) => {
      return dataSources.userAPI.updateUserData()
    },
    updateUserSalarySlipURL: async (_source, _args, { dataSources }) => {
      return dataSources.userAPI.updateUserData()
    },
    updateUserCurrentJob: async (_source, _args, { dataSources }) => {
      return dataSources.userAPI.updateUserData()
    },
    updateUserSalaryURL: async (_source, _args, { dataSources }) => {
      return dataSources.userAPI.updateUserData()
    },
  },
}

module.exports = { userTypeDef, userResolvers }
