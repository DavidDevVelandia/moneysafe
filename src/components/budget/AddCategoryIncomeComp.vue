<template>
    <div class="div">
      <!-- Contenedor principal que alberga la ventana de categorías -->
      <div class="window">
        <h1>Category Comp</h1> <!-- Título de la ventana -->
        <div class="categories-container">
          <!-- Botones para cada categoría generados dinámicamente -->
          <button v-for="category in categories" :key="category.id" class="item" @click="handleClick(category, $event)">
            <p>{{ category.name }}</p> 
          </button>
        </div>
        <!-- Componente que se muestra si una categoría fue añadida -->
        <CategoryIncomeComp v-if="categoryIsAdded" @category-added="refreshCategories"/>
        <!-- Botón de confirmación -->
        <button @click.prevent="confirm">confirmar</button>
      </div>
    </div>
  </template>
  
  <style lang="scss" scoped>
  @import "./../../scss/colors"; /* Importa el archivo de colores para utilizar variables de color */
  
  /* Estilos para el contenedor principal */
  .div {
      display: flex; /* Usa flexbox para centrar su contenido */
      justify-content: center; /* Centra horizontalmente */
      align-items: center; /* Centra verticalmente */
      width: 100vw; /* Ancho completo de la ventana */
      height: 100%; /* Altura completa */
      background-color: #1c1b1f83; /* Color de fondo semitransparente */
  }
  
  /* Estilos para cada botón de categoría */
  .item {
      display: block; /* Cada botón se comporta como un bloque */
      width: 5rem; /* Ancho fijo para cada botón */
      height: 5rem; /* Altura fija para cada botón */
  }
  
  /* Estilos para la ventana que contiene el contenido */
  .window {
      box-sizing: border-box; /* Incluye padding y border en el cálculo del ancho y alto */
      display: flex; /* Usa flexbox para organizar el contenido verticalmente */
      flex-direction: column; /* Coloca los elementos en una columna */
      justify-content: space-between; /* Espacia los elementos de manera equitativa */
      width: 40vw; /* Ancho del 40% de la ventana */
      min-width: 300px; /* Ancho mínimo */
      height: 80vh; /* Altura del 80% de la ventana */
      padding: 1rem; /* Espaciado interno */
      background-color: $md-theme-light-on-primary; /* Color de fondo usando la variable del tema */
      border: 3px solid $md-theme-light-tertiary; /* Borde con color del tema */
  }
  
  /* Contenedor para los botones de categorías */
  .categories-container {
      display: flex; /* Usa flexbox para organizar los botones */
      flex-wrap: wrap; /* Permite que los botones se envuelvan en varias filas */
      flex-direction: row; /* Coloca los botones en filas */
      justify-content: space-around; /* Espacia los botones equitativamente */
      align-items: center; /* Centra verticalmente los botones */
      height: fit-content; /* Ajusta la altura al contenido */
      min-height: 80px; /* Altura mínima */
      max-height: 400px; /* Altura máxima */
      overflow-y: scroll; /* Habilita el desplazamiento vertical si el contenido excede el alto máximo */
      width: 100%; /* Ancho completo */
  }
  </style>
  
  <script setup>
  import { defineEmits } from "vue"; // Importa defineEmits para emitir eventos desde el componente
  import { ref } from "vue"; // Importa ref para crear propiedades reactivas
  import { ShowCategoriesIncomes } from "@/data/categories/categoriesIncomes"; // Importa la función que muestra las categorías de ingresos
  import CategoryIncomeComp from "./CategoryIncomeComp.vue"; // Importa el componente de categoría de ingresos
  import { changeName } from "@/data/selectedComponent"; // Importa la función para cambiar el nombre de la categoría seleccionada
  
  const categories = ref(ShowCategoriesIncomes()); // Crea una referencia reactiva para las categorías de ingresos
  const categoryIsAdded = ref(true); // Estado para saber si se ha añadido una categoría
  const emit = defineEmits(["confirmed"]); // Define el evento "confirmed" que se emitirá más tarde
  
  console.log(categories.value[0].name); // Muestra en consola el nombre de la primera categoría (para depuración)
  
  // Función que maneja el clic en un botón de categoría
  function handleClick(category) {
      // Verifica si la categoría seleccionada es "add"
      if (category.name === "add") {
          // Alterna el estado de categoryIsAdded
          categoryIsAdded.value = !categoryIsAdded.value;
      } else {
          // Cambia el nombre de la categoría seleccionada
          changeName(category);
          // Establece categoryIsAdded a false, ocultando el componente de categoría
          categoryIsAdded.value = false;
      }
  }
  
  // Función para refrescar la lista de categorías
  function refreshCategories() {
      console.log("refreshed"); // Mensaje en consola para depuración
      categories.value = ShowCategoriesIncomes().value; // Actualiza las categorías llamando a la función
  }
  
  // Función que se llama al confirmar la selección
  function confirm() {
      emit("confirmed"); // Emite el evento "confirmed"
  }
  </script>
  