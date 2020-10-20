export default {
  data () {
    return {
      isStorage: false
    }
  },
  created () {
    this.isStorage = !!localStorage
  },
  methods: {
    getFromStorage (keys) {
      return this.isStorage && keys.reduce((obj, key) => {
        return { ...obj, [key]: localStorage.getItem(key) }
      }, {})
    },
    saveToStorage (obj) {
      if (this.isStorage) {
        Object.entries(obj).map(([key, value]) => localStorage.setItem(key, value))
      }
    }
  }
}
