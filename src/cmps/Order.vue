<template>
    <section class='order'>
        <!-- <VDatePicker v-model.range="range"
        :attributes="attributes"
        :min-date="minDate"
        :min-page="minPage" /> -->
        <article class="order-top flex justify-between">
            <span class="top-price bold">${{ formatNumber(price) }}</span>
            <RateAndRev :reviews="stay.reviews" />
        </article>
        <article class="user-input">
            <div class="dates flex"
            @click="showDateModal = true"
            v-clickout="() => showDateModal = false">
                <button class="checkin flex column">
                    <span class="title">check-in</span>
                    <span :class="{ empty: !range.start }">{{ checkin }}</span>
                </button>
                <button class="flex column">
                    <span class="title">check-out</span>
                    <span :class="{ empty: !range.end }">{{ checkout }}</span>
                </button>
                <DatePicker
                v-if="showDateModal"
                :columns="2"
                :range="range"
                :attributes="attributes"
                :header="{ title: nightsTxt, subtitle: subtitle }"
                :footer="{ clear: true, close: true}"
                @close="showDateModal = false"
                @clear="onDateClear"
                @date-change="onDateChange" />
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
        <FancyBtn :content="'Reserve'" @click="onReserve()" />
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
import { utilService } from '../services/util.service'
import { svgService } from '../services/svg.service'
import { eventBus } from '../services/event-bus.service';
import { ref } from 'vue';
import DatePicker from '../cmps/DatePicker.vue'
import RateAndRev from './RateAndRev.vue';
import FancyBtn from './FancyBtn.vue';
import GuestPicker from './GuestPicker.vue';
export default {
    props: ['stay'],
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
            showGuestModal: 0,
            showDateModal: false,
        }
    },
    mounted() {
        this.range.start = this.$route.query.startDate
        this.range.end = this.$route.query.endDate
    },
    updated() {
        this.range.start = this.$route.query.startDate
        this.range.end = this.$route.query.endDate
    },
    methods: {
        nights() {
            const checkin = new Date(this.range.start).getTime()
            const checkout = new Date(this.range.end).getTime()
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
        },
        onReserve() {
            eventBus.emit('reserve')
        },
        onDateChange({ startDate, endDate }) {
            if (!startDate || !endDate) return
            const newQuery = Object.assign({}, this.$route.query)
            newQuery.startDate = startDate
            newQuery.endDate = endDate
            this.$router.replace({ query: newQuery })
            this.showDateModal = false
        },
        onDateClear() {
            const newQuery = Object.assign({}, this.$route.query)
            delete newQuery.startDate
            delete newQuery.endDate
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
            return this.range.start ? new Date(this.range.start).toLocaleDateString() : ''
        },
        checkout() {
            return this.range.end ? new Date(this.range.end).toLocaleDateString() : ''
        },
        subtitle() {
            const checkin = this.range.start ? (new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(this.range.start).getTime())) : 'Add date'
            const checkout = this.range.end ? (new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(this.range.end).getTime())) : 'Add date'
            return checkin + ' - ' + checkout
        }
    },
    components: {
        RateAndRev,
        FancyBtn,
        GuestPicker,
        DatePicker,
    },
}
</script>

<style></style>