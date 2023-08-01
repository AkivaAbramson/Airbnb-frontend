<template>
    <section class="big-header home-layout">
        <section class="search-container">
            <div class="destination" @click="searchDest" :class="{ pickedOption: openDest }">
                <h3>Where</h3>
                <h5 v-if="!destination || destination === `I'm flexible`">Search destinations</h5>
                <span v-else>{{ destination }}</span>
            </div>
            <span class="search-divider"></span>
            <div class="check-in"  @click="checkIn" :class="{ pickedOption: openCheckin }">
                <h3>Check in</h3>
                <h5>Add dates</h5>
            </div>
            <span class="search-divider"></span>
            <div class="check-out" @click="checkIn">
                <h3>Check out</h3>
                <h5>Add dates</h5>
            </div>
            <span class="search-divider"></span>
            <div class="who" @click="addGuests" :class="{ pickedOption: openGuests }">
                <h3>Who</h3>
                <h5 v-if="!guestCount || guestCount === '1 guest'">Add guests</h5>
                <span v-else>{{ guestCount }}</span>
            </div>
            <div class="btn-wrapper">
                <!-- <FancyBtn class="search-icon" :content="'Search'" /> -->
                <span class="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation"
                        focusable="false" style="fill: none; stroke: white; stroke-width: 4; overflow: visible;">
                        <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
                    </svg>
                </span>
            </div>
        </section>
        <Destinations v-if="openDest"
            @chosenDest="updateQuery"
        />
        <CheckIn v-if="openCheckin" />
        <GuestPicker v-if="openGuests"
             @guest-count="updateQuery"
        />


    </section>
</template>

<script>
import { utilService } from '../services/util.service'
import Destinations from './Destinations.vue'
import FancyBtn from './FancyBtn.vue'
import CheckIn from './CheckIn.vue'
import GuestPicker from './GuestPicker.vue'
export default {
    data() {
        return {
            openDest: false,
            openCheckin:false,
            openGuests:false,
            

        }
    },
    methods: {
        searchDest() {
            this.openDest = true
            this.openCheckin = false
            this.openGuests = false
        },
        checkIn(){
            this.openCheckin = true
            this.openDest = false
            this.openGuests = false
        },
        addGuests(){
            this.openGuests = true
            this.openCheckin = false
            this.openDest = false

        },
        updateQuery(newQuery) {
            this.$router.replace({ query: newQuery })
        },
        formatNumber(num) {
            return utilService.formatNumber(num)
        },
        
    },
    computed: {
        guestCount() {
            let countMap = {
                guest: parseInt(this.$route.query.adult) + parseInt(this.$route.query.child || 0),
                infant: this.$route.query.infant,
                pet: this.$route.query.pet,
            }
            return utilService.formatPlural(countMap, ', ')
        },
        destination(){
            let dest = this.$route.query.destination
            return dest

        },
        
        checkin() {
            return new Date(this.dateIn).toLocaleDateString()
        },
        checkout() {
            return new Date(this.dateOut).toLocaleDateString()
        },
    },
    components: {
        Destinations,
        CheckIn,
        GuestPicker,
        FancyBtn
    }

}


</script>


<style lang="">
</style>
