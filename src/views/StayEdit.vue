<template>
    <section v-if="stay" class="stay-edit flex justify-center align-center">
        <ul>{{ stay.name }}</ul>
        <ul>{{ stay.price }}</ul>
        <ul>
            <li v-for="label in stay.labels" :key="label">{{ label }}</li>
        </ul>
        <form @submit.prevent="saveStay" class="flex space-between align-center">
            <input class="input" v-model="stay.name" type="text">
            <input class="input" v-model="stay.price" type="number">
            <button class="btn">Save</button>
        </form>
    </section>
</template>
<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { stayService } from '../services/stay.service.js'
export default {
    data() {
        return {
            stay: null,
        }
    },
    watch: {
        async '$route.params'() {
            const { stayId } = this.$route.params;
            if (stayId) {
                try {
                    const stay = await stayService.getById(stayId)
                    this.stay = stay
                } catch (error) {
                    console.error('Error fetching stay:', error)
                }
            } else {
                this.stay = stayService.getEmptyStay()
            }
        },
        immediate: true,
    },
    async created() {
        this.handleRouteParamsChange()
    },
    watch: {
        '$route.params'() {
            this.handleRouteParamsChange()
        },
    },
    methods: {
        async handleRouteParamsChange() {
            const { stayId } = this.$route.params
            if (stayId) {
                try {
                    const stay = await stayService.getById(stayId)
                    this.stay = stay
                } catch (error) {
                    console.error('Error fetching stay:', error)
                }
            } else {
                this.stay = stayService.getEmptyStay()
            }
        },
        async saveStay() {
            try {
                await this.$store.dispatch({ type: 'saveStay', stay: this.stay })
                showSuccessMsg('Added/Updated succssefully')
                this.$router.push('/stay')
            } catch (err) {
                showErrorMsg("Couldn't add/update stay")
                throw new Error(err)
            }
        },
    }
}
</script>