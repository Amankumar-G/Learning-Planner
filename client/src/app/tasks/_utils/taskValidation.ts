export interface TaskFormValues {
  title: string
  description: string
}

export function validateTaskForm(values: TaskFormValues): string | null {
  const title = values.title.trim()
  const description = values.description.trim()

  if (!title) {
    return "Title is required"
  }

  if (title.length > 120) {
    return "Title must be 120 characters or fewer"
  }

  if (description.length > 500) {
    return "Description must be 500 characters or fewer"
  }

  return null
}

export function normalizeTaskForm(values: TaskFormValues): TaskFormValues {
  return {
    title: values.title.trim(),
    description: values.description.trim(),
  }
}
