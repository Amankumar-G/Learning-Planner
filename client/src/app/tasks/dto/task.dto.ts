export interface Task {
  id: number
  title: string
  description: string | null
  completed: boolean
  createdAt: string
  updatedAt: string
  userId: number
}

export interface TasksResponse {
  data: Task[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}
