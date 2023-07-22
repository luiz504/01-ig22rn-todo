import { FC, useMemo } from 'react'
import { Dimensions } from 'react-native'

import { TaskCardBig } from './TaskCardBig'
import { TaskCardSmall } from './TaskCardSmall'

import { TaskCardBaseProps } from './types'
import { useTasksContext } from '@/context/tasksContext'

export const TaskCard: FC<TaskCardBaseProps> = (props) => {
  const minWidth768 = useMemo(() => {
    return Dimensions.get('window').width >= 768
  }, [])

  const handleDeleteTask = useTasksContext().handleDeleteTask
  const handleUpdateTaskStatus = useTasksContext().handleUpdateTaskStatus

  return minWidth768 ? (
    <TaskCardBig
      {...props}
      onClickCheck={handleUpdateTaskStatus}
      onClickDelete={handleDeleteTask}
    />
  ) : (
    <TaskCardSmall
      {...props}
      onClickCheck={handleUpdateTaskStatus}
      onClickDelete={handleDeleteTask}
    />
  )
}
