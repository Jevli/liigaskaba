<template>
  <div>
    <v-loader v-if="!games.length" />
    <div class="games container" v-if="games.length">
      <ul>
        <li class="header">
          <div>Päivä:</div>
          <div>Ottelu:</div>
          <div>Tulos</div>
        </li>
        <li class="game" v-for="game in games" v-bind:key="game.id">
          <div class="date">{{game.date}} {{game.time}}</div>
          <div class="teams">{{game.home}} - {{game.away}}</div>
          <div>
            <div @click="addResult(game.id)" v-if="game.result && !changeResult.includes(game.id)">
              {{game.result.home}} - {{game.result.away}}
            </div>
            <div>
              <div class="addResult" @click="addResult(game.id)" v-if="!game.result && !changeResult.includes(game.id) && currentUser">Lisää</div>
              <v-add-result v-bind:game="game" v-if="changeResult.includes(game.id)" v-on:CloseMatch="closeMatch($event, game.result, game.events)" />
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

import firebase from 'firebase'
import {db} from '../firebase'

const gamesDb = db.collection('games')

export default {
  props: {
    query: {
      team: {
        type: String,
        default: undefined
      },
      place: {
        type: String,
        default: undefined
      }
    }
  },
  data: () => {
    return {
      changeResult: [],
      games: [],
      currentUser: firebase.auth().currentUser
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
    filterGamesBy (team, place) {
      this.games = this.games.filter(game => {
        if (place === 'away') {
          return game.away === team
        } else if (place === 'home') {
          return game.home === team
        } else {
          return game.away === team || game.home === team
        }
      })
    },
    addResult (id) {
      if (this.currentUser) this.changeResult.push(id)
    },
    closeMatch (id, result, events) {
      gamesDb.doc(id).update({
        result: result,
        events: events
      }).catch(err => {
        alert('Tulosta ei tallennettu. Oikeuksissa tai tallentamisessa ongelmia.')
        console.log(err)
      })
      this.changeResult = this.changeResult.filter(match => match !== id)
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

  .game {
    display: flex;
    flex-flow: row wrap;
    margin-top: 0.5em;
  }

  .game > .date {
    flex-basis: 145px;
  }

  .game > .teams {
    flex-basis: 180px;
  }

  .addResult {
    border-radius: 7.5px;
    background-color: lightblue;
    padding: 5px;
    font-size: 12px;
  }

</style>
