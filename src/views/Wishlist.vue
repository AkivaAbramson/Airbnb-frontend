<template>
    <h1>Wishlist</h1>
    <section class="wishlist-container" v-if="loggedInUser">
        <StayList :stays="userWishlist"/>
        <!-- :key="this.user._id"  -->
    </section>
    <section v-else>
        <h2>You are not logged in!</h2>
    </section>
</template>

<script>

import StayList from '../cmps/StayList.vue'

export default {
    name: 'Wishlist',
    data() {
        return {
            stays: null,
        };
    },
    created() {
        console.log('created! user:', this.loggedInUser)
        this.stays = this.loggedInUser.wishlist
        console.log('stays in wishlist', this.stays);
    },
    computed: {
        loggedInUser() {
            return this.$store.getters.loggedinUser
        },
        userWishlist() {
            return this.$store.getters.wishlist
        }

    },
    components: {
        StayList,
    }
}
</script>