<template>
    <li class="stay-preview" v-for="imgUrl in stay.imgUrls" :key="imgUrl">
        <div class="prev-img-container">
            <img class="preview-img" :src="imgUrl" />
            <div class="heart-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: rgba(0, 0, 0, 0.5); height: 24px; width: 24px; stroke: white; stroke-width: 2; overflow: visible;"><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>
              </div>
        </div>
        <div class="preview-details">
            <section class="preview-data">
                <h3 class="black-bold preview-loc">{{ stay.loc.country }}, {{ stay.loc.city }}</h3>
                <h3 class="light-gray preview-name">{{ stay.name }}</h3>
                <h3 class="light-gray">{{ stay.capacity }} guests</h3>
                <h3 class="black-bold preview-price">${{ stay.price }} <span class="black-regular">night</span></h3>
            </section>
            <section class="preview-rating">
                <div class="rate-star"> ★ </div>
                <h3 class="black-regular">{{ stay.reviews[0].rate }}</h3>
            </section>
        </div>

        <!-- <h6>{{ stay.summary }}</h6> -->

    </li>
</template>

<script>

export default {
    name: 'StayPreview',
    props: ['stay'],
    computed: {

    },
    computed: {


    },
}
</script>
