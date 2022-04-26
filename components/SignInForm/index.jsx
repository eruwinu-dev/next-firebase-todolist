import React from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"

import useAuthContext from "../../context/AuthContext"

const signInSchema = Yup.object().shape({
	email: Yup.string().required("Required").email("Must be a valid email address"),
	password: Yup.string().required("Required").min(6, "Must be at least 6 characters"),
})

const signInInitialValues = {
	email: "",
	password: "",
}

const SignInForm = () => {
	const { emailSignIn } = useAuthContext()

	const emailSignInHandler = (values) => {
		emailSignIn(values)
	}

	return (
		<div className="signin-panel">
			<h3>Sign In</h3>
			<Formik validationSchema={signInSchema} initialValues={signInInitialValues} onSubmit={emailSignInHandler}>
				{({ values, errors, touched }) => (
					<Form>
						<label className="form-label" htmlFor="email">
							Email
						</label>
						<Field
							as="input"
							className={errors.email && touched.email ? "form-error-input" : ""}
							name="email"
							placeholder="Email"
						/>
						{errors.email && touched.email ? <div className="form-error-text">{errors.email}</div> : null}
						<label className="form-label" htmlFor="password">
							Password
						</label>
						<Field
							as="input"
							type="password"
							autoComplete="off"
							className={errors.password && touched.password ? "form-error-input" : ""}
							name="password"
							placeholder="Password"
						/>
						{errors.password && touched.password ? (
							<div className="form-error-text">{errors.password}</div>
						) : null}
						<button type="submit" className="email-signin-button">
							Sign In
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default SignInForm

