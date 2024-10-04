<template>
    <div class="main">
      <h1>Gastos por Mes</h1>
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
  
  // Obtiene las transacciones
  const transactionsExpenses = showTransactionExpense();
  
  // Formatea la fecha a 'Mes Año'
  const formatMonthYear = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { month: 'short', year: 'numeric' }).format(date);
  };
  
  // Agrupa los gastos por mes
  const groupExpensesByMonth = (transactions) => {
    const groupedExpenses = {};
  
    transactions.forEach(transaction => {
      const monthYear = formatMonthYear(transaction.date);
      if (!groupedExpenses[monthYear]) {
        groupedExpenses[monthYear] = 0;
      }
      groupedExpenses[monthYear] += transaction.expense; // Suma los gastos del mismo mes
    });
  
    return groupedExpenses;
  };
  
  // Crea el gráfico
  const createChart = () => {
    const ctx = canvasBar.value.getContext('2d');
  
    // Destruye el gráfico si ya existe
    if (window.myChart) {
      window.myChart.destroy();
    }
  
    // Agrupa los gastos por mes
    const groupedExpenses = groupExpensesByMonth(transactionsExpenses.value);
    
    // Extrae los meses y los gastos agrupados
    const labels = Object.keys(groupedExpenses);
    const data = Object.values(groupedExpenses);
  
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
              // Muestra la categoría y el gasto acumulado en el tooltip
              label: function(context) {
                const month = labels[context.dataIndex];
                const totalExpense = data[context.dataIndex];
                return `Mes: ${month}, Gasto Total: $${totalExpense}`;
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
              text: 'Gastos Acumulados ($)'
            }
          }
        }
      },
      data: {
        labels: labels, // Los meses como etiquetas en el eje X
        datasets: [
          {
            label: "Gastos",
            data: data, // Los gastos acumulados en el eje Y
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
  