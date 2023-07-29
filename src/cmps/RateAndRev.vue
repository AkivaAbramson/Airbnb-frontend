<template>
    <span v-if="stay.reviews?.length" class="rate-and-rev">
        <span>
            <span class="svg-star" v-html="getSvg('star')"></span>
            <span class="bold cmp-rate">{{ rate }} · </span>
        </span>
        <span class="bold underline cmp-rev">{{ stay.reviews.length }} reviews</span>
    </span>
</template>

<script>
import { svgService } from '../services/svg.service'

export default {
    props: ['stay'],
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        }
    },
    computed: {
        rate() {
            let rating = 0
            for (const review of this.stay.reviews) {
                rating += review.rate
            }
            return rating / this.stay.reviews.length
        },
    },
}
</script>

<style></style>