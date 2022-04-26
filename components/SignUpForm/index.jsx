import React from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"

import useAuthContext from "../../context/AuthContext"

const signUpSchema = Yup.object().shape({
	email: Yup.string().required("Required").email("Must be a valid email address"),
	password: Yup.string().required("Required").min(6, "Must be at least 6 characters"),
	confirm_password: Yup.string()
		.required("Required")
		.min(6, "Must be at least 6 characters")
		.oneOf([Yup.ref("password"), null], "Passwords must match"),
})

const signUpInitialValues = {
	email: "",
	password: "",
	confirm_password: "",
}

const SignUpForm = () => {
	const { emailSignUp } = useAuthContext()

	const emailSignupHandler = (values) => {
		emailSignUp({ email: values.email, password: values.password })
	}

	return (
		<div className="signup-panel">
			<h3>Sign Up</h3>
			<Formik validationSchema={signUpSchema} initialValues={signUpInitialValues} onSubmit={emailSignupHandler}>
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
						<label className="form-label" htmlFor="confirm_password">
							Confirm Password
						</label>
						<Field
							as="input"
							type="password"
							autoComplete="off"
							className={errors.confirm_password && touched.confirm_password ? "form-error-input" : ""}
							name="confirm_password"
							placeholder="Confirm Password"
						/>
						{errors.confirm_password && touched.confirm_password ? (
							<div className="form-error-text">{errors.confirm_password}</div>
						) : null}
						<button type="submit" className="email-signup-button">
							Sign Up
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default SignUpForm

