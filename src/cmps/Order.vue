<template>
    <section class='order'>
        <article class="order-top flex justify-between">
            <span class="top-price bold">${{ formatNumber(price) }}</span>
            <RateAndRev :reviews="stay.reviews" />
        </article>
        <article class="user-input">
            <div class="dates flex">
                <button class="checkin flex column">
                    <span class="title">check-in</span>
                    <span :class="{empty: !startDate }">{{ checkin }}</span>
                </button>
                <button class="flex column">
                    <span class="title">check-out</span>
                    <span :class="{empty: !endDate }">{{ checkout }}</span>
                </button>
            </div>
            <button class="guest-input flex justify-between" @click="toggleGuestModal(true)">
                <div class="guests flex column">
                    <span class="title">guests</span>
                    <span>{{ guestCount }}</span>
                </div>
                <div class="svg-down" :class="{ open: showGuestModal }">
                    <span v-html="getSvg('down')"></span>
                </div>
            </button>
            <GuestPicker v-if="showGuestModal" v-clickout="() => toggleGuestModal(false)" @guest-count="updateQuery"
                :capacity="stay.capacity" />
        </article>
        <FancyBtn :content="'Reserve'" @click="() => $router.push({ name: 'StayBook', params: {stayId: stay._id}, query: $route.query })" />
        <article class="price" v-if="nights()">
            <div class="notify">{{ `You won't be charged yet` }}</div>
            <div class="price-calc shadow">
                <div class="flex justify-between">
                    <span class="underline">${{ formatNumber(price) }} x {{ nightsTxt }}</span>
                    <span>${{ formatNumber(priceNights) }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="underline">Airbnb service fee</span>
                    <span>${{ formatNumber(parseInt(priceNights * 14 / 100)) }}</span>
                </div>
            </div>
            <div class="bold flex justify-between">
                <span class="bold">Total</span>
                <span class="bold">${{ formatNumber(parseInt(priceNights * 114 / 100)) }}</span>
            </div>
        </article>
    </section>
</template>

<script>
import RateAndRev from './RateAndRev.vue';
import FancyBtn from './FancyBtn.vue';
import GuestPicker from './GuestPicker.vue';
import { utilService } from '../services/util.service'
import { svgService } from '../services/svg.service'
export default {
    props: ['stay'],
    data() {
        return {
            startDate: null,
            endDate: null,
            showGuestModal: 0,
        }
    },
    mounted() {
        this.startDate = this.$route.query.startDate
        this.endDate = this.$route.query.endDate
    },
    updated() {
        this.startDate = this.$route.query.startDate
        this.endDate = this.$route.query.endDate
    },
    methods: {
        nights() {
            const checkin = new Date(this.startDate).getTime()
            const checkout = new Date(this.endDate).getTime()
            return parseInt((checkout - checkin) / 1000 / 60 / 60 / 24)
        },
        formatNumber(num) {
            return utilService.formatNumber(num)
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        toggleGuestModal(toggle) {
            if (toggle) {
                this.showGuestModal++
            } else if (this.showGuestModal) {
                this.showGuestModal++
            }
            this.showGuestModal %= 3
        },
        updateQuery(newQuery) {
            this.$router.replace({ query: newQuery })
        }
    },
    computed: {
        price() {
            return this.stay.price
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
        priceNights() {
            return this.nights() * this.stay.price
        },
        checkin() {
            return this.startDate ? new Date(this.startDate).toLocaleDateString() : ''
        },
        checkout() {
            return this.endDate ? new Date(this.endDate).toLocaleDateString() : ''
        },
    },
    components: {
        RateAndRev,
        FancyBtn,
        GuestPicker,
    },
}
</script>

<style></style>