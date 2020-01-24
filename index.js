const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
import { fintechTypeDef, fintechResolvers, FintechAPI } from './schemas/fintech'
import { UserAPI } from './schemas/user'
import { ApplicationAPI } from './schemas/application'

const rootTypeDef = gql`
  type Query
  type Mutation
`

const schema = makeExecutableSchema({ typeDefs: [rootTypeDef], resolvers: [fintechResolvers] })

const server = new ApolloServer({
	schema,
	dataSources: () => ({
	    fintechAPI: new FintechAPI(),
	    userAPI: new UserAPI(),
	    applicationAPI: new ApplicationAPI()
	}),
})

server.listen().then(({ url }) => console.log('listening to', url))
