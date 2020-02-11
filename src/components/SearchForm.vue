<template class="container">
  <form class="search-form__container" name="search-form" @submit.prevent="handleSubmision()">
    <h2 class="title is-2">Enter a city name</h2>
    <p class="subtitle is-4">to look up weather in following days</p>
    <b-field label="City name" :type="isValid ? '' : 'is-danger'" :message="isValid ? '' : 'You need to enter an existing city'">
      <b-autocomplete v-model="cityName" :data="filteredNamesArray" placeholder="City name" icon="magnify" @select="option => cityName = option">
        <template slot="empty">No results found</template>
      </b-autocomplete>
    </b-field>
    <b-button type="is-primary search-form__submit" native-type="submit" :loading="isLoading">Look up the weather</b-button>
  </form>
</template>

<script>
export default {
  name: 'SearchForm',
  data () {
    return {
      cityName: '',
      names: ['London', 'Berlin', 'Tokyo', 'Vienna'],
      selected: null,
      isLoading: false,
      isValid: true
    }
  },
  computed: {
    filteredNamesArray () {
      return this.names.filter(name => name.toString().toLowerCase().indexOf(this.cityName.toLowerCase()) >= 0)
    }
  },
  methods: {
    handleSubmision () {
      this.isValid = !!this.cityName
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/custom.scss';

.search-form {
  &__container {
    background: $white;
    padding: 2rem;
    box-shadow: $shadow;

    @media(min-width: 1600px) {
      max-width: 40rem;
    }
  }

  &__submit {
    margin-left: auto;
    margin-right: 0;
    display: block;
  }
}
</style>
