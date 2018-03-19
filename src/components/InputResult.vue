<template>
  <div class="input container">
    <h1>Lisää ottelu</h1>
    <div class="teams row">
      <v-select v-model="home" v-bind:teams.sync="homeTeams" />
       vs.
      <v-select v-model="away" v-bind:teams.sync="awayTeams" />
    </div>
    <div class="result row">
      Lisää maali:
      <button>Koti</button><button>Vieras</button>
    </div>
  </div>
</template>

<script>
import SelectTeam from './html/SelectTeam'

import * as data from '../assets/teams.json'

export default {
  name: 'InputResult',
  components: {
    'v-select': SelectTeam
  },
  data () {
    return {
      teams: [],
      homeTeams: [],
      awayTeams: [],
      home: '',
      away: ''
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
