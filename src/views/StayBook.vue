<template>
    <section class="book">
        <h1>Confirm and pay</h1>
        <section class="book-content">
            <article class="shadow">
                <h2>Your trip</h2>
                <div>
                    <h3>Dates</h3>
                    {{ dates }}
                </div>
                <div>{{ guestCount }}</div>
                <h3></h3>
            </article>
            <article class="shadow">
                stay details
            </article>
            <article>
                Price details
                <div>
                    Total
                </div>
            </article>
            <FancyBtn :content="'Reserve'" />
        </section>
    </section>
</template>

<script>
import FancyBtn from '../cmps/FancyBtn.vue'

export default {
    created() {

    },
    methods: {
        getCheckin() {
            return new Date('2023-10-19')
        },
        getCheckout() {
            return new Date('2023-10-25')
        }
    },
    computed: {
        dates() {
            const checkin = this.getCheckin()
            const checkout = this.getCheckout()
            let from = (new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(checkin.getTime()))
            let to = ''
            if (checkin.getYear() !== checkout.getYear()) {
                from += `, ${checkin.getYear()}`
                to = (new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(checkout.getTime()))
                to += `, ${checkout.getYear()}`
            } else if (checkin.getMonth() !== checkout.getMonth()) {
                to = (new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(checkout.getTime()))
            } else {
                to = checkout.getDate()
            }
            return from + ' - ' + to
        },
        guestCount() {
            const count = 2
            return count + ' guest' + (count > 1 ? 's' : '')
        },
    },
    components: {
        FancyBtn,
    }
}
</script>