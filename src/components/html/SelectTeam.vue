<template>
  <select v-bind:value="value"
          @change="$emit('input', $event.target.value)">
    <option disabled value="">{{ disabled }}</option>
    <option v-for="o in options" v-bind:value="o" v-bind:key="o">
      {{ o }}
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
    'options': {
      type: Array,
      required: true
    },
    'disabled': {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
