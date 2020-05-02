<template class="container">
  <form class="search-form__container" name="search-form" @submit.prevent="handleSubmision()">
    <h2 class="title is-2">Enter a city name</h2>
    <p class="subtitle is-4">to look up weather in following days</p>
    <b-field label="City name" :type="isValid ? '' : 'is-danger'" :message="isValid ? '' : 'You need to enter an existing city'">
      <b-autocomplete v-model="selected" :data="suggestions" :custom-formatter="option => `${option.name}, ${option.country}`" :loading="isLoading" placeholder="City name" icon="magnify" @input="getSuggestions()" @select="option => handleSelection(option)" @focus="isValid = true">
        <template v-if="showDropdown" slot="empty">No results found</template>
      </b-autocomplete>
    </b-field>
    <b-button type="is-primary search-form__submit" native-type="submit" :loading="isLoading">Look up the weather</b-button>
  </form>
</template>

<script>
import { StoreActions, StoreGetters } from '../helpers/store-helper'

export default {
  name: 'SearchForm',
  data () {
    return {
      city: {},
      selected: '',
      isSelected: false,
      isLoading: false,
      isValid: true
    }
  },
  computed: {
    suggestions () {
      return this.$store.getters[StoreGetters.SUGGESTIONS]
    },
    showDropdown () {
      return !!this.selected && this.selected.length >= 3
    }
  },
  methods: {
    handleSubmision () {
      if (this.isValid && !!this.city) {
        const { id, name } = this.city
        this.isLoading = true
        this.$store.dispatch(StoreActions.GET_FORECAST, id)
          .then(() => this.$router.push({ name: 'Results', params: { city: name } }),
            (ee) => {
              this.isLoading = false
            })
      }
    },
    getSuggestions () {
      if (this.selected.length >= 3) {
        this.isLoading = true
        this.$store.dispatch(StoreActions.GET_SUGGESTIONS, this.selected)
          .then(() => {
            if (!this.isSelected) {
              this.checkValidity()
            }
          })
          .finally(() => { this.isLoading = false })
      }
    },
    checkValidity () {
      this.isValid = !(this.suggestions.length === 0 || this.selected.length < 0 || this.isSelected)
    },
    handleSelection (city) {
      this.city = city
      this.isSelected = !!city
      if (this.isSelected) this.isValid = true
      this.handleSubmision()
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
