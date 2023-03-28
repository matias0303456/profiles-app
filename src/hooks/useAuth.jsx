import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthProvider";

import { API_URL } from '../utils/config'

export function useAuth() {

    const { auth, setAuth } = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth))
    }, [auth])

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
            navigate('/profiles-app/')
        } catch (err) {
            console.log(err)
        }
    }

    function handleLogout() {
        localStorage.clear()
        setAuth(null)
        navigate('/profiles-app/')
    }

    return { handleSignup, login, handleLogout }

}