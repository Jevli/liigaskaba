<template>
  <div class="games container">
    <ul>
      <li class="header">
        <div>Päivä:</div>
        <div>Ottelu:</div>
        <div></div></li>
      <li class="game" v-for="game in games" v-bind:key="game.id">
        <div>{{game.date}} {{game.time}}</div>
        <div>{{game.home}} - {{game.away}}</div>
        <div>
          <div @click="addResult(game.id)" v-if="game.result && !changeResult.includes(game.id)">
            {{game.result.home}} - {{game.result.away}}
          </div>
          <div>
            <div @click="addResult(game.id)" v-if="!game.result && !changeResult.includes(game.id)">Lisää tulos</div>
            <v-add-result v-bind:game="game" v-if="changeResult.includes(game.id)" v-on:CloseMatch="closeMatch($event, game.result)" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import InputResult from '@/components/helpers/InputResult'
import config from '../../config'

const firebase = require('firebase')
require('firebase/firestore')

firebase.initializeApp(config.fireStore)

var db = firebase.firestore().collection('games')

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
      games: []
    }
  },
  components: {
    'v-add-result': InputResult
  },
  beforeMount () {
    db.get()
      .then(res => {
        res.forEach(doc => {
          let data = doc.data()
          data.id = doc.id
          this.games.push(data)
        })
        this.sortGamesBy()
        if (this.query && this.query.team) {
          this.filterGamesBy(this.query.team, this.query.place)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    sortGamesBy () {
      this.games = [...this.games].sort((a, b) => {
        const aDate = a.date.split('/')
        const aTime = a.time.split(':')
        const bTime = b.time.split(':')
        const bDate = b.date.split('/')
        if (aDate[2] - bDate[2] + aDate[1] - bDate[1] + aDate[0] - bDate[0]) {
          return aDate[2] - bDate[2] + aDate[1] - bDate[1] + aDate[0] - bDate[0]
        } else {
          return aTime[0] - bTime[0] + aTime[1] - bTime[1]
        }
      })
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
      this.changeResult.push(id)
    },
    closeMatch (id, result) {
      db.doc(id).update({
        result: result
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
  ul li {
    list-style-type: none;
    min-width: 300px;
  }

  .games.container {
    margin: 0 auto;
  }

  .header {
    font-size: 1.25em;
    display: grid;
    grid-template-columns: minmax(90px, 150px) 200px auto;
    grid-column-gap: 1em;
  }

  .game {
    display: grid;
    grid-template-columns: minmax(90px, 150px) 200px auto;
    grid-column-gap: 1em;
    padding-top: 0.25em;
  }

</style>
