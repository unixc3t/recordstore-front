import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import Signup from '@/components/Signup'
import { expect } from 'chai'
Vue.config.ignoredElements = ['router-link']
describe('Signup.vue', () => {
  it('input email of the  Singup', () => {
    const wrapper = shallowMount(Signup)
    expect(wrapper.find('#email').exists()).to.be.true
  })
  it('input email of the  Singup', () => {
    const wrapper = shallowMount(Signup)
    expect(wrapper.find('#password').exists()).to.be.true
  })
  it('input email of the  Singup', () => {
    const wrapper = shallowMount(Signup)
    expect(wrapper.find('#password_confirmation').exists()).to.be.true
  })
})
