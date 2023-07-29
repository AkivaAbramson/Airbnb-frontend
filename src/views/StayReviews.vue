<template>
    <section class="reviews shadow" v-if="reviews">
        <article v-if="reviews.length">
            <h2>
                <RateAndRev :reviews="reviews" />
            </h2>
            <ul class="review-cats clean-list flex justify-between">
                <li v-for="cat in cats" :key="cat" class="flex align-center">
                    <div class="cat-title">
                        {{ cat }}
                    </div>
                    <div class="score" :style="`--score: ${score(cat)}; --scoreTxt: ${JSON.stringify(score(cat))};`"></div>
                </li>
            </ul>
            <ul class="reviews-content clean-list">
                <li v-for="i in Math.min(6, reviews.length)" :key="reviews[i - 1].id">
                    <img :src="reviews[i - 1].by.imgUrl">
                    <div>
                        <h3>{{ reviews[i - 1].by.fullname }}</h3>
                        <span>{{ date(reviews[i - 1].at) }}</span>
                    </div>
                    <div class="review">
                        {{ reviews[i - 1].txt }}
                    </div>
                </li>
            </ul>
        </article>
        <h2 v-else>No reviews (yet)</h2>
    </section>
</template>

<script>
import { reviewService } from '../services/review.service.local'
import RateAndRev from '../cmps/RateAndRev.vue'
export default {
    name: 'StayReviews',
    props: ['reviews'],
    data() {
        return {
            elTxts: []
        }
    },
    methods: {
        date(time) {
            return time
        },
        score(cat) {
            let score = 0
            for (const review of this.reviews) {
                score += parseFloat(review.rate[cat])
            }
            return ((score * 100 / this.reviews.length) / 100).toFixed(1)
        },
    },
    computed: {
        cats() {
            return reviewService.reviewCats
        },
    },
    components: {
        RateAndRev,
    },
}
</script>