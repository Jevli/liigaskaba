<template>
  <div>
    <v-loader v-if="!teams.length" />
    <div class="standing" v-if="teams.length">
      <ul>
        <strong><li>
          <div title="Sijoitus">#</div>
          <div class="teams" title="Joukkueen nimi">Joukkue</div>
          <div title="Pelit">G</div>
          <div title="Voitot">W</div>
          <div title="Tasapelit">D</div>
          <div title="Häviöt">L</div>
          <div title="Tehdyt maalit">F</div>
          <div title="Päästetyt maalit">A</div>
          <div title="Maaliero">GD</div>
          <div title="Pisteet">P</div>
        </li></strong>
        <li v-for="(team, index) in teams" v-bind:key="team.id" v-if="teams">
          <div>{{index + 1}}</div>
          <div class="teams">{{team.id}}</div>
          <div>{{team.games}}</div>
          <div>{{team.wins}}</div>
          <div>{{team.draws}}</div>
          <div>{{team.loses}}</div>
          <div>{{team.for}}</div>
          <div>{{team.agains}}</div>
          <div>{{team.goaldifference}}</div>
          <div><strong>{{team.points}}</strong></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/helpers/Loader'
import {getTeamsInOrder} from '../utils'

export default {
  name: 'Stanging',
  components: {
    'v-loader': Loader
  },
  data: () => {
    return {
      teams: []
    }
  },
  beforeMount () {
    getTeamsInOrder()
      .then(teams => {
        this.teams = teams
      })
      .catch(error => {
        console.error(error)
      })
  },
  methods: {
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
    grid-template-columns: 25px 130px repeat(6, 25px) 35px 25px;

    text-align: center;
  }

  .teams {
    text-align: left;
  }

</style>
