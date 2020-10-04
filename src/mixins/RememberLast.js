import { StoreActions } from '../helpers/store-helper'

export const RememberLast = {
  data () {
    return {
      isStorage: false
    }
  },
  created () {
    this.isStorage = !!localStorage
    const saved = this.getFromStorage()
    if (saved) {
      const { cityId, cityName } = saved
      this.$store.dispatch(StoreActions.GET_FORECAST_BY_ID, cityId)
        .then(() => {
          this.$router.push({ name: 'Results', params: { cityName: cityName.replace(' ', '').toLowerCase() } })
        })
    }
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
    }
  }
}
