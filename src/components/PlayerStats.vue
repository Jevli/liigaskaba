<template>
    <div>
        {{match}}
    </div>
</template>

<script>
import Loader from '@/components/helpers/Loader'

export default {
  name: 'PlayerStats',
  components: {
    'v-loader': Loader
  },
  data () {
    return {
      match: {}
    }
  },
  beforeMount () {
  }
}
</script>

<style scoped>

</style>
