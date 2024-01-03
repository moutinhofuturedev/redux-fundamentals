import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { add } from '../store'

export const AddTodo = () => {
  const [newTodo, setNewTodo] = useState<string>('')
  const dispatch = useDispatch()

  const handleNewTodo = (event: FormEvent) => {
    event.preventDefault()

    dispatch(
      add({
        newTodo,
      }),
    )

    setNewTodo('')
  }

  return (
    <form onSubmit={handleNewTodo}>
      <input
        type="text"
        placeholder="Novo to-do"
        onChange={(event) => setNewTodo(event.target.value)}
        value={newTodo}
      />
      <button type="submit">Adicionar</button>
    </form>
  )
}
