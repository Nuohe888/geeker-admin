<template>
  <div class="login-container flx-center">
    <SwitchDark class="dark" />
    <div class="login-form">
      <div class="login-logo">
        <h2 class="logo-text">Geeker-Admin</h2>
      </div>
      <LoginForm />
    </div>
  </div>
</template>

<script setup lang="ts" name="login">
import LoginForm from "./components/LoginForm.vue";
import SwitchDark from "@/components/SwitchDark/index.vue";
</script>

<style scoped lang="scss">
@use "./index";
</style>
