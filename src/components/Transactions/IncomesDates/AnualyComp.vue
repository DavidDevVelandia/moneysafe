<template>
    <div class="main">
      <h1>Ingresos por Año</h1>
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
  
  // Formatea la fecha para mostrar solo el año
  const formatYear = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear(); // Devuelve solo el año
  };
  
  // Agrupa los ingresos por año y los suma
  const groupByYear = (transactions) => {
    const grouped = {};
    transactions.forEach(transaction => {
      const year = formatYear(transaction.date);
      if (!grouped[year]) {
        grouped[year] = 0;
      }
      grouped[year] += transaction.income; // Suma los ingresos si ya existe
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
  
    // Agrupa las transacciones por año
    const groupedData = groupByYear(transactionsIncome.value);
    const labels = Object.keys(groupedData); // Obtiene los años
    const data = Object.values(groupedData); // Obtiene los ingresos por año
  
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
                const year = labels[index];
                const income = data[index];
                return `Año: ${year}\nIngreso Total: $${income}`;
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Año'
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
        labels: labels, // Muestra los años en el eje X
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
  