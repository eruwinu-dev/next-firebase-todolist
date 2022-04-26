import { useState, useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"

import { FcGoogle } from "react-icons/fc"

import useAuthContext from "../context/AuthContext"
import SignInForm from "../components/SignInForm"
import SignUpForm from "../components/SignUpForm"
import Image from "next/image"

const AuthPage = () => {
	const { user, loading, googleSignIn } = useAuthContext()
	const [toggleForm, setToggleForm] = useState("signIn")
	const router = useRouter()

	useEffect(() => {
		if (user) {
			router.push("dashboard")
		}
	}, [user])

	if (loading || user) return <div></div>

	return (
		<main>
			<Head>
				<title>Next Firebase Template</title>
			</Head>
			<section className="space-y-2">
				<Image alt="nextjs" src="/vercel.svg" width={200} height={100} priority="high" />
				<h1>Next Firebase Template</h1>
				<div className="auth-panel">
					{toggleForm === "signIn" ? (
						<div className="w-full">
							<SignInForm />
							<div className="w-full space-y-2">
								<span className="text-gray-800">Don't have an account?</span>
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

