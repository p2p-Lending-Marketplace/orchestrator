const { gql } = require('apollo-server')
const { RESTDataSource } = require('apollo-datasource-rest');

const userTypeDef = gql`
	type Query {
		getUserById: User
	}

	type Mutation {
	  	addNewUser(name: String, email: String, phone_number: Int, address: String, photo_url: String, id_url: String, salary_slip_url: String, current_job: String, salary: Integer): User
	  	updateUserPhoneNumber(id: ID, phone_number: Int): User
	  	updateUserPIN(id: ID, pin: Int, update_type: String): User
	  	updateUserPhotoURL(id: ID, photo_url: String, update_type: String): User
	  	updateUserIDURL(id: ID, id_url: String, update_type: String): User
	  	updateUserSalarySlipURL(id: ID, salary_slip_url: String, update_type: String): User
	  	updateUserCurrentJob(id: ID, current_job: String, update_type: String): User
	  	updateUserSalaryURL(id: ID, salary: Int, update_type: String): User
	}

	type User {
	  	id: ID!
	  	id_number: Int
	  	name: String
	  	email: String
	  	pin: Int
	  	phone_number: Int
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
    		return dataSources.userAPI.getUserById(id);
    	}
  	},
  	Mutation: {
  		addNewUser: async (_source, _args, { dataSources }) => {
    		return dataSources.userAPI.addNewUser();
    	},
    	updateUserPhoneNumber: async (_source, _args, { dataSources }) => {
    		return dataSources.userAPI.updateUserData();
    	},
    	updateUserPIN: async (_source, _args, { dataSources }) => {
    		return dataSources.userAPI.updateUserData();
    	},
    	updateUserPhotoURL: async (_source, _args, { dataSources }) => {
    		return dataSources.userAPI.updateUserData();
    	},
    	updateUserSalarySlipURL: async (_source, _args, { dataSources }) => {
    		return dataSources.userAPI.updateUserData();
    	},
    	updateUserCurrentJob: async (_source, _args, { dataSources }) => {
    		return dataSources.userAPI.updateUserData();
    	},
    	updateUserSalaryURL: async (_source, _args, { dataSources }) => {
    		return dataSources.userAPI.updateUserData();
    	}
  	}
}

class UserAPI extends RESTDataSource {
  	constructor() {
    	super();
    	this.baseURL = 'http://localhost:3000';									// update baseURL
	}

  	async getUserById(id) {
    	return this.get(`/${id}`)
	}

	async addNewUser(name, email, phone_number, address, photo_url, id_url, salary_slip_url, current_job, salary) {
    	return this.post(
    		`/`,
    		{
    			name: name,
    			email: email,
    			phone_number: phone_number,
    			address: address,
    			photo_url: photo_url,
    			id_url: id_url,
    			salary_slip_url: salary_slip_url,
    			current_job: current_job,
    			salary: salary
    		}
    	);
	}

	async updateUserData(update_type, data) {
    	return this.patch(
    		`/${id}`,
    		{
    			update_type: data
    		}
    	);
	}
}

module.exports = { userTypeDef, userResolvers, UserAPI }