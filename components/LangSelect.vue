<script lang="ts" setup>
const localeModel = defineModel();
</script>

<template>
  <select v-model="localeModel">
    <option value="en" selected>English</option>
    <option value="ru">Русский</option>
  </select>
</template>

<style>

</style>