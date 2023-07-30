  
<!-- NavModal.vue -->
<template>
    <div>
        <div class="nav-modal" @click.stop>
            <!-- <RouterLink to="/login">Sign Up</RouterLink> -->
            
            <a href="#" v-if="!this.loggedinUser" @click="showSignupModal">Sign Up</a>
            <a href="#" v-if="!this.loggedinUser" @click="showLoginModal">Login</a>
            <a href="#">Trips</a>
            <a href="#">Wishlist</a>
            <hr>
            <RouterLink to="/stay/edit/">Airanbnb your home</RouterLink>
            <a class="logout-btn" v-if="this.loggedinUser" @click="doLogout">Logout</a>
        </div>

        <div v-if="showSignup" @click.stop>
            <div class="modal-container">
                <div class="modal-content">
                    <form @submit.prevent="doSignup">
                        <section class="modal-header">
                            <svg @click="closeModal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 3; overflow: visible;"><path d="m6 6 20 20M26 6 6 26"></path></svg>
                            <h3 class="header-txt">Sign up</h3>
                        </section>
                        <hr>
                        <h3>Welcome to Airbnb</h3>
                        <input type="text" v-model="signupCred.fullname" placeholder="Your full name" />
                        <input type="text" v-model="signupCred.username" placeholder="Username" />
                        <input type="password" v-model="signupCred.password" placeholder="Password" />
                        <ImgUploader @uploaded="onUploaded" />
                        <div class="btn-wrapper">
                            <FancyBtn class="submit-btn" :content="'Sign up'" />
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div v-if="showLogin" @click.stop>
            <div class="modal-container">
                <div class="modal-content">
                    <form @submit.prevent="doLogin">
                        <section class="modal-header">
                            <svg @click="closeModal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 3; overflow: visible;"><path d="m6 6 20 20M26 6 6 26"></path></svg>
                            <h3 class="header-txt">Log in</h3>
                        </section>
                        <input type="text" v-model="loginCred.username" placeholder="Username" />
                        <input type="password" v-model="loginCred.password" placeholder="Password" />
                        <div class="btn-wrapper">
                            <FancyBtn class="submit-btn" :content="'Login'" />
                        </div>
                    </form>
                </div>
            </div>
        </div>


    </div>
</template>
  
  
<script>
import ImgUploader from './ImgUploader.vue'
import FancyBtn from './FancyBtn.vue'
export default {
    props: {
        showModal: Boolean,
    },
    data() {
        return {
            // showModal: Boolean,
            showSignup: false,
            showLogin: false,
            msg: '',
            loginCred: { username: 'user1', password: '123' },
            signupCred: { username: '', password: '', fullname: '', imgUrl: '' },
        }
    },
    computed: {
        users() {
            return this.$store.getters.users
        },
        isLoading() {
            return this.$store.getters.usersIsLoading
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser
        },
    },
    created() {
        this.loadUsers()
    },
    methods: {
        async doLogin() {
            if (!this.loginCred.username) {
                this.msg = 'Please enter username/password'
                return
            }
            try {
                await this.$store.dispatch({ type: "login", userCred: this.loginCred })
                this.showLogin = !this.showLogin
                this.$router.push('/')
            } catch (err) {
                console.log(err)
                this.msg = 'Failed to login'
            }
        },
        doLogout() {
            this.$store.dispatch({ type: 'logout' })
        },
        async doSignup() {
            if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
                this.msg = 'Please fill up the form'
                this.showModal = false
                return
            }
            await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
            this.showSignup = false
            this.$router.push('/')

        },
        loadUsers() {
            this.$store.dispatch({ type: "loadUsers" })
        },
        async removeUser(userId) {
            try {
                await this.$store.dispatch({ type: "removeUser", userId })
                this.msg = 'User removed'
            } catch (err) {
                this.msg = 'Failed to remove user'
            }
        },
        onUploaded(imgUrl) {
            this.signupCred.imgUrl = imgUrl
        },

        showSignupModal() {
            this.showSignup = !this.showSignup
        },
        showLoginModal() {
            this.showLogin = !this.showLogin
        },
        closeModal() {
            this.showSignup = false
            this.showLogin = false
        },


    },
    components: {
        ImgUploader,
        FancyBtn

    }
}
</script>


  