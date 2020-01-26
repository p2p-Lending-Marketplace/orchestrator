process.env.NODE_ENV === 'development' && require('dotenv').config()

const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
const { userTypeDef, userResolvers } = require('./schemas/user')
const { fintechTypeDef, fintechResolvers } = require('./schemas/fintech')
const {
  applicationTypeDef,
  applicationResolvers,
} = require('./schemas/application')
const { imageTypeDef, imageResolvers } = require('./schemas/imageUpload')
const {
  UserAPI,
  FintechAPI,
  ApplicationAPI,
  AdminAPI,
} = require('./dataSources')

const rootTypeDef = gql`
  type Query
  type Mutation
`

const schema = makeExecutableSchema({
  typeDefs: [
    rootTypeDef,
    userTypeDef,
    fintechTypeDef,
    applicationTypeDef,
    imageTypeDef,
  ],
  resolvers: [
    userResolvers,
    fintechResolvers,
    applicationResolvers,
    imageResolvers,
  ],
})

const server = new ApolloServer({
  schema,
  dataSources: () => ({
    fintechAPI: new FintechAPI(),
    userAPI: new UserAPI(),
    applicationAPI: new ApplicationAPI(),
    adminAPI: new AdminAPI(),
  }),
})

server.listen().then(({ url }) => console.log('listening to', url))
