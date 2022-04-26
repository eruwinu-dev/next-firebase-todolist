import { useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"

import { TodoProvider } from "../context/TodoContext"

import useAuthContext from "../context/AuthContext"
import Link from "next/link"

import AddTodoForm from "../components/AddTodoForm"
import TodosList from "../components/TodosList"

const Dashboard = () => {
	const { user, loading, accountSignOut } = useAuthContext()
	const router = useRouter()

	useEffect(() => {
		if (!user) {
			router.push("/")
		}
	}, [user, router])

	if (loading || !user) return <div></div>

	return (
		<TodoProvider>
			<main>
				<Head>
					<title>Dashboard | Secure Todo List</title>
				</Head>
				<header className="text-neutral-50 border-b-2">
					<Link href="">
						<button type="button">Secure Todo List</button>
					</Link>
					<div className="header-side">
						<span className="font-semibold">{user.email}</span>
						<button type="button" className="signout-button" onClick={() => accountSignOut()}>
							Sign out
						</button>
					</div>
				</header>
				<section>
					<h1 className="text-neutral-50">Your Todos</h1>
					<div className="dashboard-panel">
						<AddTodoForm />
					</div>
					<div className="dashboard-panel bg-transparent px-0">
						<TodosList />
					</div>
				</section>
			</main>
		</TodoProvider>
	)
}

export default Dashboard

