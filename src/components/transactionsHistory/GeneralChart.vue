<template>
  <div>
    <LineChart :data="combinedData" type="general" />
  </div>
</template>

<!-- GeneralChart.vue -->
<script setup>
import LineChart from '@/components/transactionsHistory/LineChart.vue';
import { computed, watch } from 'vue';
import { showTransactionExpense, showTransactionIncome } from '@/data/transactions.js';
import { ref, defineProps } from 'vue';

// Props
const props = defineProps({
  filter: String,
});

// Datos originales
const expenses = ref(showTransactionExpense().value);
const incomes = ref(showTransactionIncome().value);

// Función para agrupar datos según el filtro
function groupDataByFilter(data, filter) {
  const groupedData = {};

  data.forEach((item) => {
    let key;
    const date = new Date(item.date);

    switch (filter) {
      case 'año': {
        key = date.getFullYear();
        break;
      }
      case 'mes': {
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
        break;
      }
      case 'semana': {
        const startOfYear = new Date(date.getFullYear(), 0, 1);
        key = `Semana ${Math.ceil(((date - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7)}`;
        break;
      }
      case 'día': {
        key = date.toLocaleDateString('es-ES', { weekday: 'long' });
        break;
      }
      default: {
        key = item.date;
      }
    }

    if (!groupedData[key]) {
      groupedData[key] = { date: key, income: 0, expense: 0 };
    }

    groupedData[key].income += item.income || 0;
    groupedData[key].expense += item.expense || 0;
  });

  return Object.values(groupedData).sort((a, b) => new Date(a.date) - new Date(b.date));
}


// Computed para obtener los datos combinados y agrupados
const combinedData = computed(() => {
  const allData = [...expenses.value, ...incomes.value];
  return groupDataByFilter(allData, props.filter);
});

// Watch para actualizar cuando cambie el filtro
watch(() => props.filter, () => {
  combinedData.value = groupDataByFilter([...expenses.value, ...incomes.value], props.filter);
});
</script>

