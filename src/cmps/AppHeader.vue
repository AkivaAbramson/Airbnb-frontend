<template>

  <section class="main-layout">
    <header class="small-header">
      <nav>
        <RouterLink to="/">
          <span role="img" aria-label="logo">airanbnb</span>
        </RouterLink>
      </nav>
  
      <section class="search-container">
        <span>Anywhere</span>
        <span>|</span>
        <span>Any week</span>
        <span>|</span>
        <span>Add guests</span>
        <span>icon</span>
      </section>
  
      <nav>
        <RouterLink to="/stay/edit/">Airanbnb your home</RouterLink>
        <RouterLink to="/login">Login / Signup</RouterLink>
      </nav>
  
      <section class="loggedin-user" v-if="loggedInUser">
        <RouterLink :to="`/user/${loggedInUser._id}`">
          {{ loggedInUser.fullname }}
        </RouterLink>
        <span>{{ loggedInUser.score?.toLocaleString() }}</span>
        <img :src="loggedInUser.imgUrl" />
      </section>
  
    </header>
  
    <AppHeaderFilter></AppHeaderFilter>
  </section>

</template>

<script>
import AppHeaderFilter from './AppHeaderFilter.vue'
export default {
  name: 'header-app',
  data() {

    return {

    }

  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  },
  created() {

  },
  components: {
    AppHeaderFilter
  }
}
</script>