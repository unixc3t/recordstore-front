import MockAdapter from 'axios-mock-adapter'
import { securedAxiosInstance } from '@/backend/axios/'
import { expect } from 'chai'

const API_URL = 'http://localhost:3000'
describe('securedAxiosInstance', () => {
  describe('should', () => {
    before(function () {
      const axiosMock = new MockAdapter(securedAxiosInstance)
      axiosMock.onGet('https://api.com').reply(config => {
        return [200, { requestHeaders: [{ id: 1, desc: 'anything' }] }]
      })

      axiosMock.onPost('https://api.com').reply(config => {
        return [200, { requestHeaders: [{ id: 1, desc: 'anything' }] }]
      })
    })

    after(function () {
      window.localStorage.clear()
    })
    it('contain default API_URL when get', done => {
      securedAxiosInstance
        .get('https://api.com')
        .then(response => {
          expect(securedAxiosInstance.defaults.baseURL).to.equal(API_URL)
          done()
        })
        .catch(error => {
          console.log(error)
        })
    })
    it('contain default Content-Type when get', done => {
      securedAxiosInstance
        .get('https://api.com')
        .then(response => {
          expect(
            securedAxiosInstance.defaults.headers['Content-Type']
          ).to.equal('application/json')
          done()
        })
        .catch(error => {
          console.log(error)
        })
    })

    it('contain with credentials', done => {
      securedAxiosInstance
        .get('https://api.com')
        .then(response => {
          expect(securedAxiosInstance.defaults.withCredentials).to.equal(true)
          done()
        })
        .catch(error => {
          console.log(error)
        })
    })

    it('contain csrf when post', done => {
      window.localStorage.csrf = 'default'
      securedAxiosInstance
        .post('https://api.com')
        .then(response => {
          expect(response.config.headers['X-CSRF-TOKEN']).to.equal('default')
          done()
        })
        .catch(error => {
          console.log(error)
        })
    })
  })
})
