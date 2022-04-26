import React, { createContext, useContext, useState } from "react"

import { getAuth } from "firebase/auth"
import { getFirestore, collection, query, where, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"

import app from "./firebaseApp"

const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
	const auth = getAuth(app)
	const db = getFirestore(app)

	const [user, loading, error] = useAuthState(auth)

	const [todos, todosLoading, todosError] = useCollection(
		query(collection(db, "todos"), where("user_id", "==", user.uid)),
		null
	)

	const [selectedTodo, setSelectedTodo] = useState(null)

	const addTodo = async (values) => {
		try {
			const newTodo = { ...values, user_id: user.uid, completed: false }
			await addDoc(collection(db, "todos"), newTodo)
		} catch (error) {}
	}

	const toggleTodo = async (todo) => {
		try {
			await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed })
		} catch (error) {
			console.log(error)
		}
	}

	const editTodo = async (todo) => {
		try {
			setSelectedTodo(null)
			await updateDoc(doc(db, "todos", todo.id), { name: todo.name })
		} catch (error) {
			console.log(error)
		}
	}

	const deleteTodo = async (todo) => {
		try {
			await deleteDoc(doc(db, "todos", todo.id))
		} catch (error) {}
	}

	const value = {
		user,
		loading,
		error,
		todos,
		todosLoading,
		todosError,
		addTodo,
		toggleTodo,
		deleteTodo,
		editTodo,
		selectedTodo,
		setSelectedTodo,
	}

	return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

const useTodoContext = () => useContext(TodoContext)

export default useTodoContext

