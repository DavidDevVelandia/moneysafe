<template>
  <div>
    <LineChart :data="incomes" type="income" />
  </div>
</template>

<script setup>
import LineChart from '@/components/transactionsHistory/LineChart.vue';
import { showTransactionIncome } from '@/data/transactions';
import { computed } from 'vue';

const incomes = computed(() => showTransactionIncome().value);
</script>
