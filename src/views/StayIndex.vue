<template>
  <section class="stay-index main-layout">
    <!-- <pre>{{stays}}</pre> -->
    
    <!-- <StayFilter @filter="setFilterBy" /> -->
    <StayList v-if="stays" :stays="stays" />
  </section>

  
</template>

<script>
import StayList from '../cmps/StayList.vue'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { stayService } from '../services/stay.service.local'
// import { getActionRemoveCar, getActionUpdateCar, getActionAddCarMsg } from '../store/car.store'
export default {
  name: 'StayIndex',
  components: {
    StayList,
  },
  data() {
    return {
      
    }
  },
  computed: {
    
    stays() {
      return this.$store.getters.stays
    }
  },
  created() {
    this.$store.dispatch({type: 'loadStays'})
  },
  methods: {
    
  }


}
</script>
