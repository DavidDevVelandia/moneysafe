<template>
    <!-- Contenedor principal del formulario para añadir ingresos -->
    <div class="form">
      <!-- Campo de entrada para el nombre de la categoría de ingresos -->
      <input type="text" v-model="name" class="inp" />
  
      <!-- Botón para añadir la categoría, que llama a la función handleClick -->
      <button class="button__add inp" @click.prevent="handleClick">Añadir</button>
    </div>  
  </template>
  
  <style lang="scss" scoped>
  /* Estilos para el contenedor del formulario */
  .form {
      display: flex; /* Utiliza flexbox para organizar los elementos */
      flex-direction: column; /* Dispone los elementos en columna */
      align-items: center; /* Centra los elementos horizontalmente */
  }
  
  /* Estilos para los elementos de entrada */
  .inp {
      margin: 0.5rem; /* Espaciado vertical entre los elementos */
      width: 10rem; /* Ancho fijo para los campos de entrada */
  }
  
  /* Estilos específicos para el botón de añadir */
  .button__add {
      width: 5rem; /* Ancho fijo para el botón */
  }
  </style>
  
  <script setup>
  // Importa las funcionalidades necesarias desde Vue
  import { ref } from "vue"; // Para crear variables reactivas
  import { defineEmits } from "vue"; // Para definir eventos que el componente puede emitir
  import { AddCategoryIncome } from "@/data/categories/categoriesIncomes"; // Importa la función para añadir una categoría de ingresos
  
  // Define el evento que se emitirá cuando se añada una categoría
  const emit = defineEmits(["category-added"]);
  
  // Crea una referencia reactiva para almacenar el nombre de la categoría de ingresos
  const name = ref("");
  
  // Función que se ejecuta al hacer clic en el botón "Añadir"
  function handleClick() {
      // Verifica que el campo de entrada no esté vacío
      if (name.value !== "") {
          // Llama a la función AddCategoryIncome para añadir la nueva categoría de ingresos
          AddCategoryIncome(name.value, "none");
          // Emite el evento "category-added" para notificar al componente padre
          emit('category-added');
      }
  }
  </script>
  