import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthProvider";
import { API_URL } from "../utils/config";

export function useUsers() {

    const { auth } = useContext(AuthContext)

    const [users, setUsers] = useState([])

    useEffect(() => {
        (async () => {
            const res = await fetch(API_URL + `/user/${auth.user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': auth.token
                }
            })
            const data = await res.json()
            setUsers(data)
        })()
    }, [])

    return { users }

}