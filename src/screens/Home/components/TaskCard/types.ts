interface Task {
  id: string
  description: string
  done: boolean
}

export interface TaskCardBaseProps {
  task: Task
  testID?: string
}
export interface TaskCardProps extends TaskCardBaseProps {
  onClickDelete?: (id: string) => void
  onClickCheck?: (id: string, value: boolean) => void
}
