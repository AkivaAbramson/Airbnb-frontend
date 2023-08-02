<template>
    <section class="dest-container">
        <h1 class="dest-title">Search by region</h1>
        <div class="map-container">
            <div class="map-preview" @click="chooseDest(`I'm flexible`)">
                <img class="map-img" alt="" src="https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg">
                <h5>I'm flexible</h5>
            </div>
            <div class="map-preview" @click="chooseDest('United States')">
                <img class="map-img" alt="" src="https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320">
                <h5>United States</h5>
            </div>
            <div class="map-preview" @click="chooseDest('Spain')">
                <img class="map-img" alt="" src="https://a0.muscache.com/im/pictures/a0fd6dfc-6bec-4abb-850e-9ab78ed7bf37.jpg?im_w=320">
                <h5>Spain</h5>
            </div>
            <div class="map-preview" @click="chooseDest('Portugal')">
                <img class="map-img" alt="" src="https://a0.muscache.com/im/pictures/53a3d619-7012-4c3b-a7eb-e91553e96f6b.jpg?im_w=320">
                <h5>Portugal</h5>
            </div>
            <div class="map-preview" @click="chooseDest('Turkey')">
                <img class="map-img" alt="" src="https://a0.muscache.com/im/pictures/97d76097-22b3-4d87-9459-ad1b90b18d2f.jpg?im_w=320">
                <h5>Turkey</h5>
            </div>
            <div class="map-preview" @click="chooseDest('Brazil')">
                <img class="map-img" alt="" src="https://a0.muscache.com/im/pictures/bae0a615-cabb-45f6-9548-359fc6cef4fe.jpg?im_w=320">
                <h5>Brazil</h5>
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