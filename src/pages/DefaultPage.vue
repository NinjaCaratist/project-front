<template>
  <div class="wrapper default-wrapper">
    <div class="header default-container">
      <h1 class="header-text">
        <slot name="header"></slot>
      </h1>
    </div>

    <div class="container default-container" v-bind:class="{ overflowed }">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultPage",
  props: {
    overflowed: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.default-container {
  @include default-container;
}

.default-wrapper {
  background-image: url("../assets/images/background.jpg");
  height: 100%;
  width: 100%;
}

.wrapper {
  padding-top: 5rem;
}

.header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 80%;
  height: 3rem;

  margin: auto;
}

.header-text {
  margin: 0;
  color: #5a86c5;
  text-shadow: 4px 4px 0 #404040;

  font-size: 4rem;
  font-weight: bold;
  text-align: center;
}

.container {
  width: 80%;
  height: 30rem;
  overflow: hidden;

  margin: 5rem auto auto auto;
}

.container.overflowed {
  overflow-y: scroll;
}

</style>