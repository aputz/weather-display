<template>
  <div>
    <p style="margin: 1rem 0">
      <b-button type="is-text" v-if="!hasPosition" @click="getCoords()" :disabled="isProcessing">Use geolocation data?</b-button>
    </p>
    <b-notification type="is-danger is-light" :active="cantAccessPosition">
      We can't access your location.<br /> Make sure to grant permission to use Geolocation when prompted!
    </b-notification>
    <b-notification :active="!isGeoAvailable">
      Your browser doesn't support Geolocation
    </b-notification>
  </div>
</template>

<script>
import { StoreActions } from '../../helpers/store-helper'
export default {
  name: 'Geolocation',
  data () {
    return {
      hasPosition: false,
      cantAccessPosition: false,
      isProcessing: false
    }
  },
  computed: {
    isGeoAvailable () {
      return navigator && 'geolocation' in navigator
    }
  },
  methods: {
    getCoords () {
      if (this.isGeoAvailable) {
        this.isProcessing = true
        this.$store.dispatch(StoreActions.SET_LOADING, true)
        return navigator.geolocation.getCurrentPosition(({ coords }) => {
          this.hasPosition = true
          this.fetchForecast(coords)
        }, () => {
          this.cantAccessPosition = true
          this.isProcessing = false
          this.$store.dispatch(StoreActions.SET_LOADING, false)
        })
      }
    },
    fetchForecast ({ latitude, longitude }) {
      this.$store.dispatch(StoreActions.GET_FORECAST_BY_COORDS, { lat: latitude, lon: longitude }).then(({ name }) => {
        this.$router.push({ name: 'Results', params: { cityName: name.replace(' ', '').toLowerCase() } })
      }).finally(() => {
        this.isProcessing = false
      })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
