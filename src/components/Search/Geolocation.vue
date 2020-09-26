<template>
  <div>
    <p style="margin: 1rem 0">
      <b-button type="is-text" v-if="!position" @click="getCoords()">Use geolocation data?</b-button>
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
export default {
  name: 'Geolocation',
  data () {
    return {
      position: null,
      cantAccessPosition: false
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
        return navigator.geolocation.getCurrentPosition(({ coords }) => {
          this.position = coords
        }, () => {
          this.cantAccessPosition = true
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
