<script setup lang="ts">
import { TITLES } from '~/utils/constants';
import type Locale from '~/types/locale';
import type { DefineComponent } from 'vue';

const currentLocale = ref<Locale>('en');
const breadCrumbs = ref<DefineComponent | null>(null);

const title = computed(() => TITLES[currentLocale.value as keyof typeof TITLES]);

useHead({
  title,
  htmlAttrs: {
    lang: currentLocale
  }
});
</script>

<template>
  <main class="mx-auto w-5/6 flex gap-y-5 flex-col">
    <h1 class="text-center text-[#100302] text-2xl">{{ title }}</h1>
    <LangSelect v-model="currentLocale" />
    <div class="flex gap-x-10 justify-between">
      <BreadCrumbs ref="breadCrumbs" :locale="currentLocale" :title="title" />
      <CatalogLink :link="breadCrumbs?.link.text" :locale="currentLocale" />
    </div>
  </main>
</template>

<style scoped></style>
