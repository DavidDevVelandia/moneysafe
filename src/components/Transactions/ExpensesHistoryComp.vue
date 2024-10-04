<template>
  <div class="container">
    <button class="btn" @click="ChartType='Daily'">Diario</button>
    <button class="btn" @click="ChartType='Monthly'">Mensual</button>
    <button class="btn" @click="ChartType='Anualy'">Anual</button>
  </div>
  <DailyComp v-if="ChartType=='Daily'"/>
  <MonthlyComp v-if="ChartType=='Monthly'"/>
  <AnualyComp v-if="ChartType=='Anualy'"/>
</template>
<style lang="scss" scoped>
@import './../../scss/colors';
.container{
  display: flex;
  width: 80%;
  margin: 2rem auto;
  justify-content: space-around;
}
.btn{
  height: 3rem;
  width: 8rem;
  border-radius: 20px;
  color: $md-theme-light-on-primary;
  background-color: $md-theme-light-primary;
  border: none;
}
.btn:hover{
  background-color: #5e51d4;
}
.btn:active{
  background-color: #8076d8;
}

</style>
<script setup>
import { ref } from 'vue';
import DailyComp from './ExpensesDates/DailyComp.vue';
import MonthlyComp from './ExpensesDates/MonthlyComp.vue';
import AnualyComp from './ExpensesDates/AnualyComp.vue';
const ChartType = ref("Daily")
</script>