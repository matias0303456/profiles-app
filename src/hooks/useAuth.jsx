import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthProvider";

import { API_URL } from '../utils/config'

export function useAuth() {

    const { auth, setAuth } = useContext(AuthContext)

    const navigate = useNavigate()

    async function handleSignup(user) {
        try {
            const res = await fetch(API_URL + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            await res.json()
            navigate('/profiles-app/')
        } catch (err) {
            console.log(err)
        }
    }

    async function login(user) {
        try {
            const res = await fetch(API_URL + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            const data = await res.json()
            setAuth(data)
            localStorage.setItem('auth', JSON.stringify(data))
        } catch (err) {
            console.log(err)
        }
    }

    return { auth, handleSignup, login }

}