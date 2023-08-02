<template>
    <button class="btn btn-fancy" @mousemove="onHover($event)" :style="`--content: ${txt}`">
    </button>
</template>

<script>
export default {
    props: ['content'],
    data() {
        return {
            txt: JSON.stringify(this.content)
        }
    },
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

    border: none;
    cursor: pointer;
    height: 3rem;
    width: 100%;
    font: bold 1rem 'Circular';
    color: white;
    border-radius: 0.5rem;
    background-color: transparent;
    background-repeat: repeat;
    background-image: linear-gradient(to right, rgb(230, 30, 77) 0%, rgb(227, 28, 95) 50%, rgb(215, 4, 102) 100%);

    &:before {
        content: var(--content);
        display: grid;
        position: absolute;
        align-items: center;
        font: bold 1rem 'Circular';
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
        background-image: radial-gradient(circle at center center, rgb(189, 30, 89) 0%, rgb(189, 30, 89) 27.5%, rgb(215, 4, 102) 40%, rgb(227, 28, 95) 57.5%, rgb(230, 30, 77) 75%, rgb(255, 56, 92) 100%);
        background-position: calc(var(--mouse-x, 0) * 1px) calc(var(--mouse-y, 0) * 1px);
        background-size: 200% 200%;
        transition: opacity 1.25s;
        opacity: 0;
    }

    &:hover::after {
        opacity: 1;
    }
}
</style>