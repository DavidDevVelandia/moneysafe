<template>
  <!-- Barra de navegación principal -->
  <nav class="nav">
      <!-- Enlace para navegar a la ruta 'simple-interest' (Interés Simple) -->
      <router-link :to="{name: 'simple-interest'}" class="router">Simple</router-link>

      <!-- Enlace para navegar a la ruta 'compound-interest' (Interés Compuesto) -->
      <router-link :to="{name: 'compound-interest'}" class="router">Compuesto</router-link>
  </nav>

  <!-- Aquí se insertará dinámicamente el contenido de los componentes correspondientes según la ruta activa -->
  <router-view/>
</template>

<style lang="scss" scoped>
@import './../scss/colors';  /* Importar archivo de colores, facilitando la reutilización y consistencia en los estilos */

/* Estilo del contenedor de la barra de navegación */
.nav {
  margin-top: 8rem;  /* Margen superior grande para darle espacio visual al contenido superior */
  display: flex;  /* Usa flexbox para organizar los elementos */
  width: 100%;  /* Ocupa todo el ancho disponible */
  justify-content: space-around;  /* Los enlaces se distribuyen equitativamente a lo largo del contenedor */
}

/* Estilo de los enlaces de navegación */
.router {
  display: flex;  /* Usa flexbox para alinear el contenido del enlace */
  justify-content: center;  /* Centra el texto horizontalmente */
  align-items: center;  /* Centra el texto verticalmente */
  border-radius: 40px;  /* Bordes redondeados para darle un aspecto moderno */
  width: 10rem;  /* Fija el ancho del enlace */
  height: 3rem;  /* Fija la altura del enlace */
  background-color: $md-theme-light-primary;  /* Usar color primario definido en el archivo SCSS importado */
  color: $md-theme-light-on-primary;  /* Color del texto basado en el esquema de colores */
  text-decoration: none;  /* Eliminar el subrayado predeterminado de los enlaces */
  font-size: 2.4vh;  /* Tamaño de fuente basado en la altura de la ventana (responsivo) */
}

/* Estilo aplicado cuando el usuario pasa el cursor sobre un enlace */
.router:hover {
  background-color: #6154db;  /* Cambia el color de fondo a un tono más oscuro de azul al hacer hover */
}

/* Estilo aplicado cuando el usuario hace clic en un enlace */
.router:active {
  background-color: #8076d8;  /* Cambia el color de fondo a un tono aún más oscuro mientras se mantiene presionado */
}
</style>

<script setup>
/* No hay lógica JavaScript adicional en este componente, ya que solo actúa como un contenedor visual y enrutador para mostrar vistas basadas en la ruta seleccionada */
</script>
