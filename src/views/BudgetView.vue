<template>
  <!-- Barra de navegación principal -->
  <nav class="nav">
      <!-- Enlace para navegar a la ruta 'expenses' (Gastos) -->
      <router-link :to="{name: 'expenses'}" class="router">Gastos</router-link>

      <!-- Enlace para navegar a la ruta 'incomes' (Ingresos) -->
      <router-link :to="{name: 'incomes'}" class="router">Ingresos</router-link>
  </nav>
  
  <!-- Aquí se insertará dinámicamente el contenido de los componentes correspondientes según la ruta activa -->
  <router-view/>
</template>

<style lang="scss" scoped>
@import './../scss/colors';  /* Importar el archivo de colores para utilizar variables de color en el estilo */

/* Estilo para la barra de navegación */
.nav {
  margin-top: 8rem;  /* Margen superior para separar la barra de navegación del contenido superior */
  display: flex;  /* Utiliza flexbox para alinear los elementos dentro de la barra de navegación */
  width: 100%;  /* La barra de navegación ocupará todo el ancho disponible */
  justify-content: space-around;  /* Distribuye los enlaces equitativamente a lo largo de la barra */
}

/* Estilo de los enlaces de navegación */
.router {
  display: flex;  /* Utiliza flexbox para centrar el contenido del enlace */
  justify-content: center;  /* Centra horizontalmente el texto dentro del enlace */
  align-items: center;  /* Centra verticalmente el texto dentro del enlace */
  border-radius: 40px;  /* Bordes redondeados para un diseño más suave y moderno */
  width: 10rem;  /* Ancho fijo para los enlaces */
  height: 3rem;  /* Altura fija para los enlaces */
  background-color: $md-theme-light-primary;  /* Color de fondo utilizando la variable del tema ligero */
  color: $md-theme-light-on-primary;  /* Color del texto que contrasta con el fondo */
  text-decoration: none;  /* Elimina el subrayado que se aplica por defecto a los enlaces */
  font-size: 2.4vh;  /* Tamaño de fuente basado en el tamaño de la ventana (altura de la ventana) para adaptarse responsivamente */
}

/* Estilo aplicado al pasar el cursor sobre el enlace */
.router:hover {
  background-color: #5e51d4;  /* Cambia el color de fondo a un tono más oscuro al hacer hover */
}

/* Estilo aplicado al hacer clic en el enlace */
.router:active {
  background-color: #8076d8;  /* Cambia el color de fondo a un tono más oscuro mientras se mantiene presionado */
}
</style>

<script setup>
/* Este script no contiene lógica adicional; actúa simplemente como un contenedor visual para las rutas de gastos e ingresos */
</script>
