<template class="container">
  <div class="results__container">
    <div v-if="cityData" class="results__city-data">
      <h2 class="title is-2">{{ cityData.name }}</h2>
      <span class="tag is-primary">{{ cityData.country }}</span>
      <span class="tag is-light">{{ timezone }}</span>
      <img :src="cityData.imageSrc" alt="City location">
    </div>
    <ForecastTab :forecast="forecast" />
  </div>
</template>

<script>
import ForecastTab from './ForecastTab.vue'
import { StoreGetters } from '../../helpers/store-helper'

export default {
  name: 'Results',
  components: {
    ForecastTab
  },
  computed: {
    forecast () {
      return this.$store.getters[StoreGetters.FORECAST]
    },
    cityData () {
      return this.$store.getters[StoreGetters.CITY_DATA]
    },
    timezone () {
      const zone = this.cityData.timezone / 3600
      return `${zone > 0 ? '+' : ''}${zone} UTC`
    }
  },
  created () {
    if (!this.cityData) { this.$router.push({ name: 'Search Form' }) }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/custom";

.results {
  &__city-data {
    display: grid;
    grid-template-columns: repeat(2, 5rem) 1fr;
    gap: 1rem;

    .title {
      grid-column: 1 / -1;
      margin-bottom: 0;
    }

    img {
      grid-column: 1 / -1;
      width: 100%;
      max-width: 100%;
      height: auto;
    }
  }
}

</style>
