<template>
    <section v-if="stay" class="book">
        <div class="btn-container">
            <button class="btn btn-return" @click="$router.push({ name: 'Stay', params: { stayId }, query: $route.query })">
                <i v-html="getSvg('down')"></i>
            </button>
        </div>
        <h1>
            Request to book
        </h1>
        <section class="book-content">
            <article class="shadow">
                <h2>Your trip</h2>
                <div class="trip-details flex justify-between">
                    <div class="flex column justify-between">
                        <h3>Dates</h3>
                        {{ dates }}
                    </div>
                    <button @click="modal = 'date'" class="btn btn-edit bold underline">Edit</button>
                </div>
                <div class="trip-details flex justify-between">
                    <div class="flex column justify-between">
                        <h3>Guests</h3>
                        {{ guestCount }}
                    </div>
                    <button @click="modal = 'guest'" class="btn btn-edit bold underline">Edit</button>
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
                            <span>${{ formatNumber(price) }} x {{ nightsTxt }}</span>
                            <span>${{ formatNumber(priceNights()) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="underline">Airbnb service fee</span>
                            <span>${{ formatNumber(priceNights() * 14 / 100) }}</span>
                        </div>
                    </div>
                    <div class="bold flex justify-between">
                        <span class="bold">Total</span>
                        <span class="bold">${{ formatNumber(totalPrice()) }}</span>
                    </div>
                </article>
            </article>
            <div class="btn-wrapper">
                Request to book
                <FancyBtn :content="'Request to book'" @click="createOrder()" />
            </div>
            <section class="modal-edit" :class="{ show: modal }" @click.self="modal = null">
                <div class="modal-wrapper" :class="{ show: modal }" @click.self="modal = null">
                    <section v-if="modal === 'guest'" class="modal-guest" :class="{ show: modal === 'guest' }">
                        <header>Guests</header>
                        <div class="notify">This place has a maximum of {{ stay.capacity }} guests. not including infants.
                        </div>
                        <GuestPicker :capacity="stay.capacity" @guest-count="updateCounts" />
                        <footer class="full">
                            <button class="btn btn-cancel bold underline" @click="modal = null">Cancel</button>
                            <button class="btn btn-save bold" @click="updateQuery(), (modal = null)">Save</button>
                        </footer>
                    </section>
                    <DatePicker v-if="modal === 'date'" :columns="2" :range="range" :attributes="attributes"
                        :header="{ title: nightsTxt, subtitle: subtitle }" :footer="{ clear: true, save: true }"
                        :class="{ show: modal === 'date' }" @close="modal = null" @date-change="onDateChange" @save-changes="updateQuery" />
                </div>
            </section>
        </section>
    </section>
</template>

<script>
// import { stayService } from '../services/stay.service.local'
import { userService } from '../services/user.service.local'
import { storageService } from '../services/async-storage.service'
import { utilService } from '../services/util.service'
import { svgService } from '../services/svg.service'
import { ref } from 'vue'
import FancyBtn from '../cmps/FancyBtn.vue'
import RateAndRev from '../cmps/RateAndRev.vue'
import GuestPicker from '../cmps/GuestPicker.vue'
import DatePicker from '../cmps/DatePicker.vue'

const guestTypes = ['adult', 'child', 'infant', 'pet']

export default {
    setup() {
        const range = ref({
            start: '',
            end: '',
        })
        const attributes = ref([{
            attributes: {
                dates: range
            }
        }])
        return { range, attributes }
    },
    data() {
        return {
            stay: null,
            stayId: null,
            stayImage: null,
            modal: null,
            adult: 1,
            child: 0,
            infant: 0,
            pet: 0,
        }
    },
    async created() {
        try {
            await this.loadStay()
            this.adult = this.$route.query.adult
            this.child = this.$route.query.child
            this.infant = this.$route.query.infant
            this.pet = this.$route.query.pet
            this.range.start = this.$route.query.startDate
            this.range.end = this.$route.query.endDate
        } catch (err) {
            console.log(err)
            this.$router.push('/')
        }
    },
    methods: {
        async loadStay() {
            try {
                this.stayId = this.$route.params.stayId
                if (!this.$store.getters.stay || !this.$store.getters.stay._id === this.stayId) {
                    this.stay = await this.$store.dispatch({ type: 'setStay', id: this.stayId })
                }
                this.stayImage = await this.getStayImage()
            } catch (err) {
                throw 'Failed to load stay '
            }
        },
        nights() {
            const checkin = new Date(this.getCheckin()).getTime()
            const checkout = new Date(this.getCheckout()).getTime()
            if (!checkin || !checkout) return
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
        formatNumber(num, decimal = 2) {
            return utilService.formatNumber(num, decimal)
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
        updateCounts(query) {
            for (let type of guestTypes) {
                this[type] = query[type] ?? 0
            }
        },
        onDateChange({ startDate, endDate }) {
            if (startDate && endDate) {
                this.range.start = startDate
                this.range.end = endDate
            }
        },
        updateQuery() {
            const newQuery = Object.assign({}, this.$route.query)
            for (const type of guestTypes) {
                if (this[type]) {
                    newQuery[type] = this[type]
                } else {
                    delete newQuery[type]
                }
            }
            if (this.range.start && this.range.end) {
                newQuery.startDate = this.range.start
                newQuery.endDate = this.range.end
            }
            this.modal = null
            this.$router.replace({ query: newQuery })
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
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
            const night = this.nights()
            return night ? utilService.formatPlural({ night }) : 'Select dates'
        },
        subtitle() {
            return this.nights() ? `${this.stay.bedrooms} bedrooms · ${this.stay.bathrooms} baths` : 'Add your travel dates for exact pricing'
        },
        price() {
            return this.stay.price
        }
    },
    components: {
        FancyBtn,
        RateAndRev,
        GuestPicker,
        DatePicker,
    }
}
</script>