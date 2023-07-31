<template>
    <span v-if="reviews?.length" class="rate-and-rev">
        <span>
            <span class="svg-star" v-html="getSvg('star')"></span>
            <span class="bold cmp-rate">{{ rate }}</span>
        </span>
        <span class="bold underline cmp-rev">{{ count }}</span>
    </span>
</template>

<script>
import { svgService } from '../services/svg.service'

export default {
    props: ['reviews'],
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        }
    },
    computed: {
        rate() {
            let rating = 0
            let count = 0
            for (const review of this.reviews) {
                for (const cat in review.rate) {
                    rating += review.rate[cat] ?? 0
                    count++
                }
            }
            const avg = parseInt(rating * 100 / count) / 100
            return avg === parseInt(avg) ? avg.toFixed(1) : avg.toFixed(2)
        },
        count() {
            const count = this.reviews.length
            return count + ' review' + (count > 1 ? 's' : '')
        }
    },
}
</script>

<style></style>