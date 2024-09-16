<script setup lang="ts">
import TITLES from '~/utils/constants';
import type Locale from '~/types/locale';

const currentLocale = ref<Locale>('en');

const title = computed(() => TITLES[currentLocale.value as keyof typeof TITLES]);

useHead({
  title,
  htmlAttrs: {
    lang: currentLocale
  }
});
</script>

<template>
  <div>
    <BreadCrumbs :locale="currentLocale" :title="title" />
    <LangSelect v-model="currentLocale" />
    <TreeLink />
  </div>
</template>

<style scoped></style>
