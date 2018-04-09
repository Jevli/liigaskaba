<template>
  <div class="container">
    <div class="events" v-if="game.events" v-for="event in game.events" :key="event.id">
      {{event.team}} {{event.player}}
      <img src="/static/soccer-ball_26bd.png"/> {{event.time}}
      <img src="/static/clock.png" />
      <img class="delete" src="/static/redcross.png"
        @click="removeEvent(event)"
      />
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
      <button v-on:click="$emit('closeMatchEdit', game.id)">Tallenna</button>
    </div>
  </div>
</template>

<script>
import uuidv4 from 'uuid/v4'
import _ from 'lodash'

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
      this.game.result.home = this.game.result.home || 0
      this.game.result.away = this.game.result.away || 0
      if (place === 'home') {
        this.game.result.home++
      } else {
        this.game.result.away++
      }
      this.game.events.push({ 'id': uuidv4(), 'team': team, 'time': this.event.time, 'player': this.event.player })
      this.event.player = ''
      this.event.time++

      this.game.events = _.orderBy(this.game.events, (e) => parseInt(e.time))
    },
    removeEvent (event) {
      event.team === this.game.home ? this.game.result.home-- : this.game.result.away--
      this.game.events = _
        .chain(this.game.events)
        .filter(e => e.id !== event.id)
        .orderBy((e) => parseInt(e.time))
        .value()
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

  .events {
    font-size: 0.75em;
    padding-bottom: 1em;
  }

  .time {
    width: 40px;
  }

  .delete {
    float: right;
    cursor: pointer;
  }

</style>
