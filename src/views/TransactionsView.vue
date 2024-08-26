<template>
  <div class="chart-container">
    <canvas ref="expenseAmountChartCanvas"></canvas>
  </div>
  <div class="chart-container">
    <canvas ref="incomeAmountChartCanvas"></canvas>
  </div>
  <div class="chart-container">
    <canvas ref="totalAmountChartCanvas"></canvas>
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
import { Chart as ChartJS, LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { showTransactionExpense, showTransactionIncome } from '@/data/transactions';

// Registrar los componentes de Chart.js
ChartJS.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const expenseAmountChartCanvas = ref(null);
const incomeAmountChartCanvas = ref(null);
const totalAmountChartCanvas = ref(null);

let expenseAmountChartInstance = null;
let incomeAmountChartInstance = null;
let totalAmountChartInstance = null;

const transactionsExpenses = showTransactionExpense();
const transactionsIncomes = showTransactionIncome();

function calculateTransactionAmounts() {
  let expenseAmounts = [];
  let incomeAmounts = [];
  let totalAmounts = [];
  let expenseCategories = [];
  let incomeCategories = [];

  transactionsExpenses.value.forEach(transaction => {
    expenseAmounts.push(transaction.expense);
    expenseCategories.push(transaction.category.name); // Guardamos la categoría
  });

  transactionsIncomes.value.forEach(transaction => {
    incomeAmounts.push(transaction.income);
    incomeCategories.push(transaction.category.name); // Guardamos la categoría
  });

  // Calcular el total acumulado
  const maxLength = Math.max(expenseAmounts.length, incomeAmounts.length);
  for (let i = 0; i < maxLength; i++) {
    const expense = expenseAmounts[i] || 0;
    const income = incomeAmounts[i] || 0;
    const previousTotal = totalAmounts[i - 1] || 0;
    totalAmounts.push(previousTotal + income - expense);
  }

  return {
    expenses: expenseAmounts,
    incomes: incomeAmounts,
    totals: totalAmounts,
    expenseCategories,
    incomeCategories,
  };
}

// Crear y actualizar la gráfica de gastos
function renderExpenseAmountChart() {
  const amounts = calculateTransactionAmounts();
  const labels = amounts.expenseCategories; // Usamos las categorías para las etiquetas
  const data = amounts.expenses;

  if (expenseAmountChartInstance) {
    expenseAmountChartInstance.destroy();
  }

  expenseAmountChartInstance = new ChartJS(expenseAmountChartCanvas.value, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Valor de Gastos',
          borderColor: '#FF5733',
          backgroundColor: '#FF5733',
          data,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Categoría',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Valor ($)',
          },
          beginAtZero: true,
        },
      },
    },
  });
}

// Crear y actualizar la gráfica de ingresos
function renderIncomeAmountChart() {
  const amounts = calculateTransactionAmounts();
  const labels = amounts.incomeCategories; // Usamos las categorías para las etiquetas
  const data = amounts.incomes;

  if (incomeAmountChartInstance) {
    incomeAmountChartInstance.destroy();
  }

  incomeAmountChartInstance = new ChartJS(incomeAmountChartCanvas.value, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Valor de Ingresos',
          borderColor: '#34A853',
          backgroundColor: '#34A853',
          data,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Categoría',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Valor ($)',
          },
          beginAtZero: true,
        },
      },
    },
  });
}

// Crear y actualizar la gráfica del total acumulado
function renderTotalAmountChart() {
  const amounts = calculateTransactionAmounts();
  const labels = amounts.expenseCategories; // Usamos las categorías de los gastos para las etiquetas
  const data = amounts.totals;

  if (totalAmountChartInstance) {
    totalAmountChartInstance.destroy();
  }

  totalAmountChartInstance = new ChartJS(totalAmountChartCanvas.value, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Total Acumulado ($)',
          borderColor: '#5347D8',
          backgroundColor: '#5347D8',
          data,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Categoría',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Valor ($)',
          },
          beginAtZero: true,
        },
      },
    },
  });
}


onMounted(() => {
  renderExpenseAmountChart();
  renderIncomeAmountChart();
  renderTotalAmountChart();
});

watch(transactionsExpenses, () => {
  renderExpenseAmountChart();
  renderTotalAmountChart();
});

watch(transactionsIncomes, () => {
  renderIncomeAmountChart();
  renderTotalAmountChart();
});
</script>
