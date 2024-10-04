<template>
  <div class="menu">
    <button @click="showExpensesView" class="btn">Gastos</button>
    <Button @click="showIncomesView" class="btn">Ingresos</Button>
  </div>
  <div  class="graphs">
    <ExpensesHistoryComp v-if="showExpenses"/>
    <IncomesHistoryComp v-if="showIncomes"/>
  </div>
  
</template>
<style lang="scss" scoped>
@import './../scss/colors';
.menu{
  display: flex;
  justify-content: space-evenly;
  margin-top: 6rem;
  width: 100%;
}
.btn{
  height: 3rem;
  width: 6rem;
  color: $md-theme-light-on-primary;
  background-color: $md-theme-light-primary;
  border: none;
  border-radius: 30px;
}
.btn:hover{
  background-color: #5e51d4;
}
.btn:active{
  background-color: #8076d8;
}
@media (min-width: 581px) {
  .graphs{
  margin: 2rem auto;
  width: 70vw;
  border-radius: 20px;
  border-color: $md-theme-light-secondary-container;
  border-style: solid;
}
}

</style>
<script setup>
import { ref } from 'vue';
import ExpensesHistoryComp from '@/components/Transactions/ExpensesHistoryComp.vue';
import IncomesHistoryComp from '@/components/Transactions/IncomesHistoryComp.vue';

const showExpenses = ref(true)
const showIncomes = ref(false)

function showExpensesView(){
  showExpenses.value = true
  showIncomes.value = false
}
function showIncomesView(){
  showExpenses.value = false
  showIncomes.value = true
}

</script>