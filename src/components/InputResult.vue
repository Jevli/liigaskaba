<template>
  <div class="input container">
    <h1>Lisää ottelu</h1>
    <div class="teams row">
      <v-select v-model="home" v-bind:options.sync="homeTeams" disabled="Valitse joukkue" />
       vs.
      <v-select v-model="away" v-bind:options.sync="awayTeams" disabled="Valitse joukkue" />
    </div>
    <br>
    <div class="result row" v-if="home && away">
      Lisää maali:<br>
      Joukkue:
      <select v-model="teamScored" v-on:change="updatePlayers()">
        <option value="" disabled>Joukkue</option>
        <option>{{home}}</option>
        <option>{{away}}</option>
      </select>
      <v-select v-model="playerScored" v-bind:options.sync="players" disabled="Maalintekijä" v-if="players"/>
      <button v-on:click="goal()">Lisää maali</button>

      <div>
        <p v-for="goal in goals" v-bind:key="goal.player">
          {{ goal.player }} {{ goal.team }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import SelectTeam from './html/SelectTeam'
import ListGoals from './html/ListGoals'

import * as data from '../assets/teams.json'

export default {
  name: 'InputResult',
  components: {
    'v-select': SelectTeam,
    'v-list-goals': ListGoals
  },
  data () {
    return {
      teams: [],
      homeTeams: [],
      awayTeams: [],
      players: null,
      goals: [],
      home: '',
      away: '',
      teamScored: '',
      playerScored: ''
    }
  },
  beforeMount () {
    this.teams = Object.keys(data).map(key => key).sort()
    this.homeTeams = [...this.teams]
    this.awayTeams = [...this.teams]
  },
  beforeUpdate () {
    if (this.awayTeams.includes(this.home)) {
      this.awayTeams = this.sortAndFilter(this.teams, this.home)
    }
    if (this.homeTeams.includes(this.away)) {
      this.homeTeams = this.sortAndFilter(this.teams, this.away)
    }
  },
  methods: {
    sortAndFilter (arr, val) {
      return arr.filter(o => {
        return o !== val
      })
    },
    updatePlayers () {
      this.players = data[this.teamScored]
    },
    goal () {
      this.goals.push({score: { home: 0, away: 0 }, team: this.teamScored, player: this.playerScored})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
