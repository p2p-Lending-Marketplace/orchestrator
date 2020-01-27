const { gql } = require('apollo-server')

const userTypeDef = gql`
  extend type Query {
    getAllUsers: [User]
    getUserById(token: String!): User
    getOTP(phone_number: String!): User
    verifyOTP(token: String!, phone_number: String!): User
    signInUser(phone_number: String!, pin: String!): User
    checkPhoneNumber(phone_number: String!): User
  }

  extend type Mutation {
    addNewUser(phone_number: String!, pin: String!): User

    updateUserData(
      id: ID!
      name: String
      email: String
      phone_number: String
      pin: String
      address: String
      photo_url: String
      id_url: String
      salary_slip_url: String
      current_job: String
      salary: Int
      num_id: String
      date_of_birth: String
      place_of_birth: String
      token: String
    ): User

    registerPushNotification(token: String!, phone_number: String!): User
  }

  type User {
    _id: ID
    token: String
    num_id: String
    name: String
    email: String
    pin: String
    phone_number: String
    address: String
    photo_url: String
    id_url: String
    salary_slip_url: String
    current_job: String
    salary: Int
    update_type: String
    date_of_birth: String
    place_of_birth: String
    data_completed: Boolean
    status: Boolean
  }
`
const userResolvers = {
  Query: {
    getAllUsers: async (_source, _args, { dataSources }) => {
      return dataSources.userAPI.getAllUsers()
    },
    getUserById: async (_source, { token }, { dataSources }) => {
      return dataSources.userAPI.getUserById(token)
    },
    getOTP: async (_source, { phone_number }, { dataSources }) => {
      return dataSources.userAPI.getOTP(phone_number)
    },
    verifyOTP: async (_source, { token, phone_number }, { dataSources }) => {
      return dataSources.userAPI.verifyOTP(token, phone_number)
    },
    signInUser: async (
      _source,
      { phone_number, pin },
      { req, dataSources }
    ) => {
      return dataSources.userAPI.signInUser(phone_number, pin)
    },
    checkPhoneNumber: async (_source, { phone_number }, { dataSources }) => {
      return dataSources.userAPI.checkPhoneNumber(phone_number)
    },
  },
  Mutation: {
    addNewUser: async (_source, { phone_number, pin }, { dataSources }) => {
      return dataSources.userAPI.addNewUser(phone_number, pin)
    },
    updateUserData: async (_source, data, { dataSources }) => {
      return dataSources.userAPI.updateUserData(data)
    },
    registerPushNotification: async (_, args, { dataSources }) => {
      return dataSources.userAPI.registerPushNotification(args)
    },
  },
}

module.exports = { userTypeDef, userResolvers }
