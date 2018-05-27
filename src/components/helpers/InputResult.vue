<template>
  <div class="container">
    <div class="input">
      <button v-on:click="addEvent('home', game.home)">{{game.home}}</button>
      <input class="score" type="number" v-model="game.result.home" min="0" readonly>
      <input class="score" type="number" v-model="game.result.away" min="0" readonly>
      <button v-on:click="addEvent('away', game.away)">{{game.away}}</button>
    </div>
    <div class="functions">
      <button v-on:click="reset()">Nollaa</button>
      <button v-on:click="$emit('closeMatchEdit', game.id)">Tallenna</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputResult',
  props: {
    game: {
      id: {
        type: String,
        required: true
      },
      home: {
        type: String,
        required: true
      },
      away: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      }
    }
  },
  created: function () {
    this.game.result = this.game.result || {}
    this.game.result.home = this.game.result.home || 0
    this.game.result.away = this.game.result.away || 0
  },
  methods: {
    addEvent (place, team) {
      this.game.result.home = this.game.result.home || 0
      this.game.result.away = this.game.result.away || 0
      if (place === 'home') {
        this.game.result.home++
      } else {
        this.game.result.away++
      }
      this.$forceUpdate()
    },
    reset () {
      this.game.result.home = 0
      this.game.result.away = 0
      this.$forceUpdate()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    padding: 1em;
    border: 1px solid black;
  }

  .container > div {
    margin: 0.5em 0;
  }

  .score {
    width: 2em;
    text-align: center;
  }

  .functions {
    text-align: center;
  }

</style>
