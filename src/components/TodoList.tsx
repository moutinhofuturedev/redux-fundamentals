import { useAppSelector } from '../store'

export const TodoList = () => {
  const todoStore = useAppSelector((store) => {
    return store.todo
  })

  return (
    <ul>
      {todoStore.map((todo) => (
        <li key={todo}>{todo}</li>
      ))}
    </ul>
  )
}
