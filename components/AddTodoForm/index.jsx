import React from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"

import useTodoContext from "../../context/TodoContext"

const addTodoSchema = Yup.object().shape({
	name: Yup.string()
		.required("Required")
		.test("test-space", "Please add something", (value) => value?.trim()),
})

const addTodoInitialValues = {
	name: "",
}

const AddTodoForm = () => {
	const { addTodo } = useTodoContext()
	return (
		<Formik
			validationSchema={addTodoSchema}
			initialValues={addTodoInitialValues}
			onSubmit={(values, { resetForm }) => {
				addTodo(values)
				resetForm()
			}}
		>
			{({ values, errors, touched }) => (
				<Form className="flex flex-row space-x-2 items-start justify-between">
					<div className="w-full flex-1 flex flex-col items-start justify-center space-y-2">
						<Field
							as="input"
							name="name"
							placeholder="New Todo"
							className={[touched.name && errors.name ? "form-error-input" : ""].join("")}
						/>
						{touched.name && errors.name ? <div className="form-error-text">{errors.name}</div> : null}
					</div>
					<button type="submit" className="text-white bg-blue-300 hover:bg-blue-400">
						Add
					</button>
				</Form>
			)}
		</Formik>
	)
}

export default AddTodoForm

