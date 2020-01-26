const { gql } = require('apollo-server')
const { RESTDataSource } = require('apollo-datasource-rest')

const userTypeDef = gql`
  extend type Query {
    getUserById(id: ID!): User
    getOTP(phone_number: String!): User
    verifyOTP(OTP: Int!): User
    signInUser(phone_number: String!, pin: Int!): User
  }

  extend type Mutation {
    addNewUser(
      phone_number: Int!,
      pin: Int!
    ): User

    updateUserData(
      id: ID!
      pin: Int
      address: String
      photo_url: String
      id_url: String
      salary_slip_url: String
      current_job: String
      salary: Int
    ): User
  }

  type User {
    id: ID!
    id_number: Int
    name: String
    email: String
    pin: Int
    phone_number: String
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
    getOTP: async (_source, { phone_number }, { dataSources }) => {
      return dataSources.userAPI.getOTP(phone_number)
    },
    verifyOTP: async (_source, { OTP }, { dataSources }) => {
      return dataSources.userAPI.verifyOTP(OTP)
    },
    signInUser: async (_source, { phone_number, pin }, { dataSources }) => {
      return dataSources.userAPI.signInUser(phone_number, pin)
    },
  },
  Mutation: {
    addNewUser: async (_source, { phone_number, pin }, { dataSources }) => {
      return dataSources.userAPI.addNewUser(phone_number, pin)
    },
    updateUserData: async (
      _source,
      {
        id,
        pin,
        address,
        photo_url,
        id_url,
        salary_slip_url,
        current_job,
        salary,
      },
      { dataSources }
    ) => {
      return dataSources.userAPI.updateUserData(
        id,
        pin,
        address,
        photo_url,
        id_url,
        salary_slip_url,
        current_job,
        salary
      )
    },
  },
}

module.exports = { userTypeDef, userResolvers }
