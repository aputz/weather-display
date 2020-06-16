<template class="container">
  <div class="results__container">
    <div v-if="cityData" class="results__city-data">
      <h2 class="title is-2">{{ cityData.name }}</h2>
      <span class="tag is-primary">{{ cityData.country }}</span>
      <span class="tag is-light">{{ timezone }}</span>
      <div class="image-container">
        <img :src="cityData.imageSrc" alt="City location" class="map">
        <img src="../../assets/pointer.png" alt="" class="pointer">
      </div>
    </div>
    <b-tabs class="tabs-container">
      <b-tab-item v-for="(data, key) in forecastData" v-bind:key="key" :label="getFormattedDate(key)">
        <ForecastTab :forecast="data.forecast" />
      </b-tab-item>
    </b-tabs>
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
    forecastData () {
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
  methods: {
    getFormattedDate (date) {
      return Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(date))
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
  &__container {
    display: block;
  }

  &__city-data {
    display: grid;
    grid-template-columns: repeat(2, 5rem) 1fr;
    gap: 1rem;

    .title {
      grid-column: 1 / -1;
      margin-bottom: 0;
    }

    .image-container {
      grid-column: 1 / -1;
      position: relative;
      overflow: hidden;
      min-height: 400px;

      .map {
        max-width: unset;
        width: unset;
        height: auto;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }

      .pointer {
        position: absolute;
        width: 25px;
        height: 32px;
        top: calc(50% - 32px);
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}

.tabs-container {
  margin-top: 2rem;
}

</style>
