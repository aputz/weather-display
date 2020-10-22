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
    suggestions: [],
    isLoading: true,
    isFetchingData: false
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
    },
    [StoreMutations.SET_LOADING] (state, isLoading) {
      setTimeout(() => {
        state.isLoading = isLoading
      }, isLoading ? 0 : 1000)
    },
    [StoreMutations.SET_FETCHING_DATA] (state, isFetchingData) {
      state.isFetchingData = isFetchingData
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
    },
    [StoreGetters.ISLOADING] (state) {
      return state.isLoading
    },
    [StoreGetters.IS_FETCHING_DATA] (state) {
      return state.isFetchingData
    }
  },
  actions: {
    [StoreActions.GET_FORECAST_BY_ID] ({ commit }, id) {
      if (this.state.isFetchingData) return null
      const url = `/api/forecast/${id}`
      commit(StoreMutations.SET_LOADING, true)
      commit(StoreMutations.SET_FETCHING_DATA, true)

      return axios.get(url)
        .then(response => response.data.result)
        .then(({ city, list }) => {
          commit(StoreMutations.SET_CITY_DATA, city)
          commit(StoreMutations.SET_FORECAST, list)
        })
        .finally(() => {
          commit(StoreMutations.SET_LOADING, false)
          commit(StoreMutations.SET_FETCHING_DATA, false)
        })
    },
    [StoreActions.GET_FORECAST_BY_NAME] ({ commit }, name) {
      if (this.state.isFetchingData) return null
      const url = '/api/forecast/name'
      commit(StoreMutations.SET_LOADING, true)
      commit(StoreMutations.SET_FETCHING_DATA, true)

      return axios.get(url, { params: { name } })
        .then(response => response.data.result)
        .then(({ city, list }) => {
          commit(StoreMutations.SET_CITY_DATA, city)
          commit(StoreMutations.SET_FORECAST, list)
        })
        .finally(() => {
          commit(StoreMutations.SET_LOADING, false)
          commit(StoreMutations.SET_FETCHING_DATA, false)
        })
    },
    [StoreActions.GET_FORECAST_BY_COORDS] ({ commit }, { lat, lon }) {
      const url = '/api/forecast'
      commit(StoreMutations.SET_LOADING, true)

      return axios.get(url, { params: { lat, lon } })
        .then(response => response.data.result)
        .then(({ city, list }) => {
          commit(StoreMutations.SET_CITY_DATA, city)
          commit(StoreMutations.SET_FORECAST, list)
          return city
        })
        .finally(() => {
          commit(StoreMutations.SET_LOADING, false)
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
    },
    [StoreActions.GET_LOADING] ({ commit }, isLoading) {
      commit(StoreMutations.SET_LOADING, isLoading)
    }
  }
})
