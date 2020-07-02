<template>
  <div id="app" style="overflow-x: hidden;">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
  created() {
    if (localStorage.access_token) {
      this.$store.commit('SET_LOGIN', true)
      this.$store.dispatch('setUser', {
        email: localStorage.email, 
        name: localStorage.name
      })
    }
    
  }
}
</script>
