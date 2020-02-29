<template class="container">
  <div class="results__container">
    <div v-if="cityData" class="results__city-data">
      <h2 class="title is-2">{{ cityData.name }} <b-icon icon="weather-sunny" size="is-small" type="is-light">
            </b-icon></h2>
      <span class="tag is-primary">{{ cityData.country }}</span>
      <span class="tag is-light">{{ timezone }}</span>
    </div>
    <ul class="results__forecast">
      <li v-for="(item, index) in forecast" v-bind:key="index" class="results__forecast-item">
        <span class="hour">{{ hourFormat(item.dt_txt) }}</span>
        <span class="date">{{ dateFormat(item.dt_txt) }}</span>
        <img :src="createIconUrl(item.weather[0].icon)" class="description-icon" alt="" />
        <span class="description">{{ item.weather[0].description }}</span>
        <span class="temp-header">Temperature</span>
        <span class="temp-value">{{ item.main.temp }}</span>
        <span class="hum-header">Humidity</span>
        <span class="hum-value">{{ item.main.humidity }}</span>
        <span class="clouds-header">Clouds</span>
        <span class="clouds-value">{{ item.clouds.all }}</span>
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
  methods: {
    dateFormat (date) {
      return Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(date))
    },
    hourFormat (date) {
      return Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(new Date(date))
    },
    createIconUrl (iconCode) {
      return `http://openweathermap.org/img/wn/${iconCode}@2x.png`
    }
  },
  created () {
    if (!this.cityData) { this.$router.push({ name: 'Search Form' }) }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/custom";

.results {
  &__city-data {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(2rem, 5rem));
    gap: 1rem;

    .title {
      grid-column: 1 / -1;
    }
  }

  &__forecast {
    padding: 2rem 0;
  }

  &__forecast-item {
    padding: 1rem 0;
    border-bottom: solid 1px transparentize($primary, 0.8);
    display: grid;
    gap: 0 0.5rem;
    grid-template-rows: repeat(2, auto);
    grid-template-columns: repeat(2, auto) 1fr repeat(3, minmax(5rem, max-content));
    grid-template-areas:
      'hour icon description temperature-header humidity-header clouds-header'
      'date icon description temperature-value humidity-value clouds-value';

    &:last-child {
      border-bottom: unset;
    }
  }
}

.date, .hour, .temp-header, .hum-header, .clouds-header {
  color: $primary;
  text-transform: uppercase;
}

.hour {
  grid-area: hour;
  align-self: end;
}

.date {
  grid-area: date;
}

.description {
  display: inline-block;
  text-transform: capitalize;
  grid-area: description;
  align-self: center;
}

.description-icon {
  height: 100%;
  width: auto;
  max-height: 5rem;
  grid-area: icon;
}

.temp-header {
  grid-area: temperature-header;
}

.temp-value {
  grid-area: temperature-value;
}

.hum-header {
  grid-area: humidity-header;
}

.hum-value {
  grid-area: humidity-value;
}

.clouds-header {
  grid-area: clouds-header;
}

.clouds-value {
  grid-area: clouds-value;
}
</style>
