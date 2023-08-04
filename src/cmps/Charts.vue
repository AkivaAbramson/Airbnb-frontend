<template>
    <section class="chart-container">
      <PieChart class="pie-chart" :chartData="nightCategoryData" />
      <BarChart class="bar-chart" :chartData="monthlyData" />
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { BarChart, PieChart } from 'vue-chart-3';
  import { Chart, registerables } from "chart.js";
  
  Chart.register(...registerables);
  
  export default defineComponent({
    name: 'Home',
    components: { BarChart, PieChart },
    setup() {
      const nightCategoryData = {
        labels: ['1-3 nights', '4-7 nights', '+7 nights'],
        datasets: [
          {
            data: [30, 40, 60], // Sample data for bookings (can be your actual data)
            backgroundColor: ['blue', 'green', 'red'],
          },
        ],
      };
  
      const monthlyData = {
        labels: ['Jan', 'Feb', 'March', 'April'],
        datasets: [
          {
            data: [40, 30, 60, 48], // Sample data for bookings per month (can be your actual data)
            backgroundColor: ['red', 'blue', 'green', 'orange'],
          },
        ],
      };
  
      return { nightCategoryData, monthlyData };
    },
  });
  </script>
  
  <style lang="scss">
.chart-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;

  .pie-chart,
  .bar-chart {
    max-width: 400px;
    
  }
}
</style>