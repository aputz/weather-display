<template>
  <b-button outlined v-if="saved && saved.cityName" @click="getForecast()" style="margin-right: 0.5rem">Load forecast for {{saved.cityName}}</b-button>
</template>

<script>
import { StoreActions } from '../../helpers/store-helper'
import NavigateMixin from '../../mixins/NavigateMixin'
import LocalStorageMixin from '../../mixins/LocalStorageMixin'

export default {
  name: 'RememberLast',
  mixins: [
    NavigateMixin, LocalStorageMixin
  ],
  data () {
    return {
      saved: null
    }
  },
  props: {
    toSave: {
      type: Object,
      default: null
    }
  },
  created () {
    this.saved = this.getFromStorage(['cityId', 'cityName'])
  },
  methods: {
    getForecast () {
      const { cityId, cityName } = this.saved
      this.$store.dispatch(StoreActions.GET_FORECAST_BY_ID, cityId).then(() => {
        this.goTo('Results', { cityName: cityName.replace(' ', '').toLowerCase() })
      })
    }
  },
  watch: {
    toSave (newValue, oldValue) {
      if (newValue) {
        const { id, name } = newValue
        this.saveToStorage({ cityId: id, cityName: name })
      }
    }
  }
}
</script>
