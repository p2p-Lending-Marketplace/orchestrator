const { RESTDataSource } = require('apollo-datasource-rest')

class UserAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000/user' // update baseURL
  }

  async getAllUsers() {
    return this.get()
  }

  async getUserById(id) {
    return this.get(`/${id}`)
  }

  async getOTP(phone_number) {
    try {
      await this.post(`/otp`, {
        phoneNumber: phone_number,
      })
      return { status: true }
    } catch (error) {
      return { status: false }
    }
  }

  async verifyOTP(token, phone_number) {
    return this.post(`/verify`, {
      phoneNumber: phone_number,
      token
    })
  }

  async addNewUser(phone_number, pin) {
    return this.post(`/`, {
      phone_number: phone_number,
      pin: pin,
    })
  }

  async signInUser(phone_number, pin) {
    const user = await this.post('signin', {phone_number, pin})
    console.log('user: ', user)
    if(user){
      return {
        ...user._doc,
        token: user.token,
        status: true
      }
    } else {
      return {
        status: false
      }
    }
  }

  async updateUserData(data
  ) {
    return this.patch(`/${data.id}`, 
      data,
      {
        headers: {
          "token": data.token
        }
      }
    )
  }
  async checkPhoneNumber(
    phone_number
  ) {
    try {
      await this.post('checkphone', { phone_number })
      return {status: true}
    } catch (error) {
      return {status: false}
    }
  }
}

module.exports = UserAPI
