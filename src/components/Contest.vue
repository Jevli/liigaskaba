<template>
  <div class="contest">
    <v-loader v-if="!msg"/>
    <div class="contest" v-if="msg">
      <h1>{{msg}}</h1>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/helpers/Loader'

export default {
  name: 'Contest',
  components: {
    'v-loader': Loader
  },
  data () {
    return {
      msg: ''
    }
  },
  beforeMount () {
    setTimeout(() => {
      this.msg = 'Potkupalloveikkaus tulokset tulee tänne'
    }, 2000)
  },
  methods: {
  }
}
</script>
