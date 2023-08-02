<template>
    <section class="dest-container">
        <h1 class="dest-title">Search by region</h1>
        <div class="map-container">
            <div class="map-preview" @click="chooseDest(`I'm flexible`)">
                <img class="map-img" alt="" src="https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg">
                <h5>I'm flexible</h5>
            </div>
            <div class="map-preview" @click="chooseDest('Middle East')">
                <img class="map-img" alt="" src="https://a0.muscache.com/im/pictures/66355b01-4695-4db9-b292-c149c46fb1ca.jpg?im_w=320">
                <h5>Middle East</h5>
            </div>
            <div class="map-preview" @click="chooseDest('Italy')">
                <img class="map-img" alt="" src="https://a0.muscache.com/im/pictures/ea5598d7-2b07-4ed7-84da-d1eabd9f2714.jpg?im_w=320">
                <h5>Italy</h5>
            </div>
            <div class="map-preview" @click="chooseDest('United States')">
                <img class="map-img" alt="" src="https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320">
                <h5>United States</h5>
            </div>
            <div class="map-preview" @click="chooseDest('Greece')">
                <img class="map-img" alt="" src="https://a0.muscache.com/im/pictures/09be1400-6a42-4a4f-90f6-897e50110031.jpg?im_w=320">
                <h5>Greece</h5>
            </div>
            <div class="map-preview" @click="chooseDest('South America')">
                <img class="map-img" alt="" src="https://a0.muscache.com/im/pictures/06a30699-aead-492e-ad08-33ec0b383399.jpg?im_w=320">
                <h5>South America</h5>
            </div>
        </div>
        
    </section>
</template>
<script>
export default {
    data() {
        return {
            destination: 'flexible',
        }
    },
    methods: {
        chooseDest(destination) {
                if (destination === `I'm flexible`) destination = ''
                this['destination'] = destination
                const newQuery = Object.assign({}, this.$route.query)
                newQuery['destination'] = this['destination']
                if (!this['destination']) {
                    delete newQuery['destination']
                }
                this.$emit('chosenDest', newQuery)
        }
    },
    computed: {
        
    },
    created() {
        for (const key in this.$data) {
            this[key] = this.$route.query[key] || ''
        }
    },
    
}
</script>
<style lang="">
    
</style>