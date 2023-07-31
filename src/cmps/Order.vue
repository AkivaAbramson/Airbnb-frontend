<template>
    <section class='order'>
        <article class="order-top flex justify-between">
            <span class="top-price bold">${{ formatNumber(price) }}</span>
            <RateAndRev :reviews="stay.reviews" />
        </article>
        <article class="user-input">
            <div class="dates flex">
                <button class="flex column">
                    <span class="title">check-in</span>
                    <span>{{ checkin }}</span>
                </button>
                <button class="flex column">
                    <span class="title">check-out</span>
                    <span>{{ checkout }}</span>
                </button>
            </div>
            <button class="flex justify-between" @click="toggleGuestModal(true)">
                <div class="guests flex column">
                    <span class="title">guests</span>
                    <span>{{ guestCount }}</span>
                </div>
                <div>
                    <span v-html="getSvg('down')"></span>
                </div>
            </button>
            <GuestPicker v-if="showGuestModal"
            v-clickout="() => toggleGuestModal(false)"
            :capacity="stay.capacity"
            />
        </article>
        <FancyBtn :content="'Reserve'" />
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
            dateIn: '2023-08-08',
            dateOut: '2023-10-25',
            showGuestModal: 0,
        }
    },
    methods: {
        nights() {
            const checkin = new Date(this.dateIn).getTime()
            const checkout = new Date(this.dateOut).getTime()
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
        }
    },
    computed: {
        price() {
            return this.stay.price
        },
        guestCount() {
            const count = 2
            return count + ' guest' + (count > 1 ? 's' : '')
        },
        nightsTxt() {
            const count = this.nights()
            return count + ' night' + (count > 1 ? 's' : '')
        },
        priceNights() {
            return this.nights() * this.stay.price
        },
        checkin() {
            return new Date(this.dateIn).toLocaleDateString()
        },
        checkout() {
            return new Date(this.dateOut).toLocaleDateString()
        },
    },
    components: {
        RateAndRev,
        FancyBtn,
        GuestPicker,
    }
}
</script>

<style></style>