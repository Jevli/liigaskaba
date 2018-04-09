<template>
  <div class="login">
    <h3>Kirjaudu sisään</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="pwd" placeholder="Password"><br>
    <button v-on:click="signIn">Login</button><br>
    <span>Jos ei ole tiliä, <router-link to="/main">me takas.</router-link></span>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'login',
  data: () => {
    return {
      email: '',
      pwd: ''
    }
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.pwd).then(
        (user) => {
          this.$router.replace('main')
        }, (err) => {
          alert('There was on error in login: ' + err)
        }
      )
    }
  }
}

</script>

<style scoped>
  .login {
    margin-top: 10em;
    width: 80%;
    margin: 0 auto;
  }
  .login * {
    box-sizing: border-box;
  }
  input {
    margin: 1em 0;
    padding: 1.5em;
  }
  button {
    margin: 1em 0;
    padding: 1.5em 5em;
    border-radius: 0.5em;
    border: none;
    color: white;
    background: green;
  }
</style>
