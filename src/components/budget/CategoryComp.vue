<template>
    <!-- Contenedor principal del formulario -->
    <div class="form">
      <!-- Campo de entrada para el nombre de la categoría -->
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
  import { ref } from "vue"; // Importa ref para crear variables reactivas
  import { defineEmits } from "vue"; // Importa defineEmits para emitir eventos desde el componente
  import { AddCategory } from "../../data/categories/categories"; // Importa la función que añade una categoría
  
  // Define el evento que se emitirá cuando se añada una categoría
  const emit = defineEmits(["category-added"]);
  
  // Crea una referencia reactiva para almacenar el nombre de la categoría
  const name = ref("");
  
  // Función que se ejecuta al hacer clic en el botón "Añadir"
  function handleClick() {
      // Verifica que el campo de entrada no esté vacío
      if (name.value !== "") {
          // Llama a la función AddCategory para añadir la nueva categoría
          AddCategory(name.value, "none");
          // Emite el evento "category-added" para notificar al componente padre
          emit('category-added');
      }
  }
  </script>
  