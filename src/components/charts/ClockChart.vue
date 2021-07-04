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
            backgroundColor: "rgba(215,70,26,.5)",
            borderColor: "#a82b00",
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