<template>
  <section class="host-charts-container">

    <div class="pie-chart">
      <h1 class="pie-title">Nights per order</h1>
      <PieChart class="chart" :chartData="nightCategoryData" :options="pieOptions" />
    </div>

    <div class="bar-chart">
      <h1 class="bar-title">Revenue per home</h1>
      <BarChart class="chart" :chartData="stayRevenue" :options="barOptions" />
    </div>

    <div class="total-revenue">
      <div class="rev-container">
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
          <h4 class="grey">Total orders</h4>
          <h4>52</h4>
        </div>
        <div class="info">
          <h4 class="grey">Unoccupied homes</h4>
          <h4>4</h4>
        </div>
        <div class="info">
          <h4 class="grey">Incoming orders</h4>
          <h4>1</h4>
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
      labels: ['+7 nights', '3-6 nights', '1-2 nights'],
      datasets: [
        {
          data: [20, 32, 48], // Sample data for bookings (can be your actual data)
          backgroundColor: [clr1, clr2, clr3],
        },
      ],
    };

    const pieOptions = {
      plugins: {
        tooltip: {
          callbacks: {
            // Customize the label text in the tooltip
            label: (context) => {
              const dataset = context.dataset;
              if (!dataset.data || dataset.data.length === 0) return '';
              const dataIndex = context.dataIndex;
              const value = dataset.data[dataIndex];
              // Use the custom labels defined in the nightCategoryData
              const label = nightCategoryData.labels[dataIndex];
              // Here, you can format the label as per your requirement
              return `${label}: ${value}%`;
            },
          },
        },
        legend: {
          display: false, // Hide the legend as we are displaying labels on hover
        },
      },
    };


    const stayRevenue = {
      labels: [ 'Cottage', 'Suite', 'Studio','Villa'],
      datasets: [
        {
          data: [3509, 4278, 2383, 6322], // Sample data for bookings per month (can be your actual data)
          backgroundColor: [clr1, clr2, clr3, clr4],
        },
      ],
    };
    const topText = ['$5', '$31', '$12', '$22'];

    const barOptions = {
      plugins: {
        legend: {
          display: false, // Hide the legend
        },
        annotation: {
          annotations: topText.map((text, index) => ({
            type: 'text',
            x: index, // Bar index (0, 1, 2, ...)
            y: stayRevenue.datasets[0].data[index] + 2, // Adjust the y position as needed
            text,
            font: {
              size: 14,
              weight: 'bold',
            },
            color: '#000', // Text color
            textAlign: 'center',
          })),
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    return { nightCategoryData, stayRevenue, pieOptions, barOptions };
  },
});
</script>
  
<style lang="scss"></style>