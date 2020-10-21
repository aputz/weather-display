export default {
  methods: {
    goTo (name, params) {
      this.$router.push({ name, params })
    },
    transformToParam (str) {
      return str.replace(' ', '_').toLowerCase()
    },
    transformFromParam (str) {
      return str.replace('_', ' ')
    }
  }
}
