import React from "react"

import useTodoContext from "../../context/TodoContext"
import TodoItem from "./TodoItem"

const TodosList = () => {
	const { todos, todosLoading } = useTodoContext()

	if (todosLoading) return <div></div>

	return (
		<div
			className={["todos-list box-bordermin-h-96 max-h-96 overflow-y-auto", todos.docs.lengt ? "pt-8" : ""].join(
				" "
			)}
		>
			{todos.docs.length ? (
				todos.docs.map((todo, index) => <TodoItem key={index} todo={{ ...todo.data(), id: todo.id }} />)
			) : (
				<h4>No todos.</h4>
			)}
		</div>
	)
}

export default TodosList

