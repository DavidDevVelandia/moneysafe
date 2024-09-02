<template>
  <div>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs';
import { defineProps, computed } from 'vue';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Registrar los componentes necesarios
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const props = defineProps({
  data: Array,
  type: String
});

const chartData = computed(() => {
  return {
    labels: props.data.map(item => item.date),
    datasets: [
      {
        label: props.type,
        data: props.data.map(item => props.type === 'income' ? item.income : item.expense),
        borderColor: props.type === 'income' ? 'green' : 'red',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 2,
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Desactiva la leyenda si no la necesitas
    },
    tooltip: {
      enabled: true,
    },
    title: {
      display: true,
      text: `${props.type}`,
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
};

</script>
