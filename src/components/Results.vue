<template class="container">
  <div class="results__container">
    <div v-if="cityData" class="results__city-data">
      <h2 class="title is-2">{{ cityData.name }}</h2>
      <span class="tag is-primary">{{ cityData.country }}</span>
      <span class="tag is-light">{{ timezone }}</span>
    </div>
    <ul class="results__forecast">
      <li v-for="day in forecast" v-bind:key="day">
        <!-- {{day}} -->
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
    },
    timezone () {
      const zone = this.cityData.timezone / 3600
      return `${zone > 0 ? '+' : zone < 0 ? '-' : ''}${zone} UTC`
    }
  },
  created () {
    if (!this.cityData) { this.$router.push({ name: 'Search Form' }) }
  }
}
</script>

<style lang="scss" scoped>
.results {
  &__city-data {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(2rem, 5rem));
    gap: 1rem;

    .title {
      grid-column: 1 / -1;
    }
  }
}
</style>
