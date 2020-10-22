<template>
  <b-navbar class="navbar__container" type="is-transparent" :mobile-burger="false">
    <template slot="brand">
      <b-navbar-item tag="div" class="navbar__brand" @click="returnToMainPage()">
        <Logo :appName="appName"/>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import Logo from './Logo.vue'

export default {
  name: 'Navbar',
  components: {
    Logo
  },
  props: {
    appName: {
      type: String,
      default: ''
    }
  },
  methods: {
    returnToMainPage () {
      this.clearStorage()
      this.$router.push({ path: '/' })
    },
    clearStorage () {
      if (localStorage) localStorage.clear()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/custom.scss';

.navbar {
  &__container {
    text-shadow: 1rem 1rem 5px transparentize($text, 0.8);
  }

  &__brand {
    position: relative;
    height: 100%;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: -4rem;
      left: 0;
      background: linear-gradient(to right, transparentize($white, 0.95), transparentize($white, 0.65));
      clip-path: ellipse(100% calc(100% + 2rem) at 0px 0px);
      z-index: 1;
      display: block;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: -6rem;
      left: 0;
      background: linear-gradient(to right, transparentize($white, 0.95), transparentize($white, 0.65));
      clip-path: ellipse(100% calc(100% + 4rem) at 0px 0px);
      z-index: 1;
      display: block;
    }
  }
}
</style>
