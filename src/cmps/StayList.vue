<template lang="">
    <section class="stay-list">
        <ul v-if="stays.length" class="ul-list">
            <StayPreview class="li-list"
            v-for="stay in stays" 
            :key="stay._id"   
            :stay="stay" 
            @removed="$emit('removed', stay._id)"
             
            />
          </ul>
          <p v-else>No stays to show..</p>
    </section>
</template>


<script>
import StayPreview from './StayPreview.vue'
export default {
    data(){
      return {
        user: null
      }
    },
    name: 'StayList',
    props: ['stays'],
    components:{
      StayPreview
    },
    created() {
      
      
    
  },
    computed: {
    
    
    },
  }
</script>


