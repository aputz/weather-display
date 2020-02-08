<template>
  <div id="app" class="app__container">
    <Navbar :appName="appName" />
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
@import "assets/custom";
@import "~bulma";
@import "~buefy/src/scss/buefy";

.app {
  &__container {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-image:  url('assets/bg.jpg');
    background-color: $primary;
    background-size: cover;
    background-blend-mode: soft-light;
  }
}
</style>

<script>
import Navbar from './components/Navbar.vue'

export default {
  data () {
    return {
      appName: 'Weather display'
    }
  },
  components: {
    Navbar
  },
  watch: {
    '$route' (newValue, oldValue) {
      document.title = newValue.meta.title || 'Weather display'
    }
  },
  created () {
    document.title = 'Weather display'
  }
}
</script>
