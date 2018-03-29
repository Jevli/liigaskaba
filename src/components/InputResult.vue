<template>
  <div class="input container">
    <div class="top" v-if="result.home.name && result.away.name">
      <v-score-board v-bind:home="result.home" v-bind:away="result.away" />
    </div>
    <div class="top" v-if="!result.home.name || !result.away.name">
      <h2>Valitse joukkueet:</h2>
      <v-select v-model="result.home.name" v-bind:options.sync="homeTeams" disabled="Valitse joukkue" />
       vs.
      <v-select v-model="result.away.name" v-bind:options.sync="awayTeams" disabled="Valitse joukkue" />
    </div>
    <br>
    <div class="result row" v-if="result.home.name && result.away.name">
      Lisää maali:<br>
      Joukkue:
      <select v-model="teamScored" v-on:change="updatePlayers()">
        <option value="" disabled>Joukkue</option>
        <option>{{result.home.name}}</option>
        <option>{{result.away.name}}</option>
      </select>
      <v-select v-model="playerScored" v-bind:options.sync="players" disabled="Maalintekijä" v-if="players"/>
      <button v-on:click="goal()" v-if="playerScored && teamScored">Lisää maali</button>

      <div>
        <div v-for="goal in result.goals" v-bind:key="goal.id">
          {{ goal.player }} [{{ goal.team }}]
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectTeam from './html/SelectTeam'
import ListGoals from './html/ListGoals'
import ScoreBoard from './ScoreBoard'

import * as data from '../assets/teams.json'

export default {
  name: 'InputResult',
  components: {
    'v-select': SelectTeam,
    'v-list-goals': ListGoals,
    'v-score-board': ScoreBoard
  },
  data () {
    return {
      teams: [],
      homeTeams: [],
      awayTeams: [],
      players: null,
      result: {
        home: {
          name: '',
          score: 0
        },
        away: {
          name: '',
          score: 0
        },
        goals: []
      },
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
    const home = this.result.home.name
    const away = this.result.away.name
    if (this.awayTeams.includes(home)) {
      this.awayTeams = this.sortAndFilter(this.teams, home)
    }
    if (this.homeTeams.includes(away)) {
      this.homeTeams = this.sortAndFilter(this.teams, away)
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
      if (this.teamScored === this.result.home.name) {
        this.result.home.score++
      } else if (this.teamScored === this.result.away.name) {
        this.result.away.score++
      }
      const id = this.result.home.score + this.result.away.score
      this.result.goals.push({id: id, team: this.teamScored, player: this.playerScored})

      this.playerScored = ''
      this.teamScored = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    display: grid;
    grid-template-areas:
      "top"
      "middle"
      "bottom";
    margin: auto;
    width: 500px;    
  }
</style>
