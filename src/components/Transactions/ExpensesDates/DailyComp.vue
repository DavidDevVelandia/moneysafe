<template>
  <div class="main">
    <h1>Gastos</h1>
    <canvas ref="canvasBar" id="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import { showTransactionExpense } from "@/data/transactions";

// Registra los elementos necesarios de Chart.js
Chart.register(...registerables);

// Referencia al elemento canvas
const canvasBar = ref(null);

// Obtiene las transacciones de manera reactiva
const transactionsExpenses = ref(showTransactionExpense());

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
  const labels = transactionsExpenses.value.map(transaction => {
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
              const transaction = transactionsExpenses.value[index];
              return `Categoría: ${transaction.category.name}, Ingreso: $${transaction.expense}, Fecha: ${formatDate(transaction.date)}`;
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
            text: 'Gastos ($)'
          }
        }
      }
    },
    data: {
      labels: labels, // Muestra la hora en el eje X
      datasets: [
        {
          label: "Gastos",
          data: transactionsExpenses.value.map(transaction => transaction.expense),
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
onMounted(createChart);

// Observa los cambios en transactionsExpenses y actualiza el gráfico
watch(transactionsExpenses, createChart);
</script>

<style scoped>
.main {
  margin-top: 100px;
}
</style>
