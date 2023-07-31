<template>
    <section class="guest-picker">
        <header v-if="showHeader">
            Guests
        </header>
        <span v-if="capacity" class="capacity">
            This place has a maximum of {{ capacity }} guests, not including infants.
        </span>
        <ul class="clean-list">
            <li class="flex justify-between">
                <div>
                    <div class="title">Adults</div>
                    <div>Age 13+</div>
                </div>
                <div>- 1 +</div>
            </li>
            <li class="flex justify-between">
                <div>
                    <div class="title">Children</div>
                    <div>Ages 2-12</div>
                </div>
                <div>- 0 +</div>
            </li>
            <li class="flex justify-between">
                <div>
                    <div class="title">Infants</div>
                    <div>Under 2</div>
                </div>
                <div>- 0 +</div>
            </li>
            <li class="flex justify-between">
                <div>
                    <div class="title">Pets</div>
                    <div class="bold underline">Bringing a service animal?</div>
                </div>
                <div>- 0 +</div>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    props: ['capacity', 'showHeader'],
    created() {

    },
    data() {
        return {

        }
    }
}
</script>

<style lang="scss">
.guest-picker {
    display: grid;
    position: absolute;
    right: 0;
    min-width: 17.5rem;
    padding: 1rem;
    z-index: 10;
    border-radius: 0.25rem;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 6px 0px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px;
    background-color: white;
    
    header {
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: nowrap;
    }

    .capacity {
        grid-row: 2;
    }

    ul {
        margin-block-start: 0.5rem;
    }
}
</style>