<template>
  <div class="results__container">
    <div class="results__city-data">{{cityData}}</div>
    <ul class="results__forecast">
      <li v-for="day in forecast" v-bind:key="day">
        {{day}}
      </li>
    </ul>
  </div>
</template>

<script>
import { StoreGetters } from '../helpers/store-helper'

export default {
  name: 'Results',
  computed: {
    forecast () {
      return this.$store.getters[StoreGetters.FORECAST]
    },
    cityData () {
      return this.$store.getters[StoreGetters.CITY_DATA]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
