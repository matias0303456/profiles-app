import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
            const data = await res.json()
            if (data.message !== "Successful register.") return toast.error('Email already exists.')
            toast.success(data.message)
            navigate('/profiles/')
        } catch (err) {
            toast.error(err.message)
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
            if (data.message === "Invalid user or password.") return toast.error(data.message)
            setAuth(data)
            navigate('/profiles/')
        } catch (err) {
            toast.error(err.message)
        }
    }

    function handleLogout() {
        localStorage.clear()
        setAuth(null)
        navigate('/profiles/')
    }

    return { handleSignup, login, handleLogout }

}