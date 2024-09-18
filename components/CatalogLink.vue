<script lang="ts" setup>
import { LINK_HEADINGS } from '~/utils/constants';
import type Locale from '~/types/locale';
defineProps<{
  link?: string;
  locale: Locale;
}>();
</script>

<template>
  <p>
    {{ LINK_HEADINGS[locale] }}:
    <span class="text-sky-600">{{ link }}</span>
  </p>
</template>

<style></style>
