<template>
  <div class="login">
    <h3>Kirjaudu sisään</h3>
    <input type="text" v-model="login.email" placeholder="Email"><br>
    <input type="password" v-model="login.pwd" placeholder="Password"><br>
    <button @click="$emit('signIn', login)">Login</button><br>
    <span>Jos ei ole tiliä, <a href="#" @click="$emit('closeLogin')"> mee takas </a></span>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: () => {
    return {
      login: {
        email: '',
        pwd: ''
      }
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
