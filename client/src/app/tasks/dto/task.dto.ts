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
  total: number
  page: number
  limit: number
}
