<template>
    <section class="big-header home-layout">
        <section class="search-container">
            <div class="destination" @click="searchDest" :class="{ pickedOption: openDest }">
                <h3>Where</h3>
                <h5 v-if="!destination || destination === ''">Search destinations</h5>
                <span v-else>{{ destination }}</span>
            </div>
            
            <div class="check-in"  @click="checkIn" :class="{ pickedOption: openCheckin }">
                <h3>Check in</h3>
                <h5>Add dates</h5>
            </div>
            
            <div class="check-out" @click="checkOut" :class="{ pickedOption: openCheckOut }">
                <h3>Check out</h3>
                <h5>Add dates</h5>
            </div>
            
            <div class="who" @click="addGuests" :class="{ pickedOption: openGuests }">
                <h3>Who</h3>
                <h5 v-if="!guestCount || guestCount === '1 guest'">Add guests</h5>
                <span v-else>{{ guestCount }}</span>
            </div>
            <div class="btn-wrapper" @click="loadFilteredStays">
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
            @chosenDest="updateFilterBy"
        />
        <CheckIn v-if="openCheckin|| openCheckOut" />
        <GuestPicker v-if="openGuests"
             @guest-count="updateFilterBy"
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
            openCheckOut: false,
            filterBy: {},

            

        }
    },
    methods: {
        searchDest() {
            this.openDest = true
            this.openCheckin = false
            this.openGuests = false
            this.openCheckOut = false
        },
        checkIn(){
            this.openCheckin = true
            this.openDest = false
            this.openGuests = false
            this.openCheckOut = false
        },
        checkOut(){
            this.openCheckOut = true
            this.openCheckin = false
            this.openDest = false
            this.openGuests = false
        },
        addGuests(){
            this.openGuests = true
            this.openCheckOut = false
            this.openCheckin = false
            this.openDest = false

        },
        updateFilterBy(newQuery) {
 
            this.filterBy = { ...this.filterBy, ...newQuery }
            // console.log(this.filterBy);
        },
        // updateGuestsFilterBy(newQuery) {
        //     this.filterBy.guests = { ...this.filterBy.guests, ...newQuery }
        //     // console.log(this.filterBy);
        // },
        formatNumber(num) {
            return utilService.formatNumber(num)
        },
        async loadFilteredStays(){
            this.$emit('closeHeader')
            this.$router.replace({ query: this.filterBy })
            await this.$store.dispatch({ type: 'loadStays', filterBy: this.filterBy })
            console.log(this.filterBy)
        }
        
    },
    computed: {
        guestCount() {
            let countMap = {
                guest: parseInt(this.filterBy.adult) + parseInt(this.filterBy.child || 0),
                infant: this.filterBy.infant,
                pet: this.filterBy.pet,
            }
            return utilService.formatPlural(countMap, ', ')
        },
        destination(){
            let dest = this.filterBy.destination
            console.log(this.filterBy.destination)
            return dest

        },
        
        // checkin() {
        //     return new Date(this.dateIn).toLocaleDateString()
        // },
        // checkout() {
        //     return new Date(this.dateOut).toLocaleDateString()
        // },
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
