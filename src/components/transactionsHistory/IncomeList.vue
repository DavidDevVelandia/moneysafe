<template>
  <div>
    <LineChart :data="groupedIncomes" type="ingreso" />
  </div>
</template>

<script setup>
import LineChart from '@/components/transactionsHistory/LineChart.vue';
import { showTransactionIncome } from '@/data/transactions';
import { ref, computed, watch, defineProps } from 'vue';

// Props
const props = defineProps({
  filter: String,
});

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
      groupedData[key] = { date: key, income: 0 };
    }

    groupedData[key].income += item.income || 0;
  });

  return Object.values(groupedData).sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Computed para obtener los datos agrupados según el filtro
const groupedIncomes = computed(() => groupDataByFilter(incomes.value, props.filter));

// Watch para actualizar cuando cambie el filtro
watch(() => props.filter, () => {
  groupedIncomes.value = groupDataByFilter(incomes.value, props.filter);
});
</script>
