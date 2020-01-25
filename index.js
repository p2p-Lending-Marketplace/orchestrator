const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
const { userTypeDef, userResolvers } = require('./schemas/user')
const { fintechTypeDef, fintechResolvers } = require('./schemas/fintech')
const {
  applicationTypeDef,
  applicationResolvers,
} = require('./schemas/application')

const rootTypeDef = gql`
  type Query
  type Mutation
`

const schema = makeExecutableSchema({
  typeDefs: [rootTypeDef, userTypeDef, fintechTypeDef, applicationTypeDef],
  resolvers: [userResolvers, fintechResolvers, applicationResolvers],
})

const server = new ApolloServer({
  schema,
  dataSources: () => ({
    fintechAPI: new FintechAPI(),
    userAPI: new UserAPI(),
    applicationAPI: new ApplicationAPI(),
  }),
})

server.listen().then(({ url }) => console.log('listening to', url))
