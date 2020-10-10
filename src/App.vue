<template>
  <div id="app" class="app__container">
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
</style>

<script>
import Navbar from './components/Navbar.vue'
import Preloader from './components/Preloader.vue'
import { StoreActions } from './helpers/store-helper'

export default {
  data () {
    return {
      appName: 'Weather display'
    }
  },
  components: {
    Navbar,
    Preloader
  },
  watch: {
    '$route' (newValue, oldValue) {
      document.title = newValue.meta.title || 'Weather display'
    }
  },
  created () {
    document.title = 'Weather display'
    console.log(StoreActions.GET_LOADING)
    this.$store.dispatch(StoreActions.GET_LOADING, false)
  }
}
</script>
