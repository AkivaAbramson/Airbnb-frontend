<template>
    <section class="big-header home-layout">
        <section class="search-container">
            <div class="destination search-option" @click="searchDest" :class="{ pickedOption: openDest }">
                <h3 class="bold-title">Where</h3>
                <!-- <h5 class="light-subtitle" v-if="!destination || destination === `I'm flexible` ">Search destinations</h5>
                <span v-else>{{ destination }}</span> -->
                <input placeholder="Search destinations" class="light-subtitle"
                    v-if="!destination || destination === `I'm flexible`" v-model="searchedDest" @keyup.enter="saveDest">
                <input v-else type="text" :placeholder="destination">
                <!-- <input class="iluujbk dir dir-ltr" aria-autocomplete="none" autocomplete="off" autocorrect="off" spellcheck="false" id="bigsearch-query-location-input" name="query" aria-describedby="bigsearch-query-location-description" placeholder="Search destinations" data-testid="structured-search-input-field-query" value="" aria-activedescendant="bigsearch-query-location-suggestion-1"> -->
            </div>

            <div class="check-in search-option" @click="checkIn" :class="{ pickedOption: openCheckin }">
                <h3 class="bold-title">Check in</h3>
                <h5 class="light-subtitle">Add dates</h5>
            </div>

            <div class="check-out search-option" @click="checkOut" :class="{ pickedOption: openCheckOut }">
                <h3 class="bold-title">Check out</h3>
                <h5 class="light-subtitle">Add dates</h5>
            </div>

            <div class="who search-option" @click="addGuests" :class="{ pickedOption: openGuests }">
                <div class="guests-wrapper">
                    <h3 class="bold-title">Who</h3>
                    <h5 class="light-subtitle" v-if="!guestCount || guestCount === '1 guest'">Add guests</h5>
                    <span v-else>{{ trimGuests }}</span>

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
        <Destinations v-if="openDest" @chosenDest="updateFilterBy" @openNextModal="openNextModal" />
        <div  class="home-date-picker" >
            <DatePicker @date-change="chosenDate" v-if="openCheckin"
            :columns="2"
            :range="range"
            :attributes="attributes"
            :footer="{ clear: true, close: true}"
            @close="showDateModal = false"
            />
        </div>
        <!-- <DatePicker v-if="openCheckOut" /> -->
        <GuestPicker v-if="openGuests" @guest-count="updateFilterBy" />


    </section>
</template>

<script>
import { utilService } from '../services/util.service'
import { ref } from 'vue'
import Destinations from './Destinations.vue'
import FancyBtn from './FancyBtn.vue'
import DatePicker from './DatePicker.vue'
import GuestPicker from './GuestPicker.vue'

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
            openDest: true,
            openCheckin: false,
            openGuests: false,
            openCheckOut: false,
            searchedDest: '',
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
        checkIn() {
            this.openCheckin = true
            this.openDest = false
            this.openGuests = false
            this.openCheckOut = false
        },
        checkOut() {
            this.openCheckOut = true
            this.openCheckin = false
            this.openDest = false
            this.openGuests = false
        },
        addGuests() {
            this.openGuests = true
            this.openCheckOut = false
            this.openCheckin = false
            this.openDest = false

        },
        updateFilterBy(newQuery) {


            // if(this.filterBy['destination']){
            this.filterBy = { ...this.filterBy, ...newQuery }
            for( const type of guestTypes){
                if(!newQuery[type]){
                    delete this.filterBy[type]
                }
            }


            // }
            console.log(this.filterBy)


        },

        formatNumber(num) {
            return utilService.formatNumber(num)
        },
        async loadFilteredStays() {
            this.$emit('closeHeader')
            this.$router.replace({ query: this.filterBy })
            await this.$store.dispatch({ type: 'loadStays', filterBy: this.filterBy })
            this.filterBy = {}
        },
        openNextModal() {
            if (this.openDest === true) {
                this.openDest = false
                this.openGuests = true
                return
            }
            if (this.openCheckin === true) {
                this.openCheckin = false
                this.openGuests = true
                return
            }
            // if (this.openCheckOut === true) {
            //     this.openCheckOut = false
            //     this.openGuests = true
            //     return
            // }
        },
        saveDest() {
            this.filterBy['destination'] = this.searchedDest
            console.log(this.filterBy)
            this.addGuests()
        },
        chosenDate(range) {
            console.log(range)
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
        destination() {
            let dest = this.filterBy.destination
            return dest

        },
        trimGuests() {
            return utilService.trimTxt(this.guestCount, 14)
        }

        // checkin() {
        //     return new Date(this.dateIn).toLocaleDateString()
        // },
        // checkout() {
        //     return new Date(this.dateOut).toLocaleDateString()
        // },
    },
    components: {
        Destinations,
        DatePicker,
        GuestPicker,
        FancyBtn
    }

}


</script>


<style lang="">
</style>
