<template>
    <div class="date-picker" role="">
        <header v-if="header" class="flex justify-between">
            <div class="txt-title flex column">
                <h2 class="picker-title">{{ header.title }}</h2>
                <h3 class="picker-subtitle">{{ header.subtitle }}</h3>
            </div>
            <div class="btn-modes flex">
                <button class="btn-checkin flex column">
                    <span class="title">check-in</span>
                    <span :class="{ empty: !range.start }">{{ dateFormat(range.start) }}</span>
                </button>
                <button class="btn-checkout flex column">
                    <span class="title">check-out</span>
                    <span :class="{ empty: !range.end }">{{ dateFormat(range.end) }}</span>
                </button>
            </div>
        </header>
        <VDatePicker transparent borderless expanded
        v-model.range.string="range"
        :attributes="attributes"
        :min-date="minDate"
        :min-page="minPage"
        :masks="{ modelValue: 'YYYY-M-D' }"
        :columns="Math.max(1, columns)"
        @update:modelValue="$emit('date-change', { startDate: range.start, endDate: range.end })" />
        <footer v-if="footer" class="picker-footer">
            <div
            v-if="footer.clear"
            @click="onClear()"
            class="btn-clear underline">
            Clear dates
            </div>
            <div
            v-if="footer.close"
            class="btn-black"
            @click="$emit('close')">
            Close
            </div>
            <div
            v-if="footer.save"
            class="btn-black"
            @click="$emit('save-changes')">
            Save
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    props: ['range', 'attributes', 'header', 'footer', 'columns'],
    methods: {
        onClear() {
            this.range.start = ''
            this.range.end = ''
            this.$emit('clear')
        }
    },
    computed: {
        minDate() {
            return new Date()
        },
        minPage() {
            const today = new Date()
            return {
                day: today.getDate() + 1,
                month: today.getMonth() + 1,
                year: today.getFullYear(),
            }
        },
        dateFormat() {
            return (date) => {
                return date ? new Date(date).toLocaleDateString() : ''
            }
        }
    }
}
</script>