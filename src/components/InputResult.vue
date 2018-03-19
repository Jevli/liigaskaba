<template>
  <div class="input container">
    <h1>Lisää ottelu</h1>
    <div class="row">
      <v-select-team v-model="home" v-bind:teams.sync="homeTeams" />
       vs.
      <v-select-team v-model="away" v-bind:teams.sync="awayTeams" />
    </div>
    <div class="row">
      <h2>data testi</h2>
      {{home}} vs {{away}}
    </div>
  </div>
</template>

<script>
import SelectTeam from './html/SelectTeam'

import * as data from '../assets/teams.json'

export default {
  name: 'InputResult',
  components: {
    'v-select-team': SelectTeam
  },
  data () {
    return {
      homeTeams: [],
      awayTeams: [],
      home: '',
      away: ''
    }
  },
  beforeMount () {
    this.homeTeams = [...data.teams].sort()
    this.awayTeams = [...data.teams].sort()
  },
  beforeUpdate () {
    if (this.awayTeams.includes(this.home)) {
      this.awayTeams = this.sortAndFilter([...data.teams], this.home)
    }
    if (this.homeTeams.includes(this.away)) {
      this.homeTeams = this.sortAndFilter([...data.teams], this.away)
    }
  },
  methods: {
    sortAndFilter (arr, val) {
      return arr.sort().filter(o => {
        return o !== val
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
