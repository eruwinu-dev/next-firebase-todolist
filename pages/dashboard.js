import { useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import Image from "next/image"

import useAuthContext from "../context/AuthContext"

const Dashboard = () => {
	const { user, loading, accountSignOut } = useAuthContext()
	const router = useRouter()

	useEffect(() => {
		if (!user) {
			router.push("/")
		}
	}, [user])

	if (loading || !user) return <div></div>

	return (
		<main>
			<Head>
				<title>Dashboard | Next Firebase Template</title>
			</Head>
			<section className="space-y-2">
				<Image alt="nextjs" src="/vercel.svg" width={200} height={100} priority="high" />
				<h1>Next Firebase Template</h1>
				<div className="dashboard-panel">
					{user.email}
					<button type="button" className="signout-button" onClick={() => accountSignOut()}>
						Sign out
					</button>
				</div>
			</section>
		</main>
	)
}

export default Dashboard

