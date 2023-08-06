<template>
    <Charts></Charts>
    <section v-if="stay" class="stay-edit">

        <div class="total-revenue">
            <h1>Total revenue</h1>
            <div class="revenue-info">
                <h4>This month</h4>
                <h4>$5355</h4>
            </div>
            <div class="revenue-info">
                <h4>This year</h4>
                <h4>$10,710</h4>
            </div>
            <div class="revenue-info">
                <h4>Total income</h4>
                <h4>$16,492</h4>
            </div>


        </div>
        <table>
            <thead>
              <tr>
                <th>Dates</th>
                <th>Nights</th>
                <th>Guests</th>
                <th>Price/night</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="stay in user.stays" :key="stay._id">
                <td>{{ stay.name }}</td>
                <td>{{ stay.name }}</td>
                <td>{{ stay.name }}</td>
                <td>{{ stay.name }}</td>
                <td>{{ stay.name }}</td>
                <td>{{ stay.name }}</td>
                <td>{{ stay.name }}</td>
                <!-- <td>{{ item.quantity }}</td> -->
                <td>{{ stay.price }}</td>
              </tr>
            </tbody>
          </table> 

          
          
        
        
        <form @submit.prevent="saveStay" class="flex space-between align-center">
            <label for="name">Name:</label>
            <input id="name" class="input" v-model="stay.name" type="text">
            
            <label for="price">Price:</label>
            <input id="price" class="input" v-model="stay.price" type="number">

            <button class="btn">Add Your'e Stay!</button>
        </form>
    </section>
</template>
<script>
import Charts from '../cmps/Charts.vue'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
// import { stayService } from '../services/stay.service.local.js'
import { stayService } from '../services/stay.service.js'
export default {
    data() {
        return {
            stay: null,
            user: null
        }
    },
    // watch: {
    //     async '$route.params'() {
    //         const { stayId } = this.$route.params;
    //         if (stayId) {
    //             try {
    //                 const stay = await stayService.getById(stayId)
    //                 this.stay = stay
    //             } catch (error) {
    //                 console.error('Error fetching stay:', error)
    //             }
    //         } else {
    //             this.stay = stayService.getEmptyStay()
    //             console.log(this.stay)
    //         }
    //     },
    //     immediate: true,
    // },
    async created() {
        const { stayId } = this.$route.params;
        if (stayId) {
            try {
            const stay = await stayService.getById(stayId)
            this.stay = stay
            } catch (error) {
            console.error('Error fetching stay:', error)
            }
        } else {
        this.stay = stayService.getEmptyStay()
        // console.log(this.stay)
        }
        this.user = this.$store.getters.loggedinUser
    },
    watch: {
        '$route.params'() {
            this.handleRouteParamsChange()
        },
    },
    methods: {
        async handleRouteParamsChange() {
            const { stayId } = this.$route.params
            if (stayId) {
                try {
                    const stay = await stayService.getById(stayId)
                    this.stay = stay
                } catch (error) {
                    console.error('Error fetching stay:', error)
                }
            } else {
                this.stay = stayService.getEmptyStay()
            }
        },
        async saveStay() {
            // console.log(this.stay)
            try {
                await this.$store.dispatch({ type: 'saveStay', stay: this.stay })
                await this.$store.dispatch({ type: 'setToUser', stay: this.stay })
                const user = await this.$store.getters.loggedinUser
                if(user){
                    
                }
                showSuccessMsg('Added/Updated succssefully')
                this.$router.push('/')
            } catch (err) {
                showErrorMsg("Couldn't add/update stay")
                
            }
        },
    },
    computed: {
        stay(){
            return this.$store.getters.loggedinUser
        }
    },
    components:{
        Charts,

    }

    
}

</script>
