<template>
    <section class="guest-picker">
        <header v-if="showHeader">
            Guests
        </header>
        <span v-if="capacity" class="capacity">
            This place has a maximum of {{ capacity }} guests, not including infants.
        </span>
        <ul class="clean-list">
            <li>
                <div>
                    <div class="title">Adults</div>
                    <div class="subtitle">Age 13+</div>
                </div>
                <div class="stepper">
                    <button class="btn" @click="changeGuestCount('adult', -1, 1, capacity - child)"
                    :class="{ disable: adult <= 1 }">
                    <span v-html="getSvg('minus')"></span>
                </button>
                <span class="counter">{{ adultCount }}</span>
                <button class="btn" @click="changeGuestCount('adult', 1, 1, capacity - child)" :class="{ disable: adult + child >= capacity }">
                    <span v-html="getSvg('plus')"></span>
                </button>
            </div>
        </li>
            <li>
                <div>
                    <div class="title">Children</div>
                    <div class="subtitle">Ages 2-12</div>
                </div>
                <div class="stepper">
                    <button class="btn" @click="changeGuestCount('child', -1, 0, capacity - adult)" :class="{ disable: !child }">
                        <span v-html="getSvg('minus')"></span>
                    </button>
                    <span class="counter">{{ childCount }}</span>
                    <button class="btn" @click="changeGuestCount('child', 1, 0, capacity - adult)" :class="{ disable: adult + child >= capacity }">
                        <span v-html="getSvg('plus')"></span>
                    </button>
                </div>
            </li>
            <li>
                <div>
                    <div class="title">Infants</div>
                    <div class="subtitle">Under 2</div>
                </div>
                <div class="stepper">
                    <button class="btn" @click="changeGuestCount('infant', -1, 0, 5)" :class="{ disable: !infant }">
                        <span v-html="getSvg('minus')"></span>
                    </button>
                    <span class="counter">{{ infantCount }}</span>
                    <button class="btn" @click="changeGuestCount('infant', 1, 0, 5)" :class="{ disable: infant >= 5 }">
                        <span v-html="getSvg('plus')"></span>
                    </button>
                </div>
            </li>
            <li>
                <div>
                    <div class="title">Pets</div>
                    <div class="bold underline">Bringing a service animal?</div>
                </div>
                <div class="stepper">
                    <button class="btn" @click="changeGuestCount('pet', -1, 0, 5)" :class="{ disable: !pet }">
                        <span v-html="getSvg('minus')"></span>
                    </button>
                    <span class="counter">{{ petCount }}</span>
                    <button class="btn" @click="changeGuestCount('pet', 1, 0, 5)" :class="{ disable: pet >= 5 }">
                        <span v-html="getSvg('plus')"></span>
                    </button>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
import { svgService } from '../services/svg.service'
const params = ['adult', 'child', 'infant', 'pet']
export default {
    props: ['capacity', 'showHeader'],
    created() {
        for (const key in this.$data) {
            this[key] = parseInt(this.$route.query[key]) || 0
        }
    },
    data() {
        return {
            adult: 1,
            child: 0,
            infant: 0,
            pet: 0,
        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        addChild() {
            if (this.adult + this.child < this.capacity) {
                this.child++
            }
        },
        changeGuestCount(guestType, dif, min, max) {
            this[guestType] += dif
            if (this[guestType] < min || this[guestType] > max) {
                this[guestType] -= dif
            } else {
                const newQuery = Object.assign({}, this.$route.query)
                for (const key of params) {
                    if (this[key]) {
                        newQuery[key] = this[key]
                    } else {
                        delete newQuery[key]
                    }
                }
                this.$emit('guest-count', newQuery)
            }
        }
    },
    computed: {
        adultCount() {
            if (this.adult + this.child > this.capacity) {
                if (this.adult >= 1) {
                    this.adult--
                }
            }
            if (this.adult <= 0) {
                this.adult++
            }
            return this.adult
        },
        childCount() {
            if (this.adult + this.child > this.capacity) {
                if (this.child) {
                    this.child--
                }
            }
            if (this.child < 0) {
                this.child++
            }
            return this.child
        },
        infantCount() {
            if (this.infant > 5) {
                this.infant--
            }
            if (this.infant < 0) {
                this.infant++
            }
            return this.infant
        },
        petCount() {
            if (this.pet > 5) {
                this.pet--
            }
            if (this.pet < 0) {
                this.pet++
            }
            return this.pet
        },

    }
}
</script>