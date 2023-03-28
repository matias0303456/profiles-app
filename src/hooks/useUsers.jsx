import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthProvider";
import { API_URL } from "../utils/config";

export function useUsers() {

    const { auth, setAuth } = useContext(AuthContext)

    const [users, setUsers] = useState([])

    async function getUsers() {
        const res = await fetch(API_URL + `/user/${auth?.user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth?.token
            }
        })
        const data = await res.json()
        setUsers(data)
    }

    async function handleFollow(followed) {
        if (!auth) return
        try {
            const res = await fetch(API_URL + `/follow/${auth?.user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': auth?.token
                },
                body: JSON.stringify({ followed })
            })
            const data = await res.json()
            setAuth({ ...auth, user: { ...auth.user, follows: [...auth.user.follows, data] } })
            setUsers([...users.filter(item => item.profile.id !== data.id)])
        } catch (err) {
            console.log(err)
        }
    }

    function handleUnfollow() {
        if (!auth) return

    }

    return { getUsers, users, handleFollow, handleUnfollow }

}