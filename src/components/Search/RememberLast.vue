<template>
  <b-button outlined v-if="saved" @click="getForecast()" style="margin-right: 0.5rem">Load forecast for {{saved.cityName}}</b-button>
</template>

<script>
import { StoreActions } from '../../helpers/store-helper'

export default {
  name: 'RememberLast',
  data () {
    return {
      isStorage: false,
      saved: null
    }
  },
  props: {
    toSave: {
      type: Object,
      default: null
    }
  },
  created () {
    this.isStorage = !!localStorage
    this.saved = this.getFromStorage()
  },
  methods: {
    getFromStorage () {
      return this.isStorage && (localStorage.getItem('cityId') && localStorage.getItem('cityName'))
        ? { cityId: localStorage.getItem('cityId'), cityName: localStorage.getItem('cityName') } : null
    },
    saveToStorage (cityId, cityName) {
      if (this.isStorage) {
        localStorage.setItem('cityId', cityId)
        localStorage.setItem('cityName', cityName)
      }
    },
    getForecast () {
      const { cityId, cityName } = this.saved
      this.$store.dispatch(StoreActions.GET_FORECAST_BY_ID, cityId).then(() => {
        this.$router.push({ name: 'Results', params: { cityName: cityName.replace(' ', '').toLowerCase() } })
      })
    }
  },
  watch: {
    toSave (newValue, oldValue) {
      if (newValue) {
        const { id, name } = newValue
        this.saveToStorage(id, name)
      }
    }
  }
}
</script>
