<script lang="ts" setup>
const treeObject = await useTaskFile();

const catalogTreeState = useCatalogTree();

if (treeObject) {
  catalogTreeState.value = treeObject;
}
</script>

<template>
  <div class="pt-10 font-sans">
    <NuxtPage />
  </div>
</template>
