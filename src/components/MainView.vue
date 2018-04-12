<template>
  <div class="mainview">
    <div class="header">
      <span>
        <a href="#" v-if="!currentUser" @click="login=true">Login</a>
        <a href="#" v-if="currentUser" v-on:click="logout()">Logout</a>
      </span>
    </div>
    <div class="tabs">
      <div class="tab standing" @click="updateState('standing')">
        Sarjataulukko
      </div>
      <div class="tab list" @click="updateState('list')">
        Ottelut
      </div>
      <div class="tab contest" @click="updateState('contest')" v-if="currentUser">
        Potkupalloveikkaus
      </div>
    </div>
    <div class="content">
      <v-list-games v-if="state === 'list' && !login" />
      <v-standing v-if="state === 'standing' && !login" />
      <v-contest v-if="state === 'contest' && !login" />
      <v-login v-if="login" v-on:signIn="signIn($event)" />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

import ListGames from '@/components/ListGames'
import Standing from '@/components/Standing'
import Contest from '@/components/Contest'
import Login from '@/components/helpers/Login'

export default {
  name: 'MainView',
  components: {
    'v-list-games': ListGames,
    'v-standing': Standing,
    'v-contest': Contest,
    'v-login': Login
  },
  data: () => {
    return {
      state: undefined,
      login: false,
      currentUser: firebase.auth().currentUser
    }
  },
  beforeMount () {
    this.currentUser = firebase.auth().currentUser
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
    },
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.currentUser = undefined
      }, (error) => {
        console.error('Sign Out Error', error)
      })
    },
    signIn: function (login) {
      firebase.auth().signInWithEmailAndPassword(login.email, login.pwd).then(
        (user) => {
          this.currentUser = firebase.auth().currentUser
          this.login = false
        }, (err) => {
          alert('There was on error in login: ' + err)
        }
      )
    }
  }
}
</script>

<style scoped>
  .mainview {
    display: grid;
    grid-template-rows: 1em 4em auto;
    grid-row-gap: 1em;
    min-width: 400px;
    max-width: 50vw;
    margin: 0 auto;
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
    margin: 1px 2.5px;
    border: solid 1px black;
    border-radius: 1em;
    padding: 0.45em 1em;
  }

  .tab:hover {
    background-color: gray;
    cursor: pointer;
  }
</style>
