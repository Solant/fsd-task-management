import * as v from 'valibot';

export const ProjectSchema = v.object({
  projectId: v.pipe(v.string(), v.uuid()),
  title: v.pipe(v.string(), v.minLength(3), v.maxLength(20)),
});
export type Project = v.InferOutput<typeof ProjectSchema>;

export const ProjectInputSchema = v.omit(ProjectSchema, ['projectId']);
export type ProjectInput = v.InferInput<typeof ProjectInputSchema>;
