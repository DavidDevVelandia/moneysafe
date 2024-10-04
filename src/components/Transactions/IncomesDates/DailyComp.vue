<template>
  <div class="main">
    <h1>Ingresos del día</h1>
    <canvas ref="canvasBar" id="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import { showTransactionIncome } from "@/data/transactions";

// Registra los elementos necesarios de Chart.js
Chart.register(...registerables);

// Referencia al elemento canvas
const canvasBar = ref(null);

// Obtiene las transacciones como un ref para hacerlas reactivas
const transactionsIncomes = ref(showTransactionIncome()); 

// Formatea la fecha
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
  }).format(date);
};

// Crea el gráfico
const createChart = () => {
  const ctx = canvasBar.value.getContext('2d');

  // Destruye el gráfico si ya existe
  if (window.myChart) {
    window.myChart.destroy();
  }

  // Mapea los datos para obtener solo la hora del día en el eje X
  const labels = transactionsIncomes.value.map(transaction => {
    const date = new Date(transaction.date);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`; // Solo la hora
  });

  // Crea el gráfico
  window.myChart = new Chart(ctx, {
    type: "line",
    options: {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            // Muestra la fecha completa en el tooltip
            label: function(context) {
              const index = context.dataIndex;
              const transaction = transactionsIncomes.value[index];
              return `Categoría: ${transaction.category.name}, Ingreso: $${transaction.income}, Fecha: ${formatDate(transaction.date)}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Hora del Día'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Ingresos ($)'
          }
        }
      }
    },
    data: {
      labels: labels, // Muestra la hora en el eje X
      datasets: [
        {
          label: "Ingresos",
          data: transactionsIncomes.value.map(transaction => transaction.income),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
          fill: false,
        }
      ]
    }
  });
};

// Llama a createChart cuando el componente se monte
onMounted(() => {
  if (canvasBar.value) {
    createChart();
  }
});

// Observa los cambios en transactionsIncomes y actualiza el gráfico
watch(transactionsIncomes, createChart);
</script>

<style scoped>
.main {
  margin-top: 100px;
}
</style>
