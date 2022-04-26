import { useState, useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"

import { FcGoogle } from "react-icons/fc"

import useAuthContext from "../context/AuthContext"
import SignInForm from "../components/SignInForm"
import SignUpForm from "../components/SignUpForm"

const AuthPage = () => {
	const { user, loading, googleSignIn } = useAuthContext()
	const [toggleForm, setToggleForm] = useState("signIn")
	const router = useRouter()

	useEffect(() => {
		if (user) {
			router.push("dashboard")
		}
	}, [user, router])

	if (loading || user) return <div></div>

	return (
		<main>
			<Head>
				<title>Secure Todo List</title>
			</Head>
			<section>
				<h1 className="text-neutral-50">Secure Todo List App</h1>
				<div className="auth-panel">
					{toggleForm === "signIn" ? (
						<div className="w-full">
							<SignInForm />
							<div className="w-full space-y-2">
								<span className="text-gray-800">New here?</span>
								<button
									type="button"
									className="text-blue-500 hover:text-blue-600 font-semibold"
									onClick={() => setToggleForm("signUp")}
								>
									Sign Up
								</button>
							</div>
						</div>
					) : (
						<div className="w-full">
							<SignUpForm />
							<div className="w-full space-y-2">
								<span className="text-gray-800">Been here before?</span>
								<button
									type="button"
									className="text-blue-500 hover:text-blue-600 font-semibold"
									onClick={() => setToggleForm("signIn")}
								>
									Sign In
								</button>
							</div>
						</div>
					)}
					<div className="w-full flex flex-col items-center justify-center space-y-2">
						<span className="w-full text-gray-800 border-t-2 text-center pt-2">or connect with</span>
						<button type="button" className="google-signin-button" onClick={() => googleSignIn()}>
							<FcGoogle className="text-3xl" />
						</button>
					</div>
				</div>
			</section>
		</main>
	)
}

export default AuthPage

