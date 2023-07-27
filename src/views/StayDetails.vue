<template>
    <section v-if="stay" class="stay-details">
        <section class="header-details">
            <h1>{{ stay.name }}</h1>
            <div class="top-details flex justify-between align-end">
                <div>
                    <span v-if="stay.reviews?.length" class="header-spacer">
                        <span class="bold">{{ getRate }} · </span>
                        <span class=" bold underline">{{ stay.reviews.length }} reviews</span>
                    </span>
                    <span class="bold underline">{{ getLocName }}</span>
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
                    <h2>Hosted by {{ stay.host.fullname }}</h2>
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
                                Check yourself in with the lockbox
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
                    <li v-for="i in Math.min(10, stay.amenities.length)"
                    class="flex align-center amenity">
                        <svg v-html="getSvg(stay.amenities[i - 1])"></svg>
                        {{ stay.amenities[i - 1] }}
                    </li>
                </ul>
            </section>
            <Order :stay="stay"></Order>
        </section>
        <section class="reviews shadow">
            Reviews
        </section>
        <section class="stay-map">
            Map
        </section>
    </section>
</template>
  
<script>
import { stayService } from '../services/stay.service.local'
import { svgService } from '../services/svg.service'
import Order from '../cmps/Order.vue'
export default {
    name: 'StayDetails',
    data() {
        return {
            stay: null
        }
    },
    async created() {
        try {
            this.loadStay()
        } catch (err) {
            console.log(err)
        }
    },
    methods: {
        async loadStay() {
            try {
                const { stayId } = this.$route.params
                const stay = await stayService.getById(stayId)
                this.stay = stay
            } catch {
                console.log('Failed to load stay ', stayId)
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
        }
    },
    computed: {
        getRate() {
            let rating = 0
            for (const review of this.stay.reviews) {
                rating += review.rate
            }
            return rating / this.stay.reviews.length
        },
        getLocName() {
            return this.stay.loc.city + ', ' + this.stay.loc.country
        }
    },
    components: {
        Order
    }
}
</script>
  