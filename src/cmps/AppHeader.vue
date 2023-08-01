<template>
  <section class="home-layout">
    <header class="small-header" >
      <nav>
        <RouterLink to="/">
          <span role="img" aria-label="logo">airanbnb</span>
        </RouterLink>
      </nav>

      <section v-if="isSearchOpened" class="search-container" @click="hideContainer">
        <span @click="locModal">Anywhere</span>
        <span class="search-divider"></span>
        <span @click="weekModal">Any week</span>
        <span class="search-divider"></span>
        <span @click="guestsModal" class="light-search-font">Add guests</span>
        <span class="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation"
            focusable="false"
            style="fill: none; stroke: white; stroke-width: 5.33333; overflow: visible;">
            <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
          </svg>
        </span>
      </section>

        <!-- <FilterModal v-if="location"/>
        <FilterModal v-if="week"/>
        <FilterModal v-if="guests"/> -->

      <nav>
        <RouterLink to="/stay/edit/">Airanbnb your home</RouterLink>
        <div class="profile-menu" @click="toggleModal">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation"
            focusable="false" style="height: 16px; width: 16px; stroke: #222222; stroke-width: 3; overflow: visible;">
            <g fill="none">
              <path d="M2 16h28M2 24h28M2 8h28"></path>
            </g>
          </svg>
          <section class="loggedin-user" v-if="loggedInUser">
            <img :src="loggedInUser.imgUrl" />
          </section>
          <svg class="profile-picture" v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"
            role="presentation" focusable="false" height="30px" width="30px" style="fill: #717171;">
            <path
              d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 0 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.67 12.67 0 0 1 16 28.7z">
            </path>
          </svg>
          <NavModal v-if="modalVisible" />
        </div>

      </nav>

    </header>
    <AppHeaderFilter class="home-layout"></AppHeaderFilter>

  </section>
</template>

<script>
import AppHeaderFilter from './AppHeaderFilter.vue'
import NavModal from './NavModal.vue'

export default {
  name: 'header-app',

  props:['smallHeader'],

  data() {

    return {
      isSearchOpened: true,
      modalVisible: false,
      location: false,
      week: false,
      guests: false,

    }

  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  },
  created() {
    // this.isSearchOpened = true
  },
  methods: {
    toggleModal() {
      this.modalVisible = !this.modalVisible
    },
    locModal(){
      this.location = true
      this.week = false
      this.guests = false
      this.$emit('bigHeader', this.location)
    },
    weekModal(){
      this.week = true
      this.location = false
      this.guests = false
      this.$emit('bigHeader', this.week)
      console.log(this.week)
    },
    guestsModal(){
      this.guests = true
      this.location = false
      this.week = false
      this.$emit('bigHeader', this.guests)
      console.log(this.guests)
    },
    hideContainer(){
      this.isSearchOpened = false
    }
  },
  watch: {
    smallHeader: {
      handler(){
        this.isSearchOpened = true
      }
    },
  },
  components: {
    AppHeaderFilter,
    NavModal,
  }

  // setup() {
  //   // Data
  //   const showModal = ref({
  //     location: false,
  //     week: false,
  //     guests: false,
  //   });

  //   // Methods
  //   const openModal = (modalName) => {
  //     showModal.value[modalName] = true;
  //   };

  //   const closeModal = (modalName) => {
  //     showModal.value[modalName] = false;
  //   };

  //   // Computed
  //   // You can add computed properties here if needed

  //   return {
  //     showModal,
  //     openModal,
  //     closeModal,
  //   }
  // },

}
</script>