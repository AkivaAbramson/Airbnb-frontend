  
<!-- NavModal.vue -->
<template>
    <div class="nav-modal" v-show="showModal" @click.stop>
        <!-- Add your navigation links and actions here -->
        <!-- For example: -->
        <RouterLink to="/login">Sign Up</RouterLink>
        <!-- <a href="#">Sign Up</a> -->
        <a href="#">Trips</a>
        <a href="#">Wishlist</a>
        <a @click="doLogout">Logout</a>
    </div>
</template>
  
  
<script>
export default {
    props: {
        showModal: Boolean,
    },
    methods: {
        doLogout() {
            this.$store.dispatch({ type: 'logout' })
            
        },

    },
};
</script>
  