<template>
  <div class="home__container">
    <div class="home__nested-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
@import '../assets/custom.scss';

.home {
  &__container {
    height: 100%;
    min-height: 80vh;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
  }

  &__nested-container {
    background: $white;
    padding: 2rem;
    box-shadow: $shadow;
    width: 80vw;
    max-width: 60rem;
    margin: 2rem 0;
  }
}
</style>
