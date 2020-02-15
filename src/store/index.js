import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import config from '../../config.json'
import { StoreActions, StoreMutations } from '../helpers/store-helper'

Vue.use(Vuex)

const apiAddress = config['api-address']
const apiKey = config['api-key']

export default new Vuex.Store({
  state: {
    city: {},
    forecast: []
  },
  mutations: {
    [StoreMutations.SET_FORECAST] (state, forecast) {
      state.forecast = forecast
    },
    [StoreMutations.SET_CITY_DATA] (state, cityData) {
      state.city = cityData
    }
  },
  actions: {
    [StoreActions.GET_FORECAST] ({ commit, state }, cityName) {
      axios.get(`${apiAddress}?q=${cityName}&appid=${apiKey}`)
        .then(response => response.data)
        .then(({ city, list }) => {
          commit(StoreMutations.SET_CITY_DATA, city)
          commit(StoreMutations.SET_FORECAST, list)
        })
    }
  }
})
