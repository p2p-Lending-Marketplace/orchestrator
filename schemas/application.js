const { gql } = require('apollo-server')
const { RESTDataSource } = require('apollo-datasource-rest');

const applicationTypeDef = gql`
	type Query {
		getAllUserApplication: [Application]
	}

	type Mutation {
	  	addNewApplication(userID: String, fintechID: String, amount: Number, loan_term: Int, objective: String): Application
	  	updateApplicationDecision(id: ID, decision: String): Application
	}

	type Application {
	  	id: ID!
	  	userID: String
	  	fintechID: String
	  	amount: Number
	  	loan_term: Number
	  	objective: String
	  	decision: String
	}
`

const applicationResolvers = {
 	Query: {
    	getAllUserApplication: async (_source, { id }, { dataSources }) => {
    		return dataSources.applicationAPI.getAllUserApplication(id);
    	}
  	},
  	Mutation: {
  		addNewApplication: async (_source, _args, { dataSources }) => {
    		return dataSources.applicationAPI.addNewApplication();
    	},
    	updateApplicationDecision: async (_source, _args, { dataSources }) => {
    		return dataSources.applicationAPI.updateApplicationDecision();
    	}
  	}
}

class ApplicationAPI extends RESTDataSource {
  	constructor() {
    	super();
    	this.baseURL = 'http://localhost:3000';									// update baseURL
	}

  	async getAllUserApplication(id) {
    	return this.get(`/${id}`)
	}

	async addNewApplication(userID, fintechID, amount, loan_term, objective) {
    	return this.post(
    		`/`,
    		{
    			userID: userID,
    			fintechID: fintechID,
    			amount: amount,
    			loan_term: loan_term,
    			objective: objective
    		}
    	);
	}

	async updateApplicationDecision(id, decision) {
    	return this.patch(
    		`/${id}`,
    		{
    			id: id,
    			decision: decision
    		}
    	);
	}
}

module.exports = { applicationTypeDef, applicationResolvers, ApplicationAPI }