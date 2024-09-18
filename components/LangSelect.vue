<script lang="ts" setup>
const localeModel = defineModel();
</script>

<template>
  <select class="mx-auto py-2 px-3 rounded-md bg-orange-200" v-model="localeModel">
    <option value="en" selected>English</option>
    <option value="ru">Русский</option>
  </select>
</template>

<style></style>
