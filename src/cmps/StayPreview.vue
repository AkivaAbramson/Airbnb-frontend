<template>
    <li class="Stay-preview"  v-for="imgUrl in stay.imgUrls" :key="imgUrl">
        <h3 class="tag-text">{{ stay.name }}</h3>
        <h4>{{ stay.price }}$</h4>
        <h6>{{ stay.summary }}</h6>
        <img class="stay-preview__img" :src="imgUrl" />

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
