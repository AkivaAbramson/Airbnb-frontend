<template>
    <section class="big-header home-layout">
        <section class="search-container">
            <div class="destination" @click="searchDest" :class="{ pickedOption: openDest }">
                <h3 class="bold-title">Where</h3>
                <h5 class="light-subtitle" v-if="!destination || destination === `I'm flexible` ">Search destinations</h5>
                <span v-else>{{ destination }}</span>
                <!-- <input class="iluujbk dir dir-ltr" aria-autocomplete="none" autocomplete="off" autocorrect="off" spellcheck="false" id="bigsearch-query-location-input" name="query" aria-describedby="bigsearch-query-location-description" placeholder="Search destinations" data-testid="structured-search-input-field-query" value="" aria-activedescendant="bigsearch-query-location-suggestion-1"> -->
            </div>
            
            <div class="check-in"  @click="checkIn" :class="{ pickedOption: openCheckin }">
                <h3 class="bold-title">Check in</h3>
                <h5 class="light-subtitle">Add dates</h5>
            </div>
            
            <div class="check-out" @click="checkOut" :class="{ pickedOption: openCheckOut }">
                <h3 class="bold-title">Check out</h3>
                <h5 class="light-subtitle">Add dates</h5>
            </div>
            
            <div class="who" @click="addGuests" :class="{ pickedOption: openGuests }">
                <div class="guests-wrapper">
                    <h3 class="bold-title">Who</h3>
                    <h5 class="light-subtitle" v-if="!guestCount || guestCount === '1 guest'">Add guests</h5>
                    <span v-else>{{ guestCount }}</span>
                    
                </div>
                <div class="btn-wrapper" @click.stop="loadFilteredStays">
                    <!-- <FancyBtn class="search-icon" :content="'Search'" /> -->
                    <span class="search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation"
                            focusable="false" style="fill: none; stroke: white; stroke-width: 4; overflow: visible;">
                            <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
                        </svg>
                    </span>
                </div>
            </div>
        </section>
        <Destinations v-if="openDest"
            @chosenDest="updateFilterBy"
            @openNextModal="openNextModal"
        />
        <CheckIn v-if="openCheckin"/>
        <CheckIn v-if="openCheckOut"/>
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
            openDest: true,
            openCheckin:false,
            openGuests:false,
            openCheckOut: false,
            filterBy: {},
            // countMap: {
            //     guest: 0,
            //     infant: 0,
            //     pet: 0,
            // }

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
            console.log(newQuery)
            if(!newQuery['adult'] && this.filterBy['adult'] === 1){
                this.filterBy['adult'] = 1
            }
            if(!newQuery['child'] && this.filterBy['child'] === 1){
                this.filterBy['child'] = 1
            }
            if(!newQuery['infant'] && this.filterBy['infant'] === 1){
                this.filterBy['infant'] = 1
            }
            if(!newQuery['pet'] && this.filterBy['pet'] === 1){
                this.filterBy['pet'] = 1
            } else{

                this.filterBy = { ...this.filterBy, ...newQuery }
            }
             

            console.log(this.filterBy)
            
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
            this.filterBy = {}
        },
        openNextModal(){
            if(this.openDest === true){
                this.openDest = false
                this.openCheckin = true
                // return
            }
            if(this.openCheckin === true){
                this.openCheckin = false
                this.openCheckOut = true
                // return
            }
            if(this.openCheckOut === true){
                this.openCheckOut = false
                this.openGuests = true
                // return
            }
        }
        
    },
    computed: {
        guestCount() {
            let countMap = {
                guest: parseInt(this.filterBy.adult) + parseInt(this.filterBy.child || 0),
                infant: this.filterBy.infant,
                pet: this.filterBy.pet,
            }
            // console.log(this.filterBy)
            return utilService.formatPlural(countMap, ', ')
        },
        destination(){
            let dest = this.filterBy.destination
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
