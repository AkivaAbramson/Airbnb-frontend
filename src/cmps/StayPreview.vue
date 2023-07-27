<template>
    <li class="stay-preview" v-for="imgUrl in stay.imgUrls" :key="imgUrl">
        <!-- <RouterLink  :to="'/stay/' + stay._id"> -->
            <div class="prev-img-container">
                <MainGallery :stay="stay" @goToDetails="$router.push('/stay/' + stay._id)"/>
                <!-- <img class="preview-img" :src="imgUrl" /> -->
                <div class="heart-icon">
                    <svg @click.prevent="toggleHeart" :class="{ liked: isLiked }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; stroke: white; stroke-width: 2; overflow: visible;">
                        <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
                    </svg>
                </div>
            </div>
        <!-- </RouterLink> -->
            <!-- <div class="actions">
              <button @click="$emit('removed')" class="btn">
                  <span>x</span>
              </button>
              <RouterLink :to="'/stay/edit/' + stay._id" class="btn">
                  <span>Edit</span>
              </RouterLink>
              <RouterLink  :to="'/stay/' + stay._id" class="btn">
                  <span>Details</span>
              </RouterLink>
            </div> -->
        <div class="preview-details">
            <section class="preview-data">
                <h3 class="black-bold preview-loc">{{ stay.loc.country }}, {{ stay.loc.city }}</h3>
                <h3 class="light-gray preview-name">{{ stay.name }}</h3>
                <h3 class="light-gray">{{ stay.capacity }} guests</h3>
                <h3 class="black-bold preview-price">${{ stay.price }} <span class="black-regular">night</span></h3>
            </section>
            <section class="preview-rating">
                <div class="rate-star">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 12px; width: 12px; fill: currentcolor;">
                        <path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path>
                    </svg> 
                </div>
                <h3 class="rate-num">{{ stay.reviews[0].rate }}.0</h3>
            </section>
            
        </div>

        

    </li>
</template>

<script>

import MainGallery from './MainGallery.vue';


export default {
    name: 'StayPreview',
    props: ['stay'],
    data() {
        return {
            isLiked: false
        }
    },
    methods: {
        toggleHeart(){
            this.isLiked = !this.isLiked
            
            
        }
    },
    computed: {

    },
    components: {
    MainGallery,
  },
    
}
</script>


