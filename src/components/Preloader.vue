<template>
  <transition name="fadeInOut">
    <div class="preloader__container" v-if="isLoading">
      <div class="preloader__element"></div>
    </div>
  </transition>
</template>

<script>
import { StoreGetters } from '../helpers/store-helper'

export default {
  name: 'Preloader',
  computed: {
    isLoading () {
      return this.$store.getters[StoreGetters.ISLOADING]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/custom.scss';

.preloader {
  &__container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparentize($primary, 0.3);
    pointer-events: none;
  }

  &__element {
    width: 10vw;
    height: 10vw;
    background: transparent;
    border-radius: 100%;
    border: solid 5vw $light;
    animation: pulsing 1s ease-out alternate infinite;
  }
}

@keyframes pulsing {
  0% {
    border: solid 5vw $light;
    width: 12vw;
    height: 12vw;
  } 60% {
    width: 10vw;
    height: 10vw;
  } 80% {
    width: 11vw;
    height: 11vw;
  } 100% {
    width: 10vw;
    height: 10vw;
    border: solid 2px $light;
  }
}

.fadeInOut {
  &-enter-active, &-leave-active {
    transition: opacity 0.25s;
  }

  &-enter, &-leave-to {
    opacity: 0;
  }
}
</style>
