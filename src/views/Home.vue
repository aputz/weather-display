<template>
  <div class="home__container">
      <div class="home__nested-container">
    <transition name="slide" @beforeLeave="beforeLeave" @enter="enter" @afterEnter="afterEnter" mode="out-in">
        <router-view></router-view>
    </transition>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      prevHeight: 0
    }
  },
  methods: {
    beforeLeave (element) {
      this.prevHeight = getComputedStyle(element).height
    },
    enter (element) {
      const { height } = getComputedStyle(element)

      element.style.height = this.prevHeight

      setTimeout(() => {
        element.style.height = height
      })
    },
    afterEnter (element) {
      element.style.height = 'auto'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/custom.scss';

.home {
  &__container {
    height: 100%;
    min-height: 80vh;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
  }

  &__nested-container {
    background: $white;
    padding: 2rem;
    box-shadow: $shadow;
    width: 80vw;
    max-width: 60rem;
    margin: 2rem 0;
    position: relative;
    overflow: hidden;
  }
}

.slide {
  &-enter-active, &-leave-active {
    transition-duration: 0.5s;
    transition-property: height, opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
    overflow: hidden;
  }

  &-enter {
    opacity: 0;
    transform: translate(50vw, 0);
  }

  &-leave-active {
    opacity: 0;
    transform: translate(-50vw, 0);
  }
}
</style>
