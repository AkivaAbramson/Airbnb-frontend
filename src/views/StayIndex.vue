<template>
  <section class="stay-index home-layout">
    <!-- <pre>{{stays}}</pre> -->
    
    <!-- <StayFilter @filter="setFilterBy" /> -->
    <StayList v-if="stays" 
      :stays="stays"
      @removed="removeStay" />
  </section>

  
</template>

<script>
import StayList from '../cmps/StayList.vue'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay.service.local'
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
    async removeStay(stayId) {
      try{
        await this.$store.dispatch({ type: 'removeStay', id: stayId })
        showSuccessMsg('Stay Removed')
      } catch (err) {
                showErrorMsg("Couldn't Remove stay")
                throw new Error(err)
            }
    },
    
  }


}
</script>
