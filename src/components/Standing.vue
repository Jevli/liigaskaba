<template>
  <div class="standing">
      <ul>
          <strong><li>
              <div>#</div>
              <div>Joukkue</div>
              <div>W</div>
              <div>D</div>
              <div>L</div>
              <div>F</div>
              <div>A</div>
              <div>P</div>
          </li></strong>
          <li v-for="(team, index) in teams" v-bind:key="team.id">
              <div>{{index + 1}}</div>
              <div>{{team.id}}</div>
              <div>{{team.wins}}</div>
              <div>{{team.draws}}</div>
              <div>{{team.loses}}</div>
              <div>{{team.for}}</div>
              <div>{{team.agains}}</div>
              <div><strong>{{team.points}}</strong></div>
          </li>
      </ul>
  </div>
</template>

<script>
import {db} from '../firebase'

const teamsDb = db.collection('teams')

export default {
  name: 'Stanging',
  data: () => {
    return {
      teams: []
    }
  },
  beforeMount () {
    teamsDb.get()
      .then(res => {
        res.forEach(doc => {
          let data = doc.data()
          data.id = doc.id
          data.points = data.wins * 3 + data.draws
          this.teams.push(data)
        })
        this.sortByPoints()
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    sortByPoints () {
      this.teams = [...this.teams].sort((a, b) => {
        if (a.points === b.points) {
          if (a.for - a.agains === b.for - b.agains) {
            return a.for < b.for
          } else {
            return a.for - a.agains < b.for - b.agains
          }
        } else {
          return a.points < b.points
        }
      })
    }
  }
}
</script>

<style scoped>
  ul {
    display: flex;
    flex-flow: column;
    padding-left: 10px;
    margin: 0 auto;
  }

  li {
    padding: 0;
    list-style-type: none;

    display: inline-grid;
    grid-template-columns: 25px 150px repeat(6, 25px)
  }

</style>
