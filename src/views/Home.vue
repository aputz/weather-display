<template>
  <div class="home__container">
    <SearchForm />
  </div>
</template>

<script>
import SearchForm from '../components/SearchForm.vue'

export default {
  name: 'Home',
  components: {
    SearchForm
  }
}
</script>

<style lang="scss" scoped>
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
}
</style>
