<template>
    <section v-if="stay" class="stay-details" :key="stayId">
        <section class="top-container full">
            <section class="header-details">
                <h1>{{ stay.name }}</h1>
                <div class="top-details flex justify-between align-end">
                    <div>
                        <RateAndRev class="header-spacer" :reviews="stay.reviews" />
                        <span class="bold underline">{{ locName }}</span>
                    </div>
                    <div>
                        <RouterLink v-if="false" :to="'/stay/edit/' + stay._id" class="btn btn-top underline">Edit
                        </RouterLink>
                        <button class="btn btn-top underline">
                            <svg v-html="getSvg('heart')"></svg>
                            <span>Save</span>
                        </button>
                    </div>
                </div>
            </section>
            <section ref="photos" v-if="stayImages" class="image-gallery">
                <div v-for="i in 5" :class="getImgClass(i)">
                    <img :src="stayImages[i - 1]">
                </div>
            </section>
        </section>
        <section class="main-details shadow">
            <section>
                <article class="grid-host shadow">
                    <h2>Entire stay hosted by {{ stay.host.fullname }}</h2>
                    <img v-if="hostImg" :src="hostImg">
                    <ol class="clean-list flex align-center">
                        <li v-if="stay.capacity" class="header-spacer">{{ stay.capacity }} guests</li>
                        <li v-if="stay.bedrooms" class="header-spacer"> {{ stay.bedrooms }} bedrooms</li>
                        <li v-if="stay.beds" class="header-spacer"> {{ stay.beds }} beds</li>
                        <li v-if="stay.bathrooms"> {{ stay.bathrooms }} baths</li>
                    </ol>
                </article>
                <ul class="notable-features shadow clean-list">
                    <li class="feature">
                        <svg v-html="getSvg('Dedicated workspace')"></svg>
                        <div>
                            <h3>
                                Dedicated workspace
                            </h3>
                            <p>
                                A room with wifi that is well-suited for working.
                            </p>
                        </div>
                    </li>
                    <li class="feature">
                        <svg v-html="getSvg('checkin')"></svg>
                        <div>
                            <h3>
                                Self check-in
                            </h3>
                            <p>
                                Check yourself in with the lockbox.
                            </p>
                        </div>
                    </li>
                    <li class="feature">
                        <svg v-html="getSvg('calendar')"></svg>
                        <div>
                            <h3>
                                Free cancellation for 48 hours.
                            </h3>
                        </div>
                    </li>
                </ul>
                <article class="stay-summary shadow">
                    <div :class="{ clamped: this.isClamped }">
                        <span id="txt-summary">{{ stay.summary }}</span>
                    </div>
                </article>
                <ul ref="amenities" class="amenities clean-list">
                    <h2>What this place offers</h2>
                    <li v-for="i in Math.min(10, stay.amenities.length)" class="flex align-center amenity">
                        <svg v-html="getSvg(stay.amenities[i - 1])"></svg>
                        {{ stay.amenities[i - 1] }}
                    </li>
                    <button class="btn btn-showall bold" v-if="stay.amenities.length > 10">
                        Show all {{ stay.amenities.length }} amenities
                    </button>
                </ul>
            </section>
            <Order ref="refOrder" :stay="stay" @btn-mounted="(ref) => elBtn = ref"></Order>
        </section>
        <StayReviews id="small-reviews" class="small" :reviews="stay.reviews" />
        <section ref="location" class="stay-map">
            <h2>Where you’ll be</h2>
            <GoogleMap v-if="center" class="google-map" :apiKey="'AIzaSyAnbTuVXoF2tUKkZvxkYf3PkP-GX0nAvsA'" :center="center"
                :zoom="15">
                <CustomMarker :options="{ position: center }">
                    <div class="marker-container">
                        <svg class="map-marker home-marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                            aria-hidden="true" role="presentation" focusable="false"
                            style="display: block; height: 22px; width: 22px; fill: currentcolor;">
                            <path
                                d="m8.6 1.15.1.08 7.15 6.91-.7.72L14 7.75v6.75a.5.5 0 0 1-.41.5H10V9.5a.5.5 0 0 0-.41-.5H6.5a.5.5 0 0 0-.5.41V15H2.5a.5.5 0 0 1-.5-.41V7.75L.85 8.86l-.7-.72L7.3 1.23a1 1 0 0 1 1.3-.08z">
                            </path>
                        </svg>
                        <svg class="map-marker airbnb-marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                            aria-hidden="true" role="presentation" focusable="false"
                            style="display: block; height: 22px; width: 22px; fill: currentcolor;">
                            <path
                                d="M8 0c.9 0 1.73.39 2.33 1.08.2.23.33.44.5.73l.1.2.24.44.87 1.7a172.87 172.87 0 0 1 1.99 4.07l.7 1.52.37.79.1.28.06.13c.22.63.3 1.24.2 1.87a3.72 3.72 0 0 1-2.28 2.91 3.83 3.83 0 0 1-1.88.25 4.52 4.52 0 0 1-1.71-.57 6.71 6.71 0 0 1-1.1-.79l-.28-.24-.21-.21-.21.2a7.77 7.77 0 0 1-.92.75l-.23.15-.23.14a4.52 4.52 0 0 1-1.7.57 3.83 3.83 0 0 1-1.89-.25 3.72 3.72 0 0 1-2.28-2.91 3.83 3.83 0 0 1 .2-1.87l.05-.13.05-.13.14-.31.99-2.15c.64-1.35 1.3-2.71 1.99-4.07l.69-1.34.42-.8c.22-.41.37-.65.6-.93A3.03 3.03 0 0 1 8 0zm0 1.5a1.53 1.53 0 0 0-1.19.56 3.68 3.68 0 0 0-.42.66l-.18.34-.18.34-.73 1.43a171.53 171.53 0 0 0-1.97 4.03L2.7 10.2l-.35.77-.2.47a2.33 2.33 0 0 0-.13 1.16 2.22 2.22 0 0 0 1.36 1.73c.36.15.75.2 1.15.15a3.03 3.03 0 0 0 1.14-.39c.54-.3 1.09-.76 1.7-1.45a8.64 8.64 0 0 1-1.79-3.37A3.4 3.4 0 0 1 5.52 8c.06-.38.17-.65.37-.95C6.35 6.38 7.14 6 8 6s1.65.37 2.1 1.04c.21.3.35.64.4 1.02.07.39.04.82-.06 1.27-.22.99-.84 2.1-1.81 3.3a6.92 6.92 0 0 0 1.7 1.45c.39.22.76.35 1.14.4.4.04.79-.01 1.15-.16a2.22 2.22 0 0 0 1.36-1.73 2.33 2.33 0 0 0-.13-1.16 6.8 6.8 0 0 0-.2-.47l-.17-.38-.17-.37-.64-1.36a171.37 171.37 0 0 0-1.97-4.03l-.68-1.34-.23-.43-.18-.34a3.66 3.66 0 0 0-.42-.66A1.53 1.53 0 0 0 8 1.5zm0 6c-.67 0-1 .35-1 1.05 0 .7.33 1.52 1 2.45.67-.93 1-1.75 1-2.45 0-.7-.33-1.05-1-1.05z">
                            </path>
                        </svg>
                    </div>
                    <Circle :options="circle" />
                </CustomMarker>
            </GoogleMap>
            <h3>{{ stay.loc.address }}</h3>
        </section>
        <section ref="navbar" class="fixed-navbar full shadow">
            <div class="nav-content">
                <ul class="clean-list flex">
                    <li>
                        <a @click="scrollTo($refs.photos)">Photos</a>
                    </li>
                    <li>
                        <a @click="scrollTo($refs.amenities)">Amenities</a>
                    </li>
                    <li>
                        <a @click="scrollToReviews()">Reviews</a>
                    </li>
                    <li>
                        <a @click="scrollTo($refs.location)">Location</a>
                    </li>
                </ul>
                <article class="fixed-order">
                    <span class="fixed-details">
                        <span class="top-price bold">${{ formatNumber(stay.price) }}</span>
                        <RateAndRev :reviews="stay.reviews" />
                    </span>
                    <div class="btn-wrapper">
                        {{ btnOrderText }}
                        <FancyBtn @click.stop="onReserve()" :content="btnOrderText" />
                    </div>
                </article>
            </div>
        </section>
    </section>
