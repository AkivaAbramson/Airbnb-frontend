<template>
    <h1>Wishlist</h1>
    <section class="wishlist-container">
       <StayList :stays="this.user.wishlist"/>
       <!-- :key="this.user._id"  -->
    </section>
</template>

<script>

import StayList from '../cmps/StayList.vue'

export default {
    name: 'Wishlist',
    props: ['user'],
    data() {
        return {};
    },
    components: { 
        StayList,
    }
}
</script>