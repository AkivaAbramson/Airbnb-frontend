<template>
  <section >
    <div v-if="!smallHeader" class="overlay" @click="closeBigModal"></div>
    <AppHeader :smallHeader="smallHeader" @bigHeader="bigHeader"/>
    <Transition name="slide-up-down">
      <BigHeader v-if="!smallHeader" @closeHeader="closeBigModal"/>
    </Transition>
    <RouterView />

    <UserMsg/>
  </section>
</template>

<script>


import { userService } from './services/user.service'
import { store } from './store/store'

import AppHeader from './cmps/AppHeader.vue'
import AppHeaderFilter from './cmps/AppHeaderFilter.vue'
import BigHeader from './cmps/BigHeader.vue'
import UserMsg from './cmps/UserMsg.vue'


export default {
  data() {
    return {
      smallHeader:true
    }
  },
  methods: {
    bigHeader(topic){
      this.smallHeader = false
      window.addEventListener('scroll', this.closeBigModal)
    },
    closeBigModal(){
      this.smallHeader = true
      window.removeEventListener('scroll', this.closeBigModal)

    }
  },

  created() {
    // console.log('Vue App created')
    
    const user = userService.getLoggedinUser()
    if (user)  store.commit({type: 'setLoggedinUser', user})
  },
  components: {
    AppHeader,
    AppHeaderFilter,
    BigHeader,
    UserMsg
  },
}
</script>

<style>
.slide-up-down-enter-active,
.slide-up-down-leave-active {
  transition: all 0.6s ease;
}
.slide-up-down-enter, .slide-up-down-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
.slide-up-down-enter-to, .slide-up-down-leave {
  opacity: 1;
  transform: translateY(0);
}
.overlay {
  position: fixed;
  top: 0%;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust the alpha value to control darkness */
  z-index: 2; /* Make sure the overlay is above other elements except the BigHeader */
}

</style>