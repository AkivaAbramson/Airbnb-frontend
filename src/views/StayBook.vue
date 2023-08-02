<template>
    <section v-if="stay" class="book">
        <h1>Confirm and pay</h1>
        <section class="book-content">
            <article class="shadow">
                <h2>Your trip</h2>
                <div class="trip-details flex justify-between">
                    <div class="flex column justify-between">
                        <h3>Dates</h3>
                        {{ dates }}
                    </div>
                    <button class="btn btn-edit bold underline">Edit</button>
                </div>
                <div class="trip-details flex justify-between">
                    <div class="flex column justify-between">
                        <h3>Guests</h3>
                        {{ guestCount }}
                    </div>
                    <button class="btn btn-edit bold underline">Edit</button>
                </div>
            </article>
            <article class="sticky-details">
                <article class="shadow place-details">
                    <img v-if="stayImage" :src="stayImage" />
                    <div class="place-desc flex column justify-between">
                        <div>
                            <div class="entire">Entire stay</div>
                            <div class="stay-name">{{ stay.name }}</div>
                        </div>
                        <RateAndRev :reviews="stay.reviews" :bracket="true" />
                    </div>
                </article>
                <article>
                    <div class="price-details shadow">
                        <h2>Price details</h2>
                        <div class="flex justify-between">
                            <span>${{ formatNumber(stay.price.toFixed(2)) }} x {{ nightsTxt }}</span>
                            <span>${{ formatNumber(priceNights().toFixed(2)) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="underline">Airbnb service fee</span>
                            <span>${{ formatNumber(parseFloat(priceNights() * 14 / 100).toFixed(2)) }}</span>
                        </div>
                    </div>
                    <div class="bold flex justify-between">
                        <span class="bold">Total</span>
                        <span class="bold">${{ formatNumber(parseFloat(totalPrice()).toFixed(2)) }}</span>
                    </div>
                </article>
            </article>
            <FancyBtn :content="'Reserve'" @click="createOrder()" />
        </section>
    </section>
</template>

<script>
import { stayService } from '../services/stay.service.local'
import { userService } from '../services/user.service.local'
import { storageService } from '../services/async-storage.service'
import { utilService } from '../services/util.service'
import FancyBtn from '../cmps/FancyBtn.vue'
import RateAndRev from '../cmps/RateAndRev.vue'

export default {
    data() {
        return {
            stay: null,
            stayId: null,
            stayImage: null,
        }
    },
    async created() {
        try {
            await this.loadStay()
        } catch (err) {
            console.log(err)
            this.$router.push('/')
        }
    },
    methods: {
        async loadStay() {
            try {
                this.stayId = this.$route.params.stayId
                this.stay = await stayService.getById(this.stayId)
                this.stayImage = await this.getStayImage()
            } catch (err) {
                throw 'Failed to load stay '
            }
        },
        nights() {
            const checkin = new Date(this.getCheckin()).getTime()
            const checkout = new Date(this.getCheckout()).getTime()
            return parseInt((checkout - checkin) / 1000 / 60 / 60 / 24)
        },
        getCheckin() {
            return this.$route.query.startDate
        },
        getCheckout() {
            return this.$route.query.endDate
        },
        async getStayImage() {
            const res = await fetch(this.stay.imgUrls[0])
            return res.status === 200 ? this.stay.imgUrls[0] : 'src/assets/defaultStay.png'
        },
        formatNumber(num) {
            return utilService.formatNumber(num)
        },
        priceNights() {
            return this.nights() * this.stay.price
        },
        totalPrice() {
            return this.priceNights() * 114 / 100
        },
        async createOrder() {
            const user = userService.getLoggedinUser()
            if (!user) return
            const order = {
                _id: utilService.makeId(),
                hostId: this.stay.host._id,
                createdAt: Date.now(),
                buyer: {
                    _id: user._id,
                    fullname: user.fullname,
                },
                totalPrice: this.totalPrice(),
                startDate: this.$route.query.startDate,
                endDate: this.$route.query.endDate,
                guests: {
                    adults: this.$route.query.adult,
                    kids: this.$route.query.child || 0,
                    infants: this.$route.query.infant || 0,
                    pets: this.$route.query.pet || 0,
                },
                stay: {
                    _id: this.stayId,
                    name: this.stay.name,
                    price: this.stay.price,
                },
                msgs: [],
                status: "pending"
            }
            await storageService.post('order', order)
            this.$router.push('/')
        },
    },
    computed: {
        dates() {
            const checkin = new Date(this.getCheckin())
            const checkout = new Date(this.getCheckout())
            let from = (new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(checkin.getTime()))
            let to = ''
            if (checkin.getYear() !== checkout.getYear()) {
                from += `, ${checkin.getYear()}`
                to = (new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(checkout.getTime()))
                to += `, ${checkout.getYear()}`
            } else if (checkin.getMonth() !== checkout.getMonth()) {
                to = (new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(checkout.getTime()))
            } else {
                to = checkout.getDate()
            }
            return from + ' - ' + to
        },
        guestCount() {
            let countMap = {
                guest: parseInt(this.$route.query.adult) + parseInt(this.$route.query.child || 0),
                infant: this.$route.query.infant,
                pet: this.$route.query.pet,
            }
            return utilService.formatPlural(countMap, ', ')
        },
        nightsTxt() {
            return utilService.formatPlural({ night: this.nights() })
        },
    },
    components: {
        FancyBtn,
        RateAndRev,
    }
}
</script>