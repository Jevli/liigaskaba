<template>
  <select v-bind:value="value"
          @change="$emit('input', $event.target.value)">
    <option disabled value="">Valitse joukkue</option>
    <option v-for="team in teams" v-bind:value="team" v-bind:key="team">
      {{ team }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    'value': {
      default () {
        return ''
      }
    },
    'teams': {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
