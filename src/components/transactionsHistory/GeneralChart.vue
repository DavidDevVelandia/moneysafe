<template>
  <div>
    <LineChart :data="combinedData" type="combined" />
  </div>
</template>

<script setup>
import LineChart from '@/components/transactionsHistory/LineChart.vue';
import { computed } from 'vue';
import { showTransactionExpense, showTransactionIncome } from '@/data/transactions.js';

const expenses = computed(() => showTransactionExpense().value);
const incomes = computed(() => showTransactionIncome().value);

const combinedData = computed(() => {
  const expenseData = expenses.value.map(e => ({
    date: e.date,
    expense: e.expense,
    income: 0
  }));

  const incomeData = incomes.value.map(i => ({
    date: i.date,
    expense: 0,
    income: i.income
  }));

  // Combine and sort by date
  const allData = [...expenseData, ...incomeData].reduce((acc, curr) => {
    const found = acc.find(item => item.date === curr.date);
    if (found) {
      found.expense += curr.expense;
      found.income += curr.income;
    } else {
      acc.push(curr);
    }
    return acc;
  }, []).sort((a, b) => new Date(a.date) - new Date(b.date));

  return allData;
});
</script>
