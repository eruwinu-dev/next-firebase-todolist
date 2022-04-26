import React from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"

import useTodoContext from "../../context/TodoContext"

const editTodoSchema = Yup.object().shape({
	name: Yup.string()
		.required("Required")
		.test("test-space", "Please add something", (value) => value?.trim()),
})

const EditTodoForm = () => {
	const { editTodo, selectedTodo, setSelectedTodo } = useTodoContext()

	const editTodoInitialValues = {
		name: selectedTodo?.name,
	}

	if (!selectedTodo) return <div></div>

	return (
		<Formik
			validationSchema={editTodoSchema}
			initialValues={editTodoInitialValues}
			onSubmit={(values, { resetForm }) => {
				editTodo({ id: selectedTodo.id, ...values })
				resetForm()
			}}
		>
			{({ values, errors, touched }) => (
				<Form className="flex flex-row space-x-2 items-center justify-between">
					<div className="w-full flex-1 flex flex-col items-start justify-center space-y-2">
						<Field
							as="input"
							name="name"
							placeholder="New Todo"
							className={[touched.name && errors.name ? "form-error-input" : ""].join("")}
						/>
						{touched.name && errors.name ? <div className="form-error-text">{errors.name}</div> : null}
					</div>
					<div className="flex-0 space-x-2">
						<button type="submit" className="text-white bg-cyan-300 hover:bg-cyan-400">
							Save
						</button>
						<button
							type="button"
							className="text-white bg-gray-300 hover:bg-gray-400"
							onClick={() => setSelectedTodo(null)}
						>
							Cancel
						</button>
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default EditTodoForm

