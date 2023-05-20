/* eslint-disable no-return-await */
import axios from 'axios'

class Api {
  constructor(path) {
    this.path = path
  }

  signUp(email, password, name) {
    const res = axios.post(
      `${this.path}/api/register`,
      {
        email,
        password,
        name,
      },
    )
    return res
  }

  signIn(email, password) {
    console.log(email, password)
    const res = axios.post(`${this.path}/api/login`, {
      email,
      password,
    })
    return res
  }

  logout(token) {
    const res = axios(`${this.path}/api/logout`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return res
  }

  setFiles(formData, token) {
    const res = axios.post(`${this.path}/api/media/upload`, formData, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    return res
  }

  getAllFiles(token) {
    const res = axios.get(`${this.path}/api/media`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return res
  }

  // getAllFile(token, id) {
  //   const res = axios(`${this.path}/api/media/${id}`, {
  //     method: 'GET',
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //       'Content-Type': 'applicatin/json',
  //     },
  //   })
  //     .then((resI) => resI).then((data) => data.data).catch((error) => error)
  //   console.log(res.data)
  //   return res.data
  // }

  deleteFile(token, id) {
    const res = axios.delete(`${this.path}/api/media/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'applicatin/json',
      },
    })
    return res
  }

  getFiles(token, id) {
    return axios.get(`${this.path}/api/media/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'applicatin/json',
      },
    }).then((data) => data.data)
  }
}

const api = new Api('https://job.kitactive.ru')

export {
  api,
}
