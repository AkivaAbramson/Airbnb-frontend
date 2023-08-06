<template>
    <section class="chart-container flex">
      <div class="pie-chart" >
        <PieChart :chartData="nightCategoryData" />
      </div>
      <div class="bar-chart" >
        <BarChart :chartData="monthlyData" />
      </div>
      <div class="total-revenue">
        <h1 class="revenue-title">Total revenue</h1>
        <div class="revenue-info">
            <h4>This month</h4>
            <h4>$5,355</h4>
        </div>
        <div class="revenue-info">
            <h4>This year</h4>
            <h4>$10,710</h4>
        </div>
        <div class="revenue-info">
            <h4>Total income</h4>
            <h4>$16,492</h4>
        </div>


    </div>
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

</style>