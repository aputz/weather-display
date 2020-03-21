<template class="container">
  <form class="search-form__container" name="search-form" @submit.prevent="handleSubmision()">
    <h2 class="title is-2">Enter a city name</h2>
    <p class="subtitle is-4">to look up weather in following days</p>
    <b-field label="City name" :type="isValid  ? '' : 'is-danger'" :message="isValid ? '' : 'You need to enter an existing city'">
      <b-autocomplete v-model="cityName" :data="filteredNamesArray" placeholder="City name" icon="magnify" @select="option => cityName = option" @focus="unsetError()">
        <template slot="empty">No results found</template>
      </b-autocomplete>
    </b-field>
      <b-notification type="is-danger" :active.sync="isError" :closable="false" :duration="2000" :auto-close="true">
        The city could not be found. Make sure the name is correct and try again!
      </b-notification>
    <b-button type="is-primary search-form__submit" native-type="submit" :loading="isLoading">Look up the weather</b-button>
  </form>
</template>

<script>
import { StoreActions } from '../helpers/store-helper'

export default {
  name: 'SearchForm',
  data () {
    return {
      cityName: '',
      names: ['London', 'Berlin', 'Tokyo', 'Vienna', 'Washington'],
      selected: null,
      isLoading: false,
      isValid: true,
      isError: false
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
      if (this.isValid) {
        this.isLoading = true
        this.$store.dispatch(StoreActions.GET_FORECAST, this.cityName)
          .then(() => this.$router.push({ name: 'Results', params: { cityName: this.cityName } }),
            (ee) => {
              this.isLoading = false
              this.isError = true
            })
      }
    },
    unsetError () {
      this.isError = false
    }
  }
}
</script>

<style lang="scss" scoped>

.search-form {
  &__submit {
    margin-left: auto;
    margin-right: 0;
    display: block;
  }
}
</style>
