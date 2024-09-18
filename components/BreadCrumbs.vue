<script setup lang="ts">
import type { ProductLocale, Level, CategoryType } from '~/types/task-object';
import type Locale from '~/types/locale';

const catalogTreeState = useCatalogTree();
const products = ref<Level[] | null>(null);
const currentChild = ref({
  id: 0,
  locale: {}
});
const link = ref({
  elementId: 0,
  text: ''
});

const props = defineProps<{
  locale: Locale;
  title: string;
}>();
defineExpose({ link });

const treeData = computed(() => {
  const tree = catalogTreeState.value?.page_data.tree[0];
  const categoryData: CategoryType = {
    id: 0,
    childs: [],
    locale: {},
    depth: 0,
    parent: {
      id: 0,
      locale: {},
      depth: 0
    }
  };

  if (tree) {
    const { id, childs, locale, depth, path_to_top } = tree;
    categoryData.id = id;
    categoryData.childs = childs;
    categoryData.locale = locale;
    categoryData.depth = depth;
    categoryData.parent = path_to_top
      ? path_to_top[1]
      : {
          id: 0,
          locale: {},
          depth: 0
        };
  }

  const categoryParentData = categoryData.parent || {};

  if (categoryData.childs) {
    products.value = categoryData.childs;
    currentChild.value = products.value[0];
  }

  return {
    ...categoryData,
    categoryParentId: categoryParentData.id,
    categoryParentLocale: categoryParentData.locale,
    categoryParentDepth: categoryParentData.depth
  };
});

const getLocaleData = (localeObject: ProductLocale) => {
  const locale = Object.keys(localeObject[props.locale]).length
    ? localeObject[props.locale]
    : localeObject[props.locale === 'en' ? 'ru' : 'en'];
  const name = locale.cg_name;
  const slug = locale.cg_slug;
  return { name, slug };
};

const categoryParent = computed(() => {
  const tree = treeData.value;
  const { name, slug } = getLocaleData(tree.categoryParentLocale);
  const linkText = `${tree.categoryParentDepth}_${slug}`;

  const id = tree.categoryParentId;

  return { id, name, slug, linkText };
});

const category = computed(() => {
  const tree = treeData.value;
  const { name, slug } = getLocaleData(tree.locale as ProductLocale);
  const linkText = `${categoryParent.value.slug}/${tree.depth}_${slug}`;

  const id = tree.id!;

  return { id, name, slug, linkText };
});

const child = computed(() => {
  const item = currentChild.value;

  const { name, slug } = getLocaleData(item.locale);
  const linkText = `${categoryParent.value.slug}/${category.value.slug}/${item.id}_${slug}`;

  const id = item.id;

  return { id, name, linkText };
});

const breadCrumbs = computed(() => {
  return [categoryParent.value, category.value, child.value];
});

watch(
  () => props.locale,
  () => {
    const id = link.value.elementId;
    const breadCrumbsElement = breadCrumbs.value.find((el) => el.id === id);
    if (breadCrumbsElement) link.value.text = breadCrumbsElement.linkText;
  }
);

watch(currentChild, () => {
  link.value = {
    elementId: child.value.id,
    text: child.value.linkText
  };
});

const changeLink = (id: number, linkText: string) => {
  link.value = {
    elementId: id,
    text: linkText
  };
};

const onBreadCrumbsElementClick = (id: number, linkText: string) => {
  changeLink(id, linkText);
};

const onProductsElementClick = (product: Level) => {
  currentChild.value = { ...product };
};
</script>

<template>
  <section>
    <nav class="mb-4">
      <ul>
        <li
          v-for="({ id, linkText, name }, index) of breadCrumbs"
          :key="id"
          @click="onBreadCrumbsElementClick(id, linkText)"
          class="hover:underline hover:opacity-70 cursor-pointer"
        >
          <p v-if="link.elementId !== category.id || index !== 2">
            {{ name }}
            <span v-if="index < breadCrumbs.length - 1">&rarr;</span>
          </p>
        </li>
      </ul>
    </nav>
    <ul v-show="link.elementId === category.id" class="pl-4">
      <p class="text-lg text-neutral-500">Товары в данной категории:</p>
      <li
        v-for="product of products"
        @click="onProductsElementClick(product)"
        class="hover:underline hover:opacity-70 cursor-pointer pl-4"
      >
        {{ getLocaleData(product.locale).name }}
      </li>
    </ul>
  </section>
</template>

<style scoped></style>
