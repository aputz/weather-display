<template class="container">
  <form
    class="search-form__container"
    name="search-form"
    @submit.prevent="handleSubmision()"
  >
    <h2 class="title is-2">Enter a city name</h2>
    <p class="subtitle is-4">to look up weather in following days</p>
    <b-field
      label="City name"
      :type="isInputInvalid ? 'is-danger' : ''"
      :message="isInputInvalid ? 'You need to enter an existing city' : ''"
    >
      <b-autocomplete
        v-model="selected"
        :data="suggestions"
        :custom-formatter="(option) => `${option.name}, ${option.country}`"
        :loading="isLoading"
        placeholder="City name"
        icon="magnify"
        @input="getSuggestions()"
        @select="(option) => handleSelection(option)"
        @focus="isInputInvalid = false"
      >
        <template v-if="showDropdown" slot="empty">No results found</template>
      </b-autocomplete>
    </b-field>
    <div class="search-form__submit-container">
      <RememberLast :toSave="city" />
      <b-button
        type="is-primary"
        native-type="submit"
        :loading="isLoading"
      >Look up the weather</b-button>
    </div>
    <Geolocation />
  </form>
</template>

<script>
import { StoreActions, StoreGetters } from '../../helpers/store-helper'
import RememberLast from './RememberLast'
import Geolocation from './Geolocation'
import NavigateMixin from '../../mixins/NavigateMixin'
import LocalStorageMixin from '../../mixins/LocalStorageMixin'

export default {
  name: 'SearchForm',
  components: {
    Geolocation, RememberLast
  },
  mixins: [
    NavigateMixin, LocalStorageMixin
  ],
  data () {
    return {
      city: {},
      selected: '',
      isSelected: false,
      isLoading: false,
      isInputInvalid: false
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
      if (!this.isInputInvalid && !!this.city) {
        const { id, name } = this.city
        this.isLoading = true
        this.$store.dispatch(StoreActions.GET_FORECAST_BY_ID, id)
          .then(() => {
            this.saveToStorage({ cityId: id, cityName: name })
            this.goTo('Results', { cityName: this.transformToParam(name) })
          })
          .finally(() => { this.isLoading = false })
      }
    },
    getSuggestions () {
      this.checkSuggestionsValidity()
      const toSearch = this.selected.trim().replace(/[^A-Za-z\s]/g, '')
      const canRequest = toSearch.length >= 3 && !this.isSelected && !this.isLoading
      if (canRequest) {
        this.isLoading = true
        this.$store.dispatch(StoreActions.GET_SUGGESTIONS, toSearch)
          .finally(() => { this.isLoading = false })
      }
    },
    checkSuggestionsValidity () {
      this.isInputInvalid = this.suggestions.length === 0 && this.selected.length > 3
    },
    handleSelection (city) {
      this.city = city
      this.isSelected = !!city
      if (this.isSelected) this.isInputInvalid = true
    }
  }
}
</script>

<style lang="scss" scoped>
.search-form {
  &__submit-container {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
