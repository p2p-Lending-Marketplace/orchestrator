const { RESTDataSource } = require('apollo-datasource-rest')

class UserAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000' // update baseURL
  }

  async getUserById(id) {
    return this.get(`/${id}`)
  }

  async getOTP(phone_number) {
    return this.post(`/otp`, {
      phoneNumber: phone_number,
    })
  }

  async addNewUser(
    name,
    email,
    phone_number,
    address,
    photo_url,
    id_url,
    salary_slip_url,
    current_job,
    salary
  ) {
    return this.post(`/`, {
      name: name,
      email: email,
      phone_number: phone_number,
      address: address,
      photo_url: photo_url,
      id_url: id_url,
      salary_slip_url: salary_slip_url,
      current_job: current_job,
      salary: salary,
    })
  }

  async updateUserData(
    id,
    pin,
    address,
    photo_url,
    id_url,
    salary_slip_url,
    current_job,
    salary
  ) {
    return this.patch(`/${id}`, {
      id,
      pin,
      address,
      photo_url,
      id_url,
      salary_slip_url,
      current_job,
      salary,
    })
  }
}

module.exports = UserAPI
