<template lang="">
    <div class="guests-container">
        <section class="adults-sec">
            <div class="txt-sec">
                <h3>Adults</h3>
                <h5 class="light-gray">Ages 13 or above</h5>
            </div>
            <div class="num-picker">
                    <svg @click="updateCounter('adult', 'minus')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; overflow: visible;"><path d="M2 16h28"></path></svg>

                <h4 class="sec-counters"> {{adultCounter }} </h4>
                    <svg @click="updateCounter('adult', 'plus')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; overflow: visible;"><path d="M2 16h28M16 2v28"></path></svg>
            </div>
        </section>
        <span class="sec-divider"></span>
        
        <section class="children-sec">
            <div class="txt-sec">
                <h3>Children</h3>
                <h5 class="light-gray">Ages 2-12</h5>
            </div>
            <div class="num-picker">
                <svg @click="updateCounter('children', 'minus')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; overflow: visible;"><path d="M2 16h28"></path></svg>
                <h4 class="sec-counters"> {{childrenCounter }} </h4>
                <svg @click="updateCounter('children', 'plus')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; overflow: visible;"><path d="M2 16h28M16 2v28"></path></svg>
            </div>
        </section>
        <span class="sec-divider"></span>
        <section class="infants-sec">
            <div class="txt-sec">
                <h3>Infants</h3>
                <h5 class="light-gray">Under 2</h5>
            </div>
            <div class="num-picker">
                <svg @click="updateCounter('infant', 'minus')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; 12px; overflow: visible;"><path d="M2 16h28"></path></svg>
                <h4 class="sec-counters"> {{infantCounter }} </h4>
                <svg @click="updateCounter('infant', 'plus')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; 12px; overflow: visible;"><path d="M2 16h28M16 2v28"></path></svg>
            </div>
        </section>
        <span class="sec-divider"></span>
        <section class="pets-sec">
            <div class="txt-sec">
                <h3>Pets</h3>
                <h5 class="light-gray">Bringing a service animal?</h5>
            </div>
            <div class="num-picker">
                <svg @click="updateCounter('pets', 'minus')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; overflow: visible;"><path d="M2 16h28"></path></svg>
                <h4 class="sec-counters"> {{petsCounter }} </h4>
                <svg @click="updateCounter('pets', 'plus')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; overflow: visible;"><path d="M2 16h28M16 2v28"></path></svg>
            </div>
        </section>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            adultCounter: 0,
            childrenCounter: 0,
            infantCounter: 0,
            petsCounter: 0
        }
    },
    methods: {
        updateCounter(type, operation) {
            if (operation === "plus") {
                this[type + "Counter"]++
            } else if (operation === "minus" && this[type + "Counter"] > 0) {
                this[type + "Counter"]--
            }
        },
    },

}
</script>
<style lang="">
    
</style>