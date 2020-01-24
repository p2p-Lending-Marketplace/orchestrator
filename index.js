const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')

const rootTypeDef = gql`
  type Query
  type Mutation
`

const schema = makeExecutableSchema({ typeDefs: [rootTypeDef], resolvers: [] })

const server = new ApolloServer({ schema })

server.listen().then(({ url }) => console.log('listening to', url))
