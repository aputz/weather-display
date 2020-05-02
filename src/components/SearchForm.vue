<template class="container">
  <form class="search-form__container" name="search-form" @submit.prevent="handleSubmision()">
    <h2 class="title is-2">Enter a city name</h2>
    <p class="subtitle is-4">to look up weather in following days</p>
    <b-field label="City name" :type="isValid  ? '' : 'is-danger'" :message="isValid ? '' : 'You need to enter an existing city'">
      <b-autocomplete v-model="cityName" :data="suggestions" :custom-formatter="option => `${option.name}, ${option.country}`" :loading="isLoading" placeholder="City name" icon="magnify" @input="getSuggestions()" @select="option => cityName = option" @focus="isEmpty = false">
        <template v-if="showDropdown" slot="empty">No results found</template>
      </b-autocomplete>
    </b-field>
      <b-notification type="is-danger" :active.sync="isEmpty" :closable="true">
        The city could not be found. Make sure the name is correct and try again!
      </b-notification>
    <b-button type="is-primary search-form__submit" native-type="submit" :loading="isLoading">Look up the weather</b-button>
  </form>
</template>

<script>
import { StoreActions, StoreGetters } from '../helpers/store-helper'

export default {
  name: 'SearchForm',
  data () {
    return {
      cityName: '',
      selected: null,
      isLoading: false,
      isValid: true,
      isEmpty: false
    }
  },
  computed: {
    suggestions () {
      return this.$store.getters[StoreGetters.SUGGESTIONS]
    },
    showDropdown () {
      return !!this.cityName && this.cityName >= 3
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
            })
      }
    },
    getSuggestions () {
      if (!!this.cityName && this.cityName.length >= 3) {
        this.isLoading = true
        this.isEmpty = false
        this.$store.dispatch(StoreActions.GET_SUGGESTIONS, this.cityName)
          .then(() => {
            this.isEmpty = !this.suggestions.lenght
          })
          .finally(() => { this.isLoading = false })
      }
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
