<template>
    <li class="stay-preview">
        <div class="prev-img-container">
            <MainGallery :stay="stay" @goToDetails="$router.push('/stay/' + stay._id)" />
            <div class="heart-icon">
                <svg @click.prevent="toggleHeart" :class="{ liked: isLiked }" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false"
                    style="display: block; height: 24px; width: 24px; stroke: white; stroke-width: 2; overflow: visible;">
                    <path
                        d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z">
                    </path>
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
            <!-- home preview -->
            <section v-if="stay.loc" class="preview-data">
                <h3 class="black-bold preview-loc">{{ stay.loc.country }}, {{ stay.loc.city }}</h3>
                <h3 class="light-gray preview-name"> {{ trimName }} </h3>
                <h3 class="light-gray">{{ stay.capacity }} guests</h3>
                <h3 class="black-bold preview-price">${{ stay.price }} <span class="black-regular">night</span></h3>
            </section>
            <!-- wishlist preview' -->
            <section v-else class="preview-data">
                <h3 class="black-bold preview-loc">{{ stay.name }}</h3>
                <h3 class="light-gray">{{ stay.capacity }} guests</h3>
                <h3 class="light-gray">{{ stay.days }} nights · Saved for {{ stayDates }}</h3>
                <h3 class="black-bold preview-price">
                    ${{ stay.price }}
                    <span class="black-regular">night ·
                        <span class="light-gray underline">
                            ${{ totalPrice }} total</span>
                        </span>
                    <span></span>
                </h3>
                <h3 class="preview-note">Add a note</h3>
            </section>
            <!-- rating -->
            <section class="preview-rating">
                <div class="rate-star">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation"
                        focusable="false" style="display: block; height: 12px; width: 12px; fill: currentcolor;">
                        <path fill-rule="evenodd"
                            d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z">
                        </path>
                    </svg>
                </div>
                <h3 class="rate-num">{{ rating }}</h3>
            </section>
        </div>
    </li>
</template>
<script>
// import { FOCUSABLE_CHILDREN } from 'element-plus/es/directives/trap-focus';
import MainGallery from './MainGallery.vue';
import { utilService } from '../services/util.service';
export default {
    name: 'StayPreview',
    props: ['stay'],
    data() {
        return {
            isLiked: false,
            date1: null,
            date2: null,
            _stay: null,
        }
    },
    created() {
        this._stay = { ...this.stay }
        this.date1 = new Date(this._stay.startDate)
        this.date2 = new Date(this._stay.endDate)
    },
    methods: {
        toggleHeart() {
            this.isLiked = !this.isLiked
            console.log('this.stay', this.stay);
            if (this.isLiked) this.addToWishlist()
            else this.removeFromWishlist()
        },
        addToWishlist() {
            console.log('this.stay._id', this.stay._id)
            this.$store.dispatch({ type: 'addToWishlist', stayId: this.stay._id })
        },
        removeFromWishlist() {
            this.$store.dispatch({ type: 'removeFromWishlist', stayId: this.stay._id })
        },
    },
    computed: {
        stayDates() {
            const monthsEnum = { 0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec' }
            let dateStr
            const startDay = this.date1.getDate()
            const endDay = this.date2.getDate()
            if (this.date1.getMonth() === this.date2.getMonth()) {
                const month = monthsEnum[this.date1.getMonth()]
                dateStr = `${month} ${startDay} - ${endDay}`
            }
            else {
                const month1 = monthsEnum[this.date1.getMonth()]
                const month2 = monthsEnum[this.date2.getMonth()]
                dateStr = `${month1} ${startDay} - ${month2} ${endDay}`
            }
            return dateStr
        },
        totalPrice() {
            return Number(this.stay.price) * Number(this.stay.days)
        },
        trimName(){
            return utilService.trimTxt(this.stay.name)
        },
        rating() {
            // console.log('rating computed: this.stay', this._stay);
            return utilService.calcRating({ ...this._stay })
        }
    },
    components: {
    MainGallery,
  },
}
</script>