import { useContext } from "react";

import { AuthContext } from "../context/AuthProvider";

import { API_URL } from '../utils/config'

export function useAuth() {

    const { auth, setAuth } = useContext(AuthContext)

    async function register(user) {
        try {
            const res = await fetch(API_URL + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            const data = await res.json()
            return data
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

    return { auth, register, login }

}