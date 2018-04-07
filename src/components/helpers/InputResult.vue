<template>
  <div class="container">
    <div class="events" v-if="game.events" v-for="event in game.events" v-bind:key="event.id">
      {{event.team}} {{event.player}} ajassa {{event.time}}"
    </div>
    <div class="input">
      <input class="time" type="number" v-model="event.time" min="0">
      <input type="text" v-model="event.player" placeholder="maalintekijä"/>
    </div>
    <div class="teams">
      <button v-on:click="addEvent('home', game.home)">{{game.home}}</button>
      <button v-on:click="addEvent('away', game.away)">{{game.away}}</button>
    </div>
    <div>
      <button v-on:click="$emit('CloseMatch', game.id)">Tallenna</button>
    </div>
  </div>
</template>

<script>
import uuidv4 from 'uuid/v4'

export default {
  name: 'InputResult',
  data: () => {
    return { event: {
      time: 0,
      player: ''
    } }
  },
  props: {
    game: {
      id: {
        type: String
      },
      home: {
        type: String
      },
      away: {
        type: String
      },
      date: {
        type: String
      },
      time: {
        type: String
      }
    }
  },
  methods: {
    addEvent (place, team) {
      this.game.events = this.game.events || []
      this.game.result = this.game.result || {}
      this.game.result.home = this.game.result.home ? this.game.result.home : 0
      this.game.result.away = this.game.result.away ? this.game.result.away : 0
      if (team === 'home') {
        this.game.result.home++
      } else {
        this.game.result.away++
      }
      this.game.events.push({ 'id': uuidv4(), 'team': team, 'time': this.event.time, 'player': this.event.player })
      this.event.player = ''
      this.event.time++
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    padding: 0.5em;
    border: 1px solid black;
  }

  .container > div {
    margin: 0.5em 0;
  }

  .events {
    font-size: 0.75em;
    padding-bottom: 1em;
  }

  .time {
    width: 40px;
  }
</style>
