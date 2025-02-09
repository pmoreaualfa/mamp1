<template>
  <div class="login-form">
    <UCard class="w-full max-w-md mx-auto p-4 bg-gray-50 dark:bg-gray-800">
      <UForm :state="formState" @submit="onSubmit" class="flex flex-col gap-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Connexion</h2>

        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Adresse email *
          </label>
          <UInput
            v-model="formState.email"
            type="email"
            placeholder="votre@email.com"
            required
            class="border-gray-300 dark:border-gray-600"
          />
        </div>

        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Mot de passe *
          </label>
          <UInput
            v-model="formState.password"
            type="password"
            placeholder="Votre mot de passe"
            required
            class="border-gray-300 dark:border-gray-600"
          />
        </div>

        <UButton
          type="submit"
          color="primary"
          variant="solid"
          block
          :loading="loading"
          class="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Se connecter
        </UButton>

        <UAlert
          v-if="error"
          class="mt-4"
          color="red"
          variant="solid"
          icon="i-heroicons-exclamation-circle"
        >
          {{ error }}
        </UAlert>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const formState = ref({
  email: '',
  password: '',
});

const loading = ref(false);
const error = ref('');

async function onSubmit() {
  try {
    loading.value = true;
    error.value = '';

    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: formState.value,
    });

    if (response.success) {
      // Redirection après connexion réussie
      navigateTo('/dashboard');
    } else {
      error.value = 'Identifiants incorrects';
    }
  } catch (e) {
    error.value = 'Une erreur est survenue lors de la connexion';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login-form {
  padding: 2rem;
  max-width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
}
</style>
