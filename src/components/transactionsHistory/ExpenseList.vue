<template>
  <div>
    <LineChart :data="expenses" type="expense" />
  </div>
</template>

<script setup>
import LineChart from '@/components/transactionsHistory/LineChart.vue';
import { showTransactionExpense } from '@/data/transactions.js';
import { computed } from 'vue';

const expenses = computed(() => showTransactionExpense().value);
</script>
