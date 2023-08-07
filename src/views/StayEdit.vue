<template >
    <section class="stay-edit home-layout">
        <header class="seller-header home-layout">
            <!-- <div class="add-stay">
                <span v-html="getSvg('plus')"></span>
                <span>Add Stay</span>
            </div>
            <h1 class="seller-title">My Dashboard</h1> -->

        </header>
        <main>
            <Charts class="charts home-layout"></Charts>
            <section class="table-container stay-edit">


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
                            <th class="margin-action">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- <tr v-for="stay in user.stays" :key="stay._id"> -->
                        <tr v-for="i in orders.length" :key="orders[i - 1]._id">
                            <td>{{ orders[i - 1].buyer.fullname }}</td>
                            <td>{{ orders[i - 1].startDate }}</td>
                            <td>{{ orders[i - 1].endDate }}</td>
                            <td>{{ orders[i - 1].guests.adults }}</td>
                            <td>${{ orders[i - 1].totalPrice }}</td>
                            <td>{{ orders[i - 1].stay.name }}</td>
                            <td>{{ orders[i - 1].status }}</td>
                            <td class="actions"
                                :class="{ approve: orders[i - 1].status == 'approved', decline: orders[i - 1].status == 'declined' }">
                                <button class="approve-order" @click="orders[i - 1].status = 'approved'">Approve</button>
                                <button class="decline-order" @click="orders[i - 1].status = 'declined'">Decline</button>
                            </td>

                        </tr>
                    </tbody>
                </table>
                <br><br>

                <!-- <form @submit.prevent="saveStay" class="flex space-between align-center">
                    <label for="name">Name:</label>
                    <input id="name" class="input" v-model="stay.name" type="text">

                    <label for="price">Price:</label>
                    <input id="price" class="input" v-model="stay.price" type="number">

                    <button class="btn">Add Your'e Stay!</button>
                </form> -->
            </section>
        </main>
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
            orderStatus: {},
            orders: [{
                "_id": "64cbe108d24925039955b3b2",
                "hostId": "622f3403e36c59e6164faf93",
                "createdAt": "1670422436153",
                "buyer": {
                    "_id": "622f3403e36c59e6164faf93",
                    "fullname": "Akiva Abramson",
                    "imgUrl": "https://res.cloudinary.com/dqjq5smb5/image/upload/v1691356949/akiva_bglys6.png"
                },
                "totalPrice": "948",
                "startDate": "10/8/2023",
                "endDate": "14/8/2023",
                "guests": {
                    "adults": 5,
                    "kids": 3
                },
                "stay": {
                    "_id": "622f337a75c7d36e498aaaf8",
                    "name": "Beautiful Seaside Villa with Private Pool",
                    "price": 1200.7
                },
                "msgs": [],
                "status": "pending..."
            },
            {
                "_id": "64cbe108d24925039955b3b2",
                "hostId": "622f3403e36c59e6164faf93",
                "createdAt": "1670422436153",
                "buyer": {
                    "_id": "622f3403e36c59e6164faf93",
                    "fullname": "Rafael Urias",
                    "imgUrl": "https://res.cloudinary.com/dcp3qxsbc/image/upload/v1691308653/Fairbnb/userImages/Beau_afrsws.webp"
                },
                "totalPrice": "1260.4",
                "startDate": "30/4/2023",
                "endDate": "03/5/2023",
                "guests": {
                    "adults": 2,
                    "kids": 0,
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
                    "fullname": "Alex Rodriguez",
                    "imgUrl": "https://res.cloudinary.com/dcp3qxsbc/image/upload/v1691308654/Fairbnb/userImages/Rehan_hk89kv.webp"
                },
                "totalPrice": "790",
                "startDate": "06/10/2022",
                "endDate": "11/10/2022",
                "guests": {
                    "adults": 3,
                    "kids": 1
                },
                "stay": {
                    "_id": "622f337a75c7d36e498aaaf8",
                    "name": "Triple room Barcelona Guell park",
                    "price": 360
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
                    "fullname": "Sheila Turner",
                    "imgUrl": "https://res.cloudinary.com/dcp3qxsbc/image/upload/v1691308655/Fairbnb/userImages/Stacy_pgenqp.webp"
                },
                "totalPrice": '2468.5',
                "startDate": "24/6/2022",
                "endDate": "29/6/2022",
                "guests": {
                    "adults": 8,
                    "kids": 4
                },
                "stay": {
                    "_id": "622f337a75c7d36e498aaaf8",
                    "name": "Westin Kaanapali KORVN 2BR",
                    "price": 520
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
                    "fullname": "Laura Benson",
                    "imgUrl": "https://res.cloudinary.com/dcp3qxsbc/image/upload/v1691308654/Fairbnb/userImages/Robert_jv0ggk.webp"
                },
                "totalPrice": "360",
                "startDate": "07/3/2022",
                "endDate": "09/3/2022",
                "guests": {
                    "adults": 3,
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
                    "fullname": "John Andif",
                    "imgUrl": "https://res.cloudinary.com/dcp3qxsbc/image/upload/v1691308654/Fairbnb/userImages/Eyad_uml7mu.webp"
                },
                "totalPrice": "1355.4",
                "startDate": "12/8/2021",
                "endDate": "16/8/2021",
                "guests": {
                    "adults": 2,
                    "kids": 0
                },
                "stay": {
                    "_id": "622f337a75c7d36e498aaaf8",
                    "name": "Beautiful Seaside Villa with Private Pool",
                    "price": 595
                },
                "msgs": [],
                "status": "approved"
            },
            ]
        }
    },

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
