<template>
  <h1 class="title is-6 has-text-white logo__container">{{appName}}</h1>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    appName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scopped>
@import '../assets/custom.scss';

.logo {
  &__container {
    text-transform: lowercase;
    font-family: Comfortaa, sans-serif;
    text-shadow: 2px 2px 5px transparentize($text, 0.8);
  }
}
</style>
