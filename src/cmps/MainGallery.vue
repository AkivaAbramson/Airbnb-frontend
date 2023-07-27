<template>
  <carousel :items-to-show="1">
    <slide v-for="(imgUrl, idx) in stay.imgUrls" :key="idx">
      <img
        class="preview-img"
        :src="imgUrl"
        @click="goToDetails"
        @mouseenter="showArrowsPagination = true"
        @mouseleave="showArrowsPagination = false"/>
    </slide>

    <!-- Show arrows and pagination on hover -->
    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
  props: ['stay'],
  name: 'MainGallery',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      showArrowsPagination: false, // Initially hide arrows and pagination
    };
  },
  methods: {
    goToDetails() {
      this.$emit('goToDetails');
    },
  },
};
</script>
