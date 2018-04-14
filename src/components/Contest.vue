<template>
  <div class="contest">
    <v-loader v-if="!gamers.length || !teams.length"/>
    <table class="contest" v-if="gamers.length && teams.length" border=1>
      <tr>
        <th>Pelaaja</th>
        <th>Pts</th>
        <th class="teams">{{listOfTeams}}</th>
      </tr>
      <tr v-for="(g, i) in gamers" :key="i">
        <td>{{g.player}}</td>
        <td>{{g.points}}</td>
        <td class="teams">{{g.line | listOfLine}}</td>
      </tr>
    </table>

    <div class="addGamer" v-if="currentUser">
      Here will be added adding new player
    </div>
  </div>
</template>

<script>
import Loader from '@/components/helpers/Loader'
import _ from 'lodash'
import {getTeamsInOrder} from '../utils'
import firebase from 'firebase'

import json from './contestTable.json'

export default {
  name: 'Contest',
  components: {
    'v-loader': Loader
  },
  data () {
    return {
      json: json,
      gamers: [],
      teams: [],
      currentUser: firebase.auth().currentUser
    }
  },
  beforeMount () {
    getTeamsInOrder()
      .then(teams => {
        this.teams = teams
        updateGamers()
      })
      .catch(error => {
        console.error(error)
      })

    const updateGamers = () => {
      _.mapValues(this.json, (val, key) => {
        this.gamers.push(
          {
            player: key,
            points: _
              .chain(val)
              .map(v => this.distanceOfRank(Object.values(v)[0], parseInt(Object.keys(v))))
              .reduce((sum, n) => sum + n),
            line: _
              .chain(val)
          }
        )
      })
      this.gamers = _.orderBy(this.gamers, ['points'])
    }
  },
  methods: {
    distanceOfRank (team, rank) {
      return Math.abs(_.findIndex(this.teams, (o) => o.id === team) - rank)
    }
  },
  filters: {
    listOfLine: function (line) {
      return line.map(obj => Object.values(obj)).join(', ')
    }
  },
  computed: {
    listOfTeams: function () {
      return this.teams.map(team => team.id).join(', ')
    }
  }
}
</script>

<style scoped>
  tr {
    display: grid;
    grid-template-columns: 60px 35px auto;
    align-items: center;
    text-align: left;
    border: 1px solid black
  }

  th {
    border: none;
  }
  td {
    border: none;
  }

  .teams {
    font-size: 0.7em;
  }

  .addGamer {
    margin-top: 3em;
  }
</style>
