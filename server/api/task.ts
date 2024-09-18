import path from 'node:path';
import fs from 'node:fs';
import type { TaskObject } from '~/types/task-object';

export default defineEventHandler(async (event) => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'task.json');
    const file = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(file) as TaskObject;
  } catch (error: any) {
    throw createError({
      status: error.status,
      statusText: error.message
    });
  }
});
