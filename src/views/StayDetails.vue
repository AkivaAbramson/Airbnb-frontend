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
        <section class="main-details">
            <section>
                <article class="grid-host">
                    <h2>Hosted by {{ stay.host.fullname }}</h2>
                    <img :src="stay.host.imgUrl">
                    <ol class="clean-list">
                        <li>{{ stay.capacity }} guests</li>
                    </ol>
                </article>
            </section>
            <section>

            </section>
        </section>
    </section>
</template>
  
<script>
import { stayService } from '../services/stay.service.local'
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
}
</script>
  