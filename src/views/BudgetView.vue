<template>
  <nav class="nav">
      <router-link :to="{name: 'expenses'}" class="router">Gastos</router-link>

      <router-link :to="{name: 'incomes'}" class="router">Ingresos</router-link>
  </nav>
  <router-view/>
</template>
<style lang="scss" scoped>
@import './../scss/colors';
.nav{
  margin-top: 8rem;
  display: flex;
  width: 100%;
  justify-content: space-around;
}
.router{
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  width: 10rem;
  height: 3rem;
  background-color: $md-theme-light-primary;
  color: $md-theme-light-on-primary;
  text-decoration: none;
  font-size: 2.4vh;
}
.router:hover{
  background-color: #5e51d4;
}
.router:active{
  background-color: #8076d8;
}
</style>
<script setup>

</script>