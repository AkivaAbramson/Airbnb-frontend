<template>
    <section class='order'>
        <article class="order-top flex justify-between">
            <span class="top-price bold">${{ price }}</span>
            <RateAndRev :reviews="stay.reviews" />
        </article>
        <article class="user-input">
            <div class="dates flex">
                <button class="flex column">
                    <span class="title bold">check-in</span>
                    <span>{{ checkin }}</span>
                </button>
                <button class="flex column">
                    <span class="title bold">check-out</span>
                    <span>{{ checkout }}</span>
                </button>
            </div>
            <button class="guests flex column">
                <span class="title bold">guests</span>
                <span>{{ guestCount }}</span>
            </button>
        </article>
        <FancyBtn :content="'Reserve'" />
        <article class="price" v-if="nights()">
            <div class="notify">{{ `You won't be charged yet` }}</div>
            <div class="price-calc shadow">
                <div class="flex justify-between">
                    <span class="underline">${{ price }} x {{ nightsTxt }}</span>
                    <span>${{ priceNights }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="underline">Airbnb service fee</span>
                    <span>${{ parseInt(priceNights * 14 / 100) }}</span>
                </div>
            </div>
            <div class="bold flex justify-between">
                <span class="bold">Total</span>
                <span class="bold">${{ parseInt(priceNights * 114 / 100) }}</span>
            </div>
        </article>
    </section>
</template>

<script>
import RateAndRev from './RateAndRev.vue';
import FancyBtn from './FancyBtn.vue';
export default {
    props: ['stay'],
    data() {
        return {
            dateIn: '2023-10-19',
            dateOut: '2023-10-25',
        }
    },
    methods: {  
        nights() {
            const checkin = new Date(this.dateIn).getTime()
            const checkout = new Date(this.dateOut).getTime()
            return parseInt((checkout - checkin) / 1000 / 60 / 60 / 24)
        },
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
    }
}
</script>

<style></style>