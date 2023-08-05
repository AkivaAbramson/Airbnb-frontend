<!-- <template>
  <VDatePicker
    class="date-picker"
    v-model.range="range"
    :select-attribute="selectDragAttribute"
    :drag-attribute="selectDragAttribute"
    @drag="dragValue = $event"
    @click:date="handleDateClick"
    @keyup.enter="handleDateClick"
  >
    <template #day-popover="{ format }">
      <div class="text-sm">
        {{ format(dragValue ? dragValue.start : range.start, 'MMM D') }}
        -
        {{ format(dragValue ? dragValue.end : range.end, 'MMM D') }}
      </div>
    </template>
  </VDatePicker>
</template>

<script setup>
import { ref, computed } from 'vue';

const range = ref({
  start: new Date(2023, 7, 8),
  end: new Date(2023, 7, 9),
});
console.log(range)
const dragValue = ref(null);
const selectDragAttribute = computed(() => ({
  popover: {
    visibility: 'hover',
    isInteractive: false,
  },
}));

const handleDateClick = (date) => {
  // Your custom logic here to handle the selected date
  // this.$emit('chosenDate', range._value)
  console.log('Selected date:', range._value);
};
</script> -->


  
  