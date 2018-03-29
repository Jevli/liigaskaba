<template>
  <div class="container">
    <div class="left-top">
      <p><strong>Koti</strong></p>
    </div>
    <div class="middle-top" />
    <div class="right-top">
      <p><strong>Vieras</strong></p>
    </div>
    <div class="left-bot">
      <p>{{home.name}}</p>
    </div>
    <div class="middle-bot">
      <p>{{home.score}} - {{away.score}}</p>
    </div>
    <div class="right-bot">
      <p>{{away.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'home': {
      'name': {
        type: String,
        required: true
      },
      'score': {
        type: Number,
        required: true
      }
    },
    'away': {
      'name': {
        type: String,
        required: true
      },
      'score': {
        type: Number,
        required: true
      }
    }
  }
}
</script>

<style scoped>
  .container {
    display: grid;
    grid-template-areas:
      "left-top middle-top right-top"
      "left-bot middle-bot right-bot";
    justify-items: center;
    align-items: center;
    font-size: 2em;
  }

  .left-top {
      align-self: end;
  }
</style>
