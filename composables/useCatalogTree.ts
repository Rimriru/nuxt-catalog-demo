import type { TaskObject } from '~/types/task-object';

export const useCatalogTree = () => useState<TaskObject | null>('tree', () => null);

export const useTaskFile = async () => {
  try {
    const file = await $fetch('/api/task');
    return file;
  } catch (error) {
    console.error(error);
  }
};
