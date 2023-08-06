<template >
    <header class="seller-header home-layout">
        <div class="add-stay">
            <span v-html="getSvg('plus')"></span>
            <span>Add Stay</span>
        </div>
        <h1 class="seller-title">My Dashboard</h1>

    </header>
    <Charts></Charts>
    <section v-if="stay" class="stay-edit home-layout">


        <table class="seller-data">
            <thead>
                <tr class="table-headers">
                    <th>Booker</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Guests</th>
                    <th>Total Price</th>
                    <th>Stay</th>
                    <th>Status</th>
                    <th>Actions</th>
                    <!-- <th>Status</th>
                    <th>Actions</th> -->
                </tr>
            </thead>
            <tbody>
                <!-- <tr v-for="stay in user.stays" :key="stay._id"> -->
                <tr v-for="order in orders" :key="order._id">
                    <td>{{ order.buyer.fullname }}</td>
                    <td>{{ order.startDate }}</td>
                    <td>{{ order.endDate }}</td>
                    <td>{{ order.guests.adults }}</td>  
                    <td>${{ order.totalPrice }}</td>
                    <td>{{ order.stay.name }}</td>
                    <td>{{ order.status }}</td>
                    <td class="actions"><button class="approve-order">Approve</button><button class="decline-order">Decline</button></td>
                    <!-- <td>{{ stay.name }}</td>
                        <td>{{ stay.name }}</td> -->
                        <!-- <td>{{ item.quantity }}</td> -->
                        <!-- <td>{{ stay.price }}</td> -->
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
import { svgService } from '../services/svg.service.js'
import Charts from '../cmps/Charts.vue'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
// import { stayService } from '../services/stay.service.local.js'
import { stayService } from '../services/stay.service.js'
export default {
    data() {
        return {
            stay: null,
            user: null,
            orders: [{
                "_id": "64cbe108d24925039955b3b2",
                "hostId": "622f3403e36c59e6164faf93",
                "createdAt": "1670422436153",
                "buyer": {
                    "_id": "622f3403e36c59e6164faf93",
                    "fullname": "Patty And Beckett"
                },
                "totalPrice": "1200.7",
                "startDate": "07/12/2022",
                "endDate": "09/12/2022",
                "guests": {
                    "adults": 1,
                    "kids": 0
                },
                "stay": {
                    "_id": "622f337a75c7d36e498aaaf8",
                    "name": "Westin Kaanapali KORVN 2BR",
                    "price": 595
                },
                "msgs": [],
                "status": "approved"
            },
            {
                "_id": "64cbe108d24925039955b3b2",
                "hostId": "622f3403e36c59e6164faf93",
                "createdAt": "1670422436153",
                "buyer": {
                    "_id": "622f3403e36c59e6164faf93",
                    "fullname": "Patty And Beckett"
                },
                "totalPrice": "1200.7",
                "startDate": "07/12/2022",
                "endDate": "09/12/2022",
                "guests": {
                    "adults": 1,
                    "kids": 0
                },
                "stay": {
                    "_id": "622f337a75c7d36e498aaaf8",
                    "name": "Westin Kaanapali KORVN 2BR",
                    "price": 595
                },
                "msgs": [],
                "status": "approved"
            },
            {
                "_id": "64cbe108d24925039955b3b2",
                "hostId": "622f3403e36c59e6164faf93",
                "createdAt": "1670422436153",
                "buyer": {
                    "_id": "622f3403e36c59e6164faf93",
                    "fullname": "Patty And Beckett"
                },
                "totalPrice": "1200.7",
                "startDate": "07/12/2022",
                "endDate": "09/12/2022",
                "guests": {
                    "adults": 1,
                    "kids": 0
                },
                "stay": {
                    "_id": "622f337a75c7d36e498aaaf8",
                    "name": "Westin Kaanapali KORVN 2BR",
                    "price": 595
                },
                "msgs": [],
                "status": "approved"
            },
            {
                "_id": "64cbe108d24925039955b3b2",
                "hostId": "622f3403e36c59e6164faf93",
                "createdAt": "1670422436153",
                "buyer": {
                    "_id": "622f3403e36c59e6164faf93",
                    "fullname": "Patty And Beckett"
                },
                "totalPrice": "1200.7",
                "startDate": "07/12/2022",
                "endDate": "09/12/2022",
                "guests": {
                    "adults": 1,
                    "kids": 0
                },
                "stay": {
                    "_id": "622f337a75c7d36e498aaaf8",
                    "name": "Westin Kaanapali KORVN 2BR",
                    "price": 595
                },
                "msgs": [],
                "status": "approved"
            },]
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
                if (user) {

                }
                showSuccessMsg('Added/Updated succssefully')
                this.$router.push('/')
            } catch (err) {
                showErrorMsg("Couldn't add/update stay")

            }
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
    },
    computed: {
        stay() {
            return this.$store.getters.loggedinUser
        }
    },
    components: {
        Charts,

    }




}

</script>
