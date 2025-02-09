<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/">Accueil</NuxtLink>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <p>&copy; 2024 Mon Application Nuxt</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Le script setup peut rester vide pour l'instant
</script>

<style scoped>
header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

nav {
  display: flex;
  gap: 1rem;
}

main {
  padding: 2rem;
  min-height: calc(100vh - 160px);
}

footer {
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #eee;
}
</style>
