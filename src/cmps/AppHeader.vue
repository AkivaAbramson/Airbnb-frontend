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
        <span class="search-icon">
          <!-- <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#ffffff}</style><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg> -->
        </span>
      </section>
  
      <nav>
        <RouterLink to="/stay/edit/">Airanbnb your home</RouterLink>
        <RouterLink to="/login">
          <div class="profile-menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="height: 16px; width: 16px; stroke: #222222; stroke-width: 3; overflow: visible;"><g fill="none"><path d="M2 16h28M2 24h28M2 8h28"></path></g></svg>
            <section class="loggedin-user" v-if="loggedInUser">
              <img :src="loggedInUser.imgUrl" />
            </section>
            <svg class="profile-picture" v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" height="30px" width="30px" style="fill: #717171;"><path d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 0 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.67 12.67 0 0 1 16 28.7z"></path></svg>
          </div>
        </RouterLink>
      </nav>
  
    </header>
    <AppHeaderFilter class="main-layout"></AppHeaderFilter>
  
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