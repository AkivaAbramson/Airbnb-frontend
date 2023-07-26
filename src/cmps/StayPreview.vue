<template>
    <li class="stay-preview" v-for="imgUrl in stay.imgUrls" :key="imgUrl">
        <img class="preview-img" :src="imgUrl" />
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
