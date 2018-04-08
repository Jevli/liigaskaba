<template>
  <div class="mainview">
    <div class="header">
      <span>
        <router-link to="/login" v-if="!currentUser">Login</router-link>
        <router-link to="/logout" v-if="currentUser">Logout</router-link>
      </span>
    </div>
    <div class="tabs">
      <div class="tab standing" @click="updateState('standing')">
        Sarjataulukko
      </div>
      <div class="tab list" @click="updateState('list')">
        Ottelut
      </div>
      <div class="tab contest" @click="updateState('contest')">
        Potkupalloveikkaus
      </div>
    </div>
    <div class="content">
      <v-list-games v-if="state === 'list'" />
      <v-standing v-if="state === 'standing'" />
      <v-contest v-if="state === 'contest'" />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

import ListGames from '@/components/ListGames'
import Standing from '@/components/Standing'
import Contest from '@/components/Contest'

export default {
  name: 'MainView',
  components: {
    'v-list-games': ListGames,
    'v-standing': Standing,
    'v-contest': Contest
  },
  data: () => {
    return {
      state: undefined,
      currentUser: firebase.auth().currentUser
    }
  },
  methods: {
    updateState: function (state) {
      if (this.state) {
        const oldDiv = document.getElementsByClassName(this.state)[0]
        oldDiv.style.backgroundColor = 'white'
        oldDiv.style.color = 'black'
      }
      this.state = state
      const newDiv = document.getElementsByClassName(state)[0]
      newDiv.style.backgroundColor = 'black'
      newDiv.style.color = 'white'
    }
  }
}
</script>

<style scoped>
  .mainview {
    display: grid;
    grid-template-rows: 1.5em 2em auto;
    grid-row-gap: 0.5em;
  }

  .header {
    margin: 0 0.25em;
    display: flex;
    justify-content: flex-end;
  }

  .tabs {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .tab {
    margin: 0 5px;
    border: solid 1px black;
    border-radius: 1em;
    padding: 0.45em 1em;
  }

  .tab:hover {
    background-color: gray;
    cursor: pointer;
  }
</style>
