<template>
  <div class="container">
    <nav class="tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab" 
        :class="{ active: selectedTab === tab }" 
        @click="selectedTab = tab"
      >
        {{ tab }}
      </button>
    </nav>

    <div class="filter-options">
      <button 
        v-for="filter in filters" 
        :key="filter" 
        :class="{ active: selectedFilter === filter }" 
        @click="selectedFilter = filter"
      >
        {{ filter }}
      </button>
    </div>

    <div class="content">
      <GeneralChart v-if="selectedTab === 'General'" :filter="selectedFilter" />
      <ExpenseList v-if="selectedTab === 'Gastos'" :filter="selectedFilter" />
      <IncomeList v-if="selectedTab === 'Ingresos'" :filter="selectedFilter" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import GeneralChart from '@/components/transactionsHistory/GeneralChart.vue';
import ExpenseList from '@/components/transactionsHistory/ExpenseList.vue';
import IncomeList from '@/components/transactionsHistory/IncomeList.vue';

const selectedTab = ref('General');
const selectedFilter = ref('by year');

const tabs = ['General', 'Gastos', 'Ingresos'];
const filters = ['by year', 'by month', 'by week', 'by day'];
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.container {
  margin-top: 10rem;
  padding: 1rem;
  background-color: $md-theme-light-surface;
  border-radius: 10px;
}

.tabs {
  display: flex;
  justify-content: space-around;
  background-color: $md-theme-light-primary-container;
  border-radius: 10px;
  padding: 0.5rem;

  button {
    flex: 1;
    padding: 0.5rem;
    background: transparent;
    border: none;
    font-weight: bold;
    color: $md-theme-light-on-primary-container;
    text-transform: uppercase;
    cursor: pointer;

    &.active {
      color: $md-theme-light-primary;
      border-bottom: 2px solid $md-theme-light-primary;
    }
  }
}

.filter-options {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;

  button {
    flex: 1;
    padding: 0.5rem;
    background: transparent;
    border: none;
    color: $md-theme-light-outline;
    cursor: pointer;

    &.active {
      color: $md-theme-light-primary;
      border-bottom: 2px solid $md-theme-light-primary;
      font-weight: bold;
    }
  }
}

.content {
  margin-top: 1rem;
}
</style>
