<template>
  <div>
    <canvas id="clock-chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  props: ['values', 'labels'],
  data() {
    return {
    };
  },
  watch:{
    values(){
      this.renderChart()
      }
    
  },
  methods:{
renderChart(){
const ctx = document.getElementById("clock-chart");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "Liczba dni",
            data: this.values,
            backgroundColor: "rgba(54,73,93,.5)",
            borderColor: "#36495d",
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        lineTension: 1,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                padding: 5,
              },
            },
          ],
        },
      },
    });
}
  },
  mounted() {
    this.renderChart()
  },
};
</script>