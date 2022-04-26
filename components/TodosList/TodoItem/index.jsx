import React from "react"

import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im"

import useTodoContext from "../../../context/TodoContext"
import EditTodoForm from "../../EditTodoForm"

const TodoItem = ({ todo }) => {
	const { toggleTodo, deleteTodo, selectedTodo, setSelectedTodo } = useTodoContext()
	return (
		<div className="todo-item">
			{todo.id === selectedTodo?.id ? (
				<EditTodoForm />
			) : (
				<>
					<div className="flex-none">
						<button type="button" onClick={() => toggleTodo(todo)}>
							{todo.completed ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
						</button>
					</div>
					<div className="flex-1">
						<span className={["font-semibold", todo.completed ? "line-through" : ""].join(" ")}>
							{todo.name}
						</span>
					</div>
					<div className="flex-none space-x-2">
						<button
							type="button"
							className="text-white bg-teal-300 hover:bg-teal-400"
							onClick={() => setSelectedTodo(todo)}
						>
							Edit
						</button>
						<button
							type="button"
							className="text-white bg-red-300 hover:bg-red-400"
							onClick={() => deleteTodo(todo)}
						>
							Delete
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default TodoItem

