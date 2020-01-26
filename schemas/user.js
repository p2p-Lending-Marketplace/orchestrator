const { gql } = require('apollo-server')
const { RESTDataSource } = require('apollo-datasource-rest')

const userTypeDef = gql`
  extend type Query {
    getAllUsers: [User]
    getUserById(id: ID!): User
    getOTP(phone_number: String!): User
    verifyOTP(token: String!, phone_number: String!): User
    signInUser(phone_number: String!, pin: String!): User
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
    timeRemaining: Int
    status: Boolean
  }
`
const userResolvers = {
  Query: {
    getAllUsers: async (_source, _args, { dataSources }) => {
      return dataSources.userAPI.getAllUsers()
    },
    getUserById: async (_source, { id }, { dataSources }) => {
      return dataSources.userAPI.getUserById(id)
    },
    getOTP: async (_source, { phone_number }, { dataSources }) => {
      return dataSources.userAPI.getOTP(phone_number)
    },
    verifyOTP: async (_source, { token, phone_number }, { dataSources }) => {
      return dataSources.userAPI.verifyOTP(token, phone_number)
    },
    signInUser: async (_source, { phone_number, pin }, { dataSources }) => {
      console.log("Helooooooooooooooooooooooooooooooo")
      console.log(pin, phone_number)
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
        name,
        email,
        phone_number,
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
        name,
        email,
        phone_number,
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
