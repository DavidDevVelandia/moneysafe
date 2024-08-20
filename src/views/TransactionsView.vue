<template>
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
</template>
<style scoped>
    .chart-container {
        margin-top: 30vh;        
        height: 400px;
        width: 80vw;
    }
</style>
    
<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart as ChartJS, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { showTransactionExpense } from '@/data/transactions';
  
// Registrar los componentes de Chart.js
ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
  
const chartCanvas = ref(null);
let chartInstance = null;
  
const transactionsExpenses = showTransactionExpense();
  
// Función para calcular la suma de gastos por categoría
function calculateExpensesByCategory() {
  const categoryTotals = {};

  transactionsExpenses.value.forEach(transaction => {
    const categoryName = transaction.category.name; // Usar solo el nombre de la categoría
    if (categoryTotals[categoryName]) {
      categoryTotals[categoryName] += transaction.expense;
    } else {
      categoryTotals[categoryName] = transaction.expense;
    }
  });

  return categoryTotals;
}
  
  // Crear y actualizar la gráfica
function renderChart() {
    const categoryTotals = calculateExpensesByCategory();
    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);
  
    if (chartInstance) {
      chartInstance.destroy(); // Destruir la instancia anterior para evitar superposiciones
    }
  
    chartInstance = new ChartJS(chartCanvas.value, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Gastos por Categoría',
            backgroundColor: '#5347D8',
            data,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
}
  
onMounted(() => {
    renderChart();
});
  
watch(transactionsExpenses, renderChart);
</script>
  
