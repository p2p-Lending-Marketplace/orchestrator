const { RESTDataSource } = require('apollo-datasource-rest')

class UserAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000/user' // update baseURL
  }

  async registerPushNotification(data) {
    // setTimeout(() => {
    //   this.post('sendpush', {
    //     phone_number: data.phone_number,
    //     title: 'Welcome',
    //     sound: 'default',
    //     body: 'welcome to this app!',
    //   })
    // }, 10 * 1000)
    return this.post('registerpush', data)
  }

  async getAllUsers() {
    return this.get()
  }

  async getUserById({ token, id }) {
    if (id) {
      return this.get(`/${id}`, null, {
        headers: {
          token,
        },
      })
    }
    return this.get(`/detail`, null, {
      headers: {
        token,
      },
    })
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
      token,
    })
  }

  async addNewUser(phone_number, pin) {
    return this.post(`/`, {
      phone_number: phone_number,
      pin: pin,
    })
  }

  async signInUser({ phone_number, pin }) {
    const { token } = await this.post('signin', { phone_number, pin })
    if (token) {
      return {
        token,
        status: true,
      }
    } else {
      return {
        status: false,
      }
    }
  }

  async updateUserData(data) {
    console.log(data)
    return this.patch(`/`, data, {
      headers: {
        token: data.token,
      },
    })
  }
  async checkPhoneNumber(phone_number) {
    try {
      await this.post('checkphone', { phone_number })
      return { status: true }
    } catch (error) {
      return { status: false }
    }
  }

  async getUserScoring(token) {
    return this.get('/scoring', null, {
      headers: {
        token,
      },
    })
  }
}

module.exports = UserAPI
