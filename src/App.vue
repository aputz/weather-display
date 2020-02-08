<template>
  <div id="app" class="app__container">
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
@import "assets/custom";

.app {
  &__container {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    padding: 2rem;
    background-image:  url('assets/bg.jpg');
    background-color: $primary;
    background-size: cover;
    background-blend-mode: soft-light;
  }
}
</style>

<script>
export default {
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
