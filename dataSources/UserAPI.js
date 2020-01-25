const { RESTDataSource } = require('apollo-datasource-rest')

class UserAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000/user' // update baseURL
  }

  async getUserById(id) {
    console.log('id => ',id);
    return this.get(`/${id}`)
  }

  async addNewUser(
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
  ) {
    return this.post(`/`, {
      name: name,
      email: email,
      phone_number: phone_number,
      pin: pin,
      address: address,
      photo_url: photo_url,
      id_url: id_url,
      salary_slip_url: salary_slip_url,
      current_job: current_job,
      salary: salary,
    })
  }

  async getOTP(phone_number) {
    return this.post(`/otp`, {
      phoneNumber: phone_number,
    })
  }

  async verifyOTP(OTP) {
    return this.post(`/verify`, {
      token: OTP
    })
  }

  async signInUser(phone_number, pin) {
    return this.post(`/signin`, {
      phone_number: phone_number,
      pin: pin
    })
  }

  async updateUserData(id, pin, address, photo_url, id_url, salary_slip_url, current_job, salary) {
    return this.patch(`/${id}`, {
      pin: pin,
      address: address,
      photo_url: photo_url,
      id_url: id_url,
      salary_slip_url: salary_slip_url,
      current_job: current_job,
      salary: salary
    })
  }
}

module.exports = UserAPI
