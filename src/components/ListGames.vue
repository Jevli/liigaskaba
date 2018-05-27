<template>
  <div>
    <v-loader v-if="!games.length" />
    <div class="games container" v-if="games.length">
      <div class="filters">
        <div class="filter">
          Joukkue:
          <select v-model="filterTeam">
            <option selected></option>
            <option  v-for="team in teams" v-bind:key="team">
              {{team}}
            </option>
          </select>
        </div>
        <div class="filter">
          Päivä:
          <select v-model="filterDate">
            <option selected></option>
            <option  v-for="date in dates" v-bind:key="date">
              {{date}}
            </option>
          </select>
        </div>
      </div>
      <ul>
        <li class="header">
          <div>Päivä:</div>
          <div>Ottelu:</div>
          <div>Tulos</div>
        </li>
        <li class="game" v-for="game in filtered" v-bind:key="game.id" >
          <div class="date">{{game.date}} {{game.time}}</div>
          <div class="teams">{{game.home}} - {{game.away}}</div>
          <div>

            <div @click="addResult(game.id)"
              v-if="game.result && !changeResult.includes(game.id)"
            >
              {{game.result.home}} - {{game.result.away}}
            </div>

            <div>

              <div class="addResult"
                @click="addResult(game.id)"
                v-if="!game.result && !changeResult.includes(game.id) && currentUser"
              >
                Lisää
              </div>

              <v-add-result
                v-bind:game="game"
                v-if="changeResult.includes(game.id)"
                v-on:closeMatchEdit="closeMatchEdit($event, game.result, game.events)"
              />

            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/helpers/Loader'
import InputResult from '@/components/helpers/InputResult'
import _ from 'lodash'

import firebase from 'firebase'
import {db} from '../firebase'

const gamesDb = db.collection('games')

export default {
  data: () => {
    return {
      changeResult: [],
      games: [],
      currentUser: firebase.auth().currentUser,
      filterTeam: '',
      filterDate: ''
    }
  },
  components: {
    'v-add-result': InputResult,
    'v-loader': Loader
  },
  beforeMount () {
    gamesDb.get()
      .then(res => {
        let games = []
        res.forEach(doc => {
          let data = doc.data()
          data.id = doc.id
          games.push(data)
        })
        this.sortGamesBy(games)
        if (this.query && this.query.team) {
          this.filterGamesBy(this.query.team, this.query.place)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    sortGamesBy (games) {
      this.games = [...games].sort(this.compareMatchDates)
    },
    compareMatchDates (dateA, dateB) {
      const aDate = dateA.date.split('/')
      const aTime = dateA.time.split(':')
      const bTime = dateB.time.split(':')
      const bDate = dateB.date.split('/')
      if (aDate[2] - bDate[2] + aDate[1] - bDate[1] + aDate[0] - bDate[0]) {
        return aDate[2] - bDate[2] + aDate[1] - bDate[1] + aDate[0] - bDate[0]
      } else {
        return aTime[0] - bTime[0] + aTime[1] - bTime[1]
      }
    },
    addResult (id) {
      if (this.currentUser) this.changeResult.push(id)
    },
    closeMatchEdit (id, result) {
      gamesDb.doc(id).update({
        result: result
      }).catch(err => {
        alert('Tulosta ei tallennettu. Oikeuksissa tai tallentamisessa ongelmia.')
        console.log(err)
      })
      this.changeResult = this.changeResult.filter(match => match !== id)
    }
  },
  computed: {
    filtered: function () {
      return _
        .chain(this.games)
        .filter((game) => {
          return (game.home === this.filterTeam || game.away === this.filterTeam) || !this.filterTeam
        })
        .filter((game) => {
          return game.date === this.filterDate || !this.filterDate
        })
        .value()
    },
    teams: function () {
      return _
        .chain(this.filtered)
        .map((team) => [team.home, team.away])
        .flatMap()
        .uniqBy()
        .orderBy()
        .value()
    },
    dates: function () {
      return _
        .chain(this.filtered)
        .map('date')
        .uniqBy()
        .value()
    }
  }
}
</script>

<style scoped>
  ul {
    padding-left: 10px;
  }

  li {
    padding: 0;
    list-style-type: none;
    min-width: 380px;
  }

  .header {
    font-size: 1.25em;
    display: grid;
    grid-template-columns: minmax(90px, 145px) 180px auto;
  }

  .games {
    padding-bottom: 50vh;
  }

  .game {
    display: flex;
    flex-flow: row wrap;
    margin-top: 1em;
  }

  .game > .date {
    flex-basis: 145px;
  }

  .game > .teams {
    flex-basis: 180px;
  }

  .addResult {
    border-radius: 7.5px;
    background-color: black;
    padding: 7.5px;
    font-size: 12px;
  }

  .filters {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .filter {
    margin-right: 0.75em;
  }

</style>
