<template>
  <div class="wrapper default-wrapper">
    <div class="header default-container">
      <h1 class="header-text">
        <slot name="header"></slot>
      </h1>
    </div>

    <div class="container default-container">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultPage"
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
  width: 80%;
  height: 3rem;

  margin: auto;
}

.header-text {
  margin: 0;
  color: #42a8e1;
  text-shadow: 4px 4px 0 #ab0033;

  font-size: 4rem;
  font-weight: bold;
  text-align: center;
}

.container {
  width: 80%;
  height: 30rem;
  overflow-y: scroll;

  margin: 5rem auto auto auto;
}

</style>