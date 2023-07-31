<template>
    <section v-if="stay" class="stay-details" :key="stayId">
        <section class="header-details">
            <h1>{{ stay.name }}</h1>
            <div class="top-details flex justify-between align-end">
                <div>
                    <RateAndRev class="header-spacer" :reviews="stay.reviews" />
                    <span class="bold underline">{{ locName }}</span>
                </div>
                <div>
                    <RouterLink :to="'/stay/edit/' + stay._id" class="btn btn-top underline">Edit</RouterLink>
                    <button class="btn btn-top underline">Save</button>
                </div>
            </div>
        </section>
        <section v-if="stay.imgUrls?.length" class="image-gallery">
            <div v-for="i in 5" :class="getImgClass(i)">
                <img :src="getImgSrc(i)">
            </div>
        </section>
        <section class="main-details shadow">
            <section>
                <article class="grid-host shadow">
                    <h2>Entire stay hosted by {{ stay.host.fullname }}</h2>
                    <img :src="stay.host.imgUrl">
                    <ol class="clean-list">
                        <li>{{ stay.capacity }} guests</li>
                    </ol>
                </article>
                <ul class="notable-features shadow clean-list">
                    <li class="feature">
                        <svg v-html="getSvg('Dedicated workspace')"></svg>
                        <div>
                            <h3>
                                Dedicated workspace
                            </h3>
                            <p>
                                A room with wifi that is well-suited for working.
                            </p>
                        </div>
                    </li>
                    <li class="feature">
                        <svg v-html="getSvg('checkin')"></svg>
                        <div>
                            <h3>
                                Self check-in
                            </h3>
                            <p>
                                Check yourself in with the lockbox.
                            </p>
                        </div>
                    </li>
                    <li class="feature">
                        <svg v-html="getSvg('calendar')"></svg>
                        <div>
                            <h3>
                                Free cancellation for 48 hours.
                            </h3>
                        </div>
                    </li>
                </ul>
                <article class="stay-desc shadow">
                    <p>{{ stay.summary }}</p>
                </article>
                <ul class="amenities clean-list">
                    <h2>What this place offers</h2>
                    <li v-for="i in Math.min(10, stay.amenities.length)" class="flex align-center amenity">
                        <svg v-html="getSvg(stay.amenities[i - 1])"></svg>
                        {{ stay.amenities[i - 1] }}
                    </li>
                </ul>
            </section>
            <Order :stay="stay"></Order>
        </section>
        <StayReviews class="small" :reviews="stay.reviews" />
        <section class="stay-map">
            Map
        </section>
    </section>
</template>
  
<script>
import { stayService } from '../services/stay.service.local'
import { svgService } from '../services/svg.service'
import Order from '../cmps/Order.vue'
import RateAndRev from '../cmps/RateAndRev.vue'
import StayReviews from './StayReviews.vue'
export default {
    name: 'StayDetails',
    data() {
        return {
            stay: null,
            stayId: this.$route.params.stayId
        }
    },
    async created() {
        try {
            await this.loadStay()
        } catch (err) {
            console.log(err)
            this.$router.push('/')
        }
    },
    methods: {
        async loadStay() {
            try {
                this.stay = await stayService.getById(this.stayId)
            } catch (err) {
                throw 'Failed to load stay '
            }
        },
        getImgSrc(i) {
            const idx = (i - 1) % this.stay.imgUrls.length
            return this.stay.imgUrls[idx]
        },
        getImgClass(i) {
            return {
                big: i === 1,
                small: i > 1,
                top: i < 4
            }
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },

    },
    computed: {
        locName() {
            return this.stay.loc.city + ', ' + this.stay.loc.country
        },
    },
    async beforeRouteUpdate(to, from) {
        this.stayId = null
        this.stay = null
        try {
            this.stayId = to.params.stayId
            await this.loadStay()
        } catch (err) {
            console.log(err)
            this.$router.push('/')
        }
    },
    components: {
        Order,
        RateAndRev,
        StayReviews
    }
}
</script>
  