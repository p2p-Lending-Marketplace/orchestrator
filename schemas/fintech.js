const { gql } = require('apollo-server')
const { RESTDataSource } = require('apollo-datasource-rest');

const fintechTypeDef = gql`
	type Query {
		getFintech: [Fintech]
	}

	type Mutation {
	  	addNewFintech(company_name: String, description: String, min_interest: Int, max_interest: Int): Fintech
	  	updateFintechRates(id: ID, min_interest: Int, max_interest: Int): Fintech
	}

	type Fintech {
	  	id: ID!
	  	company_name: String
	  	description: String
	  	min_interest: Int
	  	max_interest: Int
	}
`

const resolvers = {
 	Query: {
    	getFintech: async (_source, _args, { dataSources }) => {
    		return dataSources.fintechAPI.getAllFintech();
    	}
  	},
  	Mutation: {
  		addNewFintech: async (_source, _args, { dataSources }) => {
    		return dataSources.fintechAPI.addNewFintech();
    	},
    	updateFintechRates: async (_source, _args, { dataSources }) => {
    		return dataSources.fintechAPI.updateFintechRates();
    	}
  	}
}

class FintechAPI extends RESTDataSource {
  	constructor() {
    	super();
    	this.baseURL = 'http://localhost:3000';									// update baseURL
	}

  	async getAllFintech() {
    	return this.get();
	}

	async addNewFintech(company_name, description, min_interest, max_interest) {
    	return this.post(
    		`/`,
    		{
    			company_name: company_name,
    			description: description,
    			min_interest: min_interest,
    			max_interest: max_interest
    		}
    	);
	}

	async updateFintechRates(id, min_interest, max_interest) {
    	return this.patch(
    		`/${id}/rates`,
    		{
    			min_interest: min_interest,
    			max_interest: max_interest
    		}
    	);
	}
}

module.exports = { fintechTypeDef, FintechAPI }