<template>
  <div id="app">
    <v-main/>
  </div>
</template>

<script>
import MainView from '@/components/MainView'

export default {
  name: 'App',
  components: {
    'v-main': MainView
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
