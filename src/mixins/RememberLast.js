import { StoreActions } from '../helpers/store-helper'

export const RememberLast = {
  created () {
    const saved = this.getFromStorage()
    if (saved) {
      const { cityId, cityName } = saved
      this.$store.dispatch(StoreActions.GET_FORECAST, cityId)
        .then(() => {
          this.$router.push({ name: 'Results', params: { cityName: cityName.replace(' ', '').toLowerCase() } })
        })
    }
  },
  methods: {
    getFromStorage () {
      return localStorage && (localStorage.getItem('cityId') && localStorage.getItem('cityName'))
        ? { cityId: localStorage.getItem('cityId'), cityName: localStorage.getItem('cityName') } : null
    }
  }
}
