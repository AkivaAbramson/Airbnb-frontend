<template>
    <section class="big-header home-layout">
        <section class="search-container">
            <div class="destination" @click="searchDest" :class="{ pickedOption: openDest }">
                <h3>Where</h3>
                <h5>Search destinations</h5>
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
                <h5>Add guests</h5>
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
        <Destinations v-if="openDest" />
        <CheckIn v-if="openCheckin" />
        <AddGuests v-if="openGuests" />


    </section>
</template>

<script>
import Destinations from './Destinations.vue'
import FancyBtn from './FancyBtn.vue'
import CheckIn from './CheckIn.vue'
import AddGuests from './AddGuests.vue'
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

        }
    },
    components: {
        Destinations,
        CheckIn,
        AddGuests,
        FancyBtn
    }

}


</script>


<style lang="">
</style>
