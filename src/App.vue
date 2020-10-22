<template>
  <div id="app" :class="['app__container', ...classes]">
    <Preloader />
    <Navbar :appName="appName" />
    <router-view/>
  </div>
</template>

<style lang="scss" scopped>
@import "assets/custom";
@import "~bulma";
@import "~buefy/src/scss/buefy";

.app {
  &__container {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-image: url('assets/bg.jpg');
    background-color: $primary;
    background-size: cover;
    background-blend-mode: soft-light;
    background-attachment: fixed;
  }
}

.filter {
  transition: background-color 0.25s;

  &.night {
    background-color: $dark;

    &.rain {
      background-color: desaturate($dark, 50%);
    }

    &.cloud, &.snow {
      background-color: desaturate($dark, 75%);
    }
  }

  &.rain {
    background-color: desaturate($primary, 50%);
  }

  &.cloud, &.snow {
    background-color: desaturate($primary, 75%);
  }
}
</style>

<script>
import Navbar from './components/Navbar.vue'
import Preloader from './components/Preloader.vue'
import { StoreActions, StoreGetters } from './helpers/store-helper'

export default {
  data () {
    return {
      appName: 'Weather display',
      classes: []
    }
  },
  computed: {
    weatherDesc () {
      return this.$store.getters[StoreGetters.WEATHER_DESC]
    }
  },
  components: {
    Navbar,
    Preloader
  },
  watch: {
    '$route' (newValue, oldValue) {
      document.title = newValue.meta.title || 'Weather display'
    },
    'weatherDesc' (newValue, oldValue) {
      if (newValue !== null) {
        this.classes = []
        this.classes.push('filter')
        if (newValue.isNight) this.classes.push('night')
        switch (newValue.currentWeather) {
          case 'Rain':
            this.classes.push('rain')
            break
          case 'Clouds':
            this.classes.push('cloud')
            break
          case 'Snow':
            this.classes.push('snow')
            break
        }
      }
    }
  },
  created () {
    document.title = 'Weather display'
    this.$store.dispatch(StoreActions.GET_LOADING, false)
  }
}
</script>
