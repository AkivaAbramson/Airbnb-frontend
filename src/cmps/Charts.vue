<template>
  <section class="host-charts-container">

    <div class="pie-chart">
      <h1>Stay Length</h1>
      <PieChart class="chart" :chartData="nightCategoryData" />
    </div>

    <div class="bar-chart">
      <BarChart class="chart" :chartData="stayRevenue" />
    </div>

    <div class="total-revenue">
      <div>

        <h1 class="title">Total revenue</h1>
        <div class="info">
          <h4 class="grey">This month</h4>
          <h4>$5,355</h4>
        </div>
        <div class="info">
          <h4 class="grey">This year</h4>
          <h4>$10,710</h4>
        </div>
        <div class="info">
          <h4 class="grey">Total income</h4>
          <h4>$16,492</h4>
        </div>
      </div>

    </div>

    <div class="order-state">
      <div>
        <h1 class="title">Orders State</h1>
        <div class="info">
          <h4 class="grey">52</h4>
          <h4>Total orders</h4>
        </div>
        <div class="info">
          <h4 class="grey">2</h4>
          <h4>Occupied stays</h4>
        </div>
      </div>
    </div>

  </section>
</template>
  
<script>

// import { shuffle } from 'lodash';
// import { computed, defineComponent, ref } from 'vue';
// import { DoughnutChart } from 'vue-chart-3';

// export default defineComponent({
//   name: 'Home',
//   components: { DoughnutChart },
//   setup() {
//     const data = ref([30, 40, 60, 70, 5]);
//     const doughnutRef = ref();

//     const options = ref({
//       responsive: true,
//       plugins: {
//         legend: {
//           position: 'top',
//         },
//         title: {
//           display: true,
//           text: 'Chart.js Doughnut Chart',
//         },
//       },
//     });

//     const stayRevenue = computed(() => ({
//       labels: ['stay1', 'stay2', 'stay2', 'stay4'],
//       datasets: [
//         {
//           data: data.value,
//           backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
//         },
//       ],
//     }));

//     function shuffleData() {
//       data.value = shuffle(data.value);
//     }

//     return { stayRevenue, shuffleData, doughnutRef, options };
//   },
// });


import { defineComponent, ref } from 'vue';
import { BarChart, PieChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  name: 'Home',
  components: { BarChart, PieChart },

  setup() {
    const clr1 = '#BCCEF8', clr2 = '#9ED5C5', clr3 = '#F7A4A4', clr4 = '#F8C4B4'
    const nightCategoryData = {
      // labels: ['1-3 nights', '4-7 nights', '+7 nights'],
      datasets: [
        {
          data: [30, 40, 60], // Sample data for bookings (can be your actual data)
          backgroundColor: [clr1, clr2, clr3],
        },
      ],
    };

    const stayRevenue = {
      labels: ['stay1', 'stay2', 'stay2', 'stay4'],
      datasets: [
        {
          data: [5, 31, 12, 22], // Sample data for bookings per month (can be your actual data)
          backgroundColor: [clr1, clr2, clr3, clr4],
        },
      ],
    };

    return { nightCategoryData, stayRevenue };
  },
});
</script>
  
<style lang="scss"></style>