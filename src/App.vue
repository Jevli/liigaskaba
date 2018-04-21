<template>
  <div id="app">
    <v-background id="svg" />
    <v-main id="main" />
  </div>
</template>

<script>
import MainView from '@/components/MainView'
import Field from '@/components/helpers/BackgroundField'

export default {
  name: 'App',
  components: {
    'v-main': MainView,
    'v-background': Field
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    width: 100vw;
    padding-top: 15px;
    color: white;
  }
</style>
