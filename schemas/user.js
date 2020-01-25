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
      name: String
      email: String
      phone_number: String
      pin: Int
      address: String
      photo_url: String
      id_url: String
      salary_slip_url: String
      current_job: String
      salary: Int
    ): User

    updateUserDetail(id: ID!, phone_number: String): User
  }

  type User {
    id: ID!
    id_number: Int
    name: String
    email: String
    phone_number: String
    pin: Int
    address: String
    photo_url: String
    id_url: String
    salary_slip_url: String
    current_job: String
    salary: Int
    update_type: String
    OTP: Int
    OTP_status: Int
  }
`

const userResolvers = {
  Query: {
    getUserById: async (_source, { id }, { dataSources }) => {
      return dataSources.userAPI.getUserById(id)
    },
    getOTP: async (_source, { phone_number }, { dataSources }) => {
      console.log('phone_number => ',phone_number);
      return dataSources.userAPI.getOTP(phone_number)
    },
    verifyOTP: async (_source, { OTP }, { dataSources }) => {
      console.log('token => ',token);
      return dataSources.userAPI.verifyOTP(OTP)
    },
    signInUser: async (_source, { phone_number, pin }, { dataSources }) => {
      return dataSources.userAPI.signInUser(phone_number, pin)
    },
    updateUserDetail: async (_source, { update_type,  }, { dataSources }) => {
      return dataSources.userAPI.updateUserDetail(phone_number, pin)
    }
  },
  Mutation: {
    addNewUser: async (_source, { name, email, phone_number, pin, address, photo_url, id_url, salary_slip_url, current_job, salary }, { dataSources }) => {
      return dataSources.userAPI.addNewUser(name, email, phone_number, pin, address, photo_url, id_url, salary_slip_url, current_job, salary)
    },
    updateUserPhoneNumber: async (_source, _args, { dataSources }) => {
      return dataSources.userAPI.updateUserData()
    }
  },
}

module.exports = { userTypeDef, userResolvers }
