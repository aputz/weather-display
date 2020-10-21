export default {
  methods: {
    goTo (name, params) {
      this.$router.push({ name, params })
    },
    transformToParam (str) {
      return str.replace(' ', '_').toLowerCase()
    }
  }
}
