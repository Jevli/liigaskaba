<template>
  <div class="contest">
    <v-loader v-if="!gamers.length || !teams.length"/>
    <div class="contest" v-if="gamers.length && teams.length">
      Pisteet: <br>
      <div v-for="(t, i) in gamers" :key="i">
        {{t.player}}: {{t.points}}
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/helpers/Loader'
import _ from 'lodash'
import {getTeamsInOrder} from '../utils'

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
      teams: []
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
              .reduce((sum, n) => sum + n)
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
  }
}
</script>
