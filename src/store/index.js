import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import config from '../../config.json'

Vue.use(Vuex)

const apiAddress = config['api-address']
const apiKey = config['api-key']

export default new Vuex.Store({
  state: {
    city: {},
    forecast: []
  },
  mutations: {
    setForecast (state, forecast) {
      state.forecast = forecast
    },
    setCityData (state, cityData) {
      state.city = cityData
    }
  },
  actions: {
    getForecast ({ commit, state }, cityName) {
      axios.get(`${apiAddress}?q=${cityName}&appid=${apiKey}`)
        .then(response => response.data)
        .then(({ city, list }) => {
          commit('setCityData', city)
          commit('setForecast', list)
        })
    }
  },
  modules: {
  }
})
