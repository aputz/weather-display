<template class="container">
  <div class="results__container">
    <div v-if="cityData" class="results__city-data">
      <h2 class="title is-2">{{ cityData.name }}</h2>
      <span class="tag is-primary">{{ cityData.country }}</span>
      <span class="tag is-light">{{ timezone }}</span>
      <div class="image-container">
        <img :src="cityData.imageSrc" alt="City location">
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

const groupTabs = (content) => {
  return content.reduce((tabbed, current) => {
    // eslint-disable-next-line camelcase
    const { dt_txt } = current
    const date = dt_txt.slice(0, 10)
    if (Object.prototype.hasOwnProperty.call(tabbed, date)) {
      tabbed[date].forecast.push(current)
    } else {
      tabbed = Object.assign(tabbed, { [date]: { date, forecast: [current] } })
    }
    return tabbed
  }, {})
}

export default {
  name: 'Results',
  components: {
    ForecastTab
  },
  computed: {
    forecastData () {
      const forecast = this.$store.getters[StoreGetters.FORECAST]
      return forecast.length ? groupTabs(forecast) : forecast
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

      img {
        max-width: unset;
        width: unset;
        height: auto;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}

.tabs-container {
  margin-top: 2rem;
}

</style>
