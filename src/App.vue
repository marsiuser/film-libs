<template>
  <div id="app">
    <Header />
  </div>
</template>

<script>
import 'reset-css';
import Header from './components/Header.vue';
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang="scss">
@import './assets/styles/style.css';
@import './assets/styles/animations.css';

$color: rgb(184, 23, 23);

h1{
  color:$color;
}

</style>
