import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { ToastProgrammatic as toast } from 'buefy'

import { StoreActions, StoreMutations, StoreGetters } from '../helpers/store-helper'
import { handleError } from '../shared/handleError'

const displayErrorToast = (message) => {
  toast.open({ message, type: 'is-danger' })
}

axios.interceptors.response.use(
  response => response,
  error => handleError(error, displayErrorToast)
)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: null,
    forecast: null,
    suggestions: []
  },
  mutations: {
    [StoreMutations.SET_FORECAST] (state, forecast) {
      state.forecast = forecast
    },
    [StoreMutations.SET_CITY_DATA] (state, cityData) {
      state.city = cityData
    },
    [StoreMutations.SET_SUGGESTIONS] (state, suggestions) {
      state.suggestions = suggestions
    }
  },
  getters: {
    [StoreGetters.FORECAST] (state) {
      return state.forecast
    },
    [StoreGetters.CITY_DATA] (state) {
      return state.city
    },
    [StoreGetters.SUGGESTIONS] (state) {
      return state.suggestions
    }
  },
  actions: {
    [StoreActions.GET_FORECAST] ({ commit }, id) {
      const url = `/api/forecast/${id}`

      return axios.get(url)
        .then(response => response.data.result)
        .then(({ city, list }) => {
          commit(StoreMutations.SET_CITY_DATA, city)
          commit(StoreMutations.SET_FORECAST, list)
        })
    },
    [StoreActions.GET_SUGGESTIONS] ({ commit }, fragment) {
      const url = `/api/search/${fragment}`
      commit(StoreMutations.SET_SUGGESTIONS, [])
      return axios.get(url)
        .then(response => response.data.result)
        .then(response => {
          commit(StoreMutations.SET_SUGGESTIONS, response)
        })
    }
  }
})
