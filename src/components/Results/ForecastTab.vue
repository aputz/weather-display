<template>
  <ul v-if="forecast" class="forecast-tab">
    <li v-for="(item, index) in forecast" v-bind:key="index" class="forecast-tab__item">
      <span class="hour">{{ hourFormat(item.dt_txt) }}</span>
      <img :src="createIconUrl(item.weather[0].icon)" class="description-icon" alt="" />
      <span class="description">{{ item.weather[0].description }}</span>
      <div class="info">
        <span class="temp-header">Temperature</span>
        <span class="temp-value">{{ parseInt(item.main.temp) }}&VeryThinSpace;&deg;C</span>
        <span class="hum-header">Humidity</span>
        <span class="hum-value">{{ item.main.humidity }}&VeryThinSpace;%</span>
        <span class="clouds-header">Clouds</span>
        <span class="clouds-value">{{ item.clouds.all }}&VeryThinSpace;%</span>
        <span class="wind-header">Wind</span>
        <span class="wind-value">
          <b-icon icon="arrow-up" size="is-small" :style="`transform: rotate(${item.wind.deg}deg)`"></b-icon>
          {{ item.wind.speed }}&VeryThinSpace;m/s
        </span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ForecastTab',
  props: {
    forecast: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    hourFormat (date) {
      return Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(new Date(date))
    },
    createIconUrl (iconCode) {
      return `http://openweathermap.org/img/wn/${iconCode}@2x.png`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/custom";

  .forecast-tab {
    padding: 0;

    &__item {
      padding: 0 0 1rem;
      border-bottom: solid 1px transparentize($primary, 0.8);
      display: grid;
      gap: 0 0.5rem;
      grid-template-rows: repeat(3, auto);
      grid-template-columns: repeat(2, auto) 1fr;
      grid-template-areas:
        'hour icon description'
        'hour icon description'
        'info info info';

      &:last-child {
        border-bottom: unset;
      }

      @media (min-width: 85rem) {
        grid-template-rows: repeat(2, auto);
        grid-template-columns: repeat(2, auto) 1fr auto;
        grid-template-areas:
          'hour icon description info'
          'hour icon description info';
      }
    }
  }

  .date, .hour, .temp-header, .hum-header, .clouds-header, .wind-header {
    color: $primary;
    text-transform: uppercase;
  }

  .hour {
    grid-area: hour;
    align-self: center;
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

  .info {
    grid-area: info;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 2rem;

    span:nth-child(even) {
      text-align: right;
    }

    @media(min-width: 48rem) {
      grid-template: repeat(2, auto) / repeat(4, 1fr);
      grid-auto-flow: column;

      span {
        text-align: left;

        &:nth-child(even) {
          text-align: left;
        }
      }
    }

    @media (min-width: 85rem) {
      grid-template-columns: repeat(4, minmax(8rem, max-content));

      span {
        text-align: left;

        &:nth-child(odd) {
          align-self: end;
        }

        &:nth-child(even) {
          text-align: left;
        }
      }
    }
  }
</style>