</template>
  
<script>
// import { stayService } from '../services/stay.service.local'
import { stayService } from '../services/stay.service'
import { svgService } from '../services/svg.service'
import { utilService } from '../services/util.service'
import { eventBus } from '../services/event-bus.service'
import { ref, defineComponent } from 'vue'
import { GoogleMap, CustomMarker, Circle } from 'vue3-google-map'
import Order from '../cmps/Order.vue'
import RateAndRev from '../cmps/RateAndRev.vue'
import StayReviews from './StayReviews.vue'
import FancyBtn from '../cmps/FancyBtn.vue'
export default {
    name: 'StayDetails',
    setup() {
        const refOrder = ref()
        const elBtn = ref()
        const center = ref()
        const circle = ref()
        return { refOrder, elBtn, center, circle }
    },
    mounted() {
        window.addEventListener('resize', this.checkClamped)
        window.addEventListener('resize', this.setNavbar)
        window.addEventListener('scroll', this.setNavbar)
        eventBus.on('reserve', this.onReserve)
        eventBus.on('btn-mounted', ref => this.elBtn = ref)
    },
    unmounted() {
        window.removeEventListener('resize', this.checkClamped)
        window.removeEventListener('resize', this.setNavbar)
        window.removeEventListener('scroll', this.setNavbar)
        eventBus.off('reserve')
        eventBus.off('btn-mounted')
    },
    data() {
        return {
            stay: null,
            stayId: this.$route.params.stayId,
            stayImages: null,
            hostImg: null,
            isClamped: false,
            elTxt: null,
        }
    },
    async created() {
        try {
            await this.loadStay()
        } catch (err) {
            console.log(err)
            this.$router.push('/')
        }
    },
    methods: {
        async loadStay() {
            try {
                this.stay = await stayService.getById(this.stayId)
                this.stayImages = await this.getStayImages()
                this.hostImg = await this.getUserImg(this.stay.host.imgUrl)
                if (this.stay.loc.lat && this.stay.loc.lan) {
                    this.center = { lat: this.stay.loc.lat, lng: this.stay.loc.lan }
                    this.circle = {
                        center: this.center,
                        radius: 520,
                        strokeOpacity: 0,
                        fillColor: "#ff385c",
                        fillOpacity: 0.18,
                    }
                }
                this.updateQuery()
                this.checkClamped()
                this.setNavbar()
            } catch (err) {
                throw 'Failed to load stay '
            }
        },
        async getStayImages() {
            const stayImages = []
            for (let i = 0; i < Math.max(5, this.stay.imgUrls.length); i++) {
                stayImages[i] = this.stay.imgUrls[i] || 'src/assets/defaultStay.png'
            }
            return stayImages
        },
        async getUserImg(imgUrl) {
            return imgUrl || 'src/assets/defaultUser.svg'
        },
        getImgClass(i) {
            return {
                big: i === 1,
                small: i > 1,
                top: i < 4
            }
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        updateQuery() {
            const newQuery = Object.assign({}, this.$route.query)
            if (!(newQuery.adult > 0)) {
                newQuery.adult = 1
            }
            const dayMilli = 1000 * 60 * 60 * 24
            const startDate = (new Date(this.$route.query.startDate || 0)).getTime()
            const endDate = (new Date(this.$route.query.endDate || 0)).getTime()
            if (!((startDate >= (new Date((new Date()).toLocaleDateString()).getTime())) && (!endDate || (endDate - startDate) / dayMilli >= 1))) {
                delete newQuery.startDate
                delete newQuery.endDate
                newQuery.startDate = '2023-8-9'
                newQuery.endDate = '2023-8-14'
            }
            this.$router.replace({ query: newQuery })
        },
        checkClamped() {
            const elTxt = this.elTxt || document.getElementById('txt-summary')
            if (!elTxt) return
            const lineHeight = parseFloat(getComputedStyle(elTxt).lineHeight)
            this.isClamped = (elTxt.offsetHeight / lineHeight) > parseInt(getComputedStyle(elTxt).getPropertyValue('--max-lines'))
        },
        setNavbar() {
            let navbarProperty = this.$refs.photos?.getBoundingClientRect().bottom > 0 ? 'none' : 'grid'
            let btnProperty = this.elBtn?.getBoundingClientRect().bottom > 80 ? 'none' : 'grid'
            if (window.innerWidth < 745) {
                btnProperty = 'grid'
                navbarProperty = 'grid'
            }
            this.$refs.navbar?.style.setProperty('--navbar-display', navbarProperty)
            this.$refs.navbar?.style.setProperty('--btn-display', btnProperty)
        },
        scrollTo(ref) {
            window.scrollTo({ top: ref?.offsetTop - 128, behavior: 'smooth' })
            console.log(ref, ref?.offsetTop - 128)
        },
        scrollToReviews() {
            if (!this.refReviews) {
                this.refReviews = document.getElementById('small-reviews')
            }
            this.scrollTo(this.refReviews)
        },
        formatNumber(num) {
            return utilService.formatNumber(num)
        },
        onReserve() {
            if (this.$route.query.startDate && this.$route.query.endDate) {
                this.$router.push({ name: 'StayBook', params: { stayId: this.stay._id }, query: this.$route.query })
            } else {
                if (window.innerWidth >= 745) {
                    window.scrollBy({ top: this.$refs.refOrder.$refs.dates.getBoundingClientRect().top - 128, behavior: 'smooth' })
                } else {

                }
                this.$refs.refOrder.showDateModal = true
            }
        }
    },
    computed: {
        locName() {
            return this.stay.loc.city + ', ' + this.stay.loc.country
        },
        btnOrderText() {
            return (this.$route.query.startDate && this.$route.query.endDate ?
                'Reserve' : 'Check availability')
        }
    },
    async beforeRouteUpdate(to, from) {
        if (this.stayId === to.params.stayId) return
        this.stayId = null
        this.stay = null
        try {
            this.stayId = to.params.stayId
            await this.loadStay()
        } catch (err) {
            console.log(err)
            this.$router.push('/')
        }
    },
    components: {
        Order,
        RateAndRev,
        StayReviews,
        FancyBtn,
        GoogleMap,
        CustomMarker,
        Circle
    }
}
</script>
  