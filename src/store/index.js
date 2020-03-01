import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import config from '../../config.json'
import { StoreActions, StoreMutations, StoreGetters } from '../helpers/store-helper'

Vue.use(Vuex)

const apiAddress = config['api-address']
const apiKey = config['api-key']

export default new Vuex.Store({
  state: {
    city: null,
    forecast: []
  },
  mutations: {
    [StoreMutations.SET_FORECAST] (state, forecast) {
      state.forecast = [...forecast]
    },
    [StoreMutations.SET_CITY_DATA] (state, cityData) {
      state.city = cityData
    }
  },
  getters: {
    [StoreGetters.FORECAST] (state) {
      return state.forecast
    },
    [StoreGetters.CITY_DATA] (state) {
      return state.city
    }
  },
  actions: {
    [StoreActions.GET_FORECAST] ({ commit }, cityName) {
      const params = {
        appid: apiKey,
        q: cityName,
        units: 'metric'
      }
      return axios.get(apiAddress, { params })
        .then(response => response.data)
        .then(({ city, list }) => {
          commit(StoreMutations.SET_CITY_DATA, city)
          commit(StoreMutations.SET_FORECAST, list)
        })
    }
  }
})
