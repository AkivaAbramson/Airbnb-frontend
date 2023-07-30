<template>
    <button class="btn btn-fancy" @mousemove="onHover($event)">
    </button>
</template>

<script>
export default {
    methods: {
        onHover(ev) {
            const btn = ev.target
            btn.style.setProperty('--mouse-x', ev.offsetX)
            btn.style.setProperty('--mouse-y', ev.offsetY)
        }
    }
}
</script>

<style lang="scss">
.btn-fancy {
    position: relative;
    --mouse-x: 0;
    --mouse-y: 0;

    height: 3rem;
    width: 100%;
    font: bold 1rem 'Circular';
    color: white;
    border-radius: 0.5rem;
    background-color: transparent;
    background-repeat: repeat;
    background-image: linear-gradient(to right, rgb(189, 30, 89) 0%, rgb(146, 23, 77) 50%, rgb(134, 20, 83) 100%);

    &:before {
        content: 'Reserve';
        display: grid;
        position: absolute;
        align-items: center;
        height: 100%;
        width: 100%;
        z-index: 2;
    }

    &::after {
        content: '';
        display: grid;
        align-items: center;
        border-radius: 0.5rem;
        height: 100%;
        width: 100%;
        background-image: radial-gradient(circle at center center, rgb(108, 13, 99) 0%, rgb(108, 13, 99) 10%, rgb(134, 20, 83) 27.5%, rgb(146, 23, 77) 45%, rgb(189, 30, 89) 70%, rgb(215, 4, 102) 100%);
        background-position: calc(var(--mouse-x, 0) * 1px) calc(var(--mouse-y, 0) * 1px);
        background-size: 200% 200%;
        transition: opacity 1.25s;
        opacity: 0;
    }

    &:hover::after {
        opacity: 1;
    }
}

.price {
    font-size: 1rem;

    .notify {
        text-align: center;
        margin-block-start: 1rem;
        font-size: 0.875rem;
    }

    .price-calc {
        padding-block: 1.5rem;
        margin-block-end: 1.5rem;

        div:first-child:first-child {
            margin-block-end: 1rem;
        }
    }
}
</style>