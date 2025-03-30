import * as v from 'valibot';

export const TaskSchema = v.object({
  taskId: v.pipe(v.string(), v.uuid()),
  projectId: v.pipe(v.string(), v.uuid()),
  title: v.string(),
  description: v.optional(v.string(), ''),
  priority: v.optional(v.picklist(['low', 'medium', 'high']), 'low'),
  status: v.optional(v.picklist(['pending', 'in-progress', 'done']), 'pending'),
});
export type Task = v.InferOutput<typeof TaskSchema>;

export const TaskInputSchema = v.omit(TaskSchema, ['taskId']);
export type TaskInput = v.InferOutput<typeof TaskInputSchema>;
