<template>
  <div class="main">
    <h1>Ingresos por Mes</h1>
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

// Obtiene las transacciones de ingresos
const transactionsIncome = showTransactionIncome();

// Formatea la fecha para mostrar solo el mes y año
const formatMonthYear = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', {
    month: 'short',
    year: 'numeric'
  }).format(date);
};

// Agrupa los ingresos por mes y los suma
const groupByMonth = (transactions) => {
  const grouped = {};
  transactions.forEach(transaction => {
    const monthYear = formatMonthYear(transaction.date);
    if (!grouped[monthYear]) {
      grouped[monthYear] = 0;
    }
    grouped[monthYear] += transaction.income; // Suma los ingresos si ya existe
  });
  return grouped;
};

// Crea el gráfico de líneas
const createChart = () => {
  const ctx = canvasBar.value.getContext('2d');

  // Destruye el gráfico si ya existe
  if (window.myChart) {
    window.myChart.destroy();
  }

  // Agrupa las transacciones por mes
  const groupedData = groupByMonth(transactionsIncome.value);
  const labels = Object.keys(groupedData); // Obtiene los meses
  const data = Object.values(groupedData); // Obtiene los ingresos por mes

  // Crea el gráfico de líneas
  window.myChart = new Chart(ctx, {
    type: "line",
    options: {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            // Muestra la fecha completa y el monto de ingresos en el tooltip
            label: function(context) {
              const index = context.dataIndex;
              const monthYear = labels[index];
              const income = data[index];
              return `Mes: ${monthYear}\nIngreso Total: $${income}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Mes'
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
      labels: labels, // Muestra los meses en el eje X
      datasets: [
        {
          label: "Ingresos",
          data: data,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2
        }
      ]
    }
  });
};

// Llama a createChart cuando el componente se monte
onMounted(createChart);

// Observa los cambios en transactionsIncome y actualiza el gráfico
watch(transactionsIncome, createChart);
</script>

<style scoped>
.main {
  margin-top: 100px;
}
</style>
