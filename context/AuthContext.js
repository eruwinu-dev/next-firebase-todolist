import React, { createContext, useContext } from "react"

import {
	getAuth,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signOut,
} from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"

import app from "./firebaseApp"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const auth = getAuth(app)

	const [user, loading, error] = useAuthState(auth)

	const googleSignIn = async () => {
		try {
			const googleProvider = new GoogleAuthProvider()
			await signInWithPopup(auth, googleProvider)
		} catch (error) {}
	}

	const emailSignIn = async ({ email, password }) => {
		try {
			await signInWithEmailAndPassword(auth, email, password)
		} catch (error) {}
	}

	const emailSignUp = async ({ email, password }) => {
		try {
			await createUserWithEmailAndPassword(auth, email, password)
		} catch (error) {}
	}

	const accountSignOut = async () => {
		try {
			await signOut(auth)
		} catch (error) {}
	}

	const value = { user, loading, error, googleSignIn, emailSignIn, emailSignUp, accountSignOut }
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => useContext(AuthContext)

export default useAuthContext

