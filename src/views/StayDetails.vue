<template>
    <section v-if="stay" class="stay-details" :key="stayId">
        <section class="fixed-navbar shadow">
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
                        Reserve
                        <FancyBtn @click="onReserve()" :content="'Reserve'" />
                    </div>
                </article>
            </div>
        </section>
        <section class="header-details">
            <h1>{{ stay.name }}</h1>
            <div class="top-details flex justify-between align-end">
                <div>
                    <RateAndRev class="header-spacer" :reviews="stay.reviews" />
                    <span class="bold underline">{{ locName }}</span>
                </div>
                <div>
                    <RouterLink v-if="false" :to="'/stay/edit/' + stay._id" class="btn btn-top underline">Edit</RouterLink>
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
        <section class="main-details shadow">
            <section>
                <article class="grid-host shadow">
                    <h2>Entire stay hosted by {{ stay.host.fullname }}</h2>
                    <img v-if="hostImg" :src="hostImg">
                    <ol class="clean-list">
                        <li>{{ stay.capacity }} guests</li>
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
                </ul>
            </section>
            <Order :stay="stay"></Order>
        </section>
        <StayReviews id="small-reviews" class="small" :reviews="stay.reviews" />
        <section ref="location" class="stay-map">
            Map
        </section>
    </section>
</template>
  
<script>
import { stayService } from '../services/stay.service.local'
import { svgService } from '../services/svg.service'
import { utilService } from '../services/util.service'
import { eventBus } from '../services/event-bus.service'
import Order from '../cmps/Order.vue'
import RateAndRev from '../cmps/RateAndRev.vue'
import StayReviews from './StayReviews.vue'
import FancyBtn from '../cmps/FancyBtn.vue'
export default {
    name: 'StayDetails',
    mounted() {
        window.addEventListener('resize', this.checkClamped)
        window.addEventListener('resize', this.setBottoms)
        window.addEventListener('scroll', this.setBottoms)
        eventBus.on('reserve', this.onReserve)
    },
    unmounted() {
        window.removeEventListener('resize', this.checkClamped)
        window.removeEventListener('resize', this.setBottoms)
        window.removeEventListener('scroll', this.setBottoms)
    },
    data() {
        return {
            stay: null,
            stayId: this.$route.params.stayId,
            stayImages: null,
            hostImg: null,
            isClamped: false,
            elGallery: null,
            elBtn: null,
            elNavbar: null,
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
                this.updateQuery()
                this.checkClamped()
                this.setBottoms()
            } catch (err) {
                throw 'Failed to load stay '
            }
        },
        async getStayImages() {
            const stayImages = []
            for (let i = 0; i < Math.max(5, this.stay.imgUrls.length); i++) {
                const res = await fetch(this.stay.imgUrls[i])
                stayImages[i] = res.status === 200 ? this.stay.imgUrls[i] : 'src/assets/defaultStay.png'
            }
            return stayImages
        },
        async getUserImg(imgUrl) {
            const res = await fetch(imgUrl)
            return (res.status === 200 ? imgUrl : 'src/assets/defaultUser.svg')
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
            if (!((startDate >= (new Date((new Date()).toLocaleDateString()).getTime())) && (endDate - startDate) / dayMilli >= 1)) {
                delete newQuery.startDate
                delete newQuery.endDate
                newQuery.startDate = '2023-09-07'
                newQuery.endDate = '2023-09-23'
            }
            this.$router.replace({ query: newQuery })
        },
        checkClamped() {
            const elTxt = this.elTxt || document.getElementById('txt-summary')
            if (!elTxt) return
            const lineHeight = parseFloat(getComputedStyle(elTxt).lineHeight)
            this.isClamped = (elTxt.offsetHeight / lineHeight) > parseInt(getComputedStyle(elTxt).getPropertyValue('--max-lines'))
        },
        setBottoms() {
            const elGallery = this.elGallery || (this.elGallery = document.querySelector('.image-gallery'))
            const elBtn = this.elBtn || (this.elBtn = document.querySelector('.order .btn-fancy'))
            const elNavbar = this.elNavbar || (this.elNavbar = document.querySelector('.fixed-navbar'))
            elNavbar?.style.setProperty('--navbar-display', (elGallery?.getBoundingClientRect().bottom > 0 ? 'none' : 'grid'))
            elNavbar?.style.setProperty('--btn-display', (elBtn?.getBoundingClientRect().bottom > 80 ? 'none' : 'grid'))
        },
        scrollTo(ref) {
            window.scrollTo({ top: ref?.offsetTop - 128, behavior: 'smooth' })
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
            this.$router.push({ name: 'StayBook', params: {stayId: this.stay._id}, query: this.$route.query })
        }
    },
    computed: {
        locName() {
            return this.stay.loc.city + ', ' + this.stay.loc.country
        },
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
    }
}
</script>
  