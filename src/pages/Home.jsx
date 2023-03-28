import { useContext, useEffect } from "react"

import { useUsers } from "../hooks/useUsers"
import { UsersList } from '../components/UsersList'
import { AuthContext } from "../context/AuthProvider"

export function Home() {

    const { auth } = useContext(AuthContext)

    const { getUsers, users, handleFollow, handleUnfollow } = useUsers()

    useEffect(() => {
        getUsers()
    }, [])

    if (!auth) return <h2 className="text-3xl text-center mb-6">Sign In to follow users!</h2>

    return (
        <>
            <h2 className="text-3xl text-center mb-6">Users you can follow!</h2>
            <UsersList
                users={users.filter(user => !auth.user.follows.map(follow => follow.followed.id).includes(user.profile.id))}
                handleFollow={handleFollow}
                handleUnfollow={handleUnfollow}
            />
        </>
    )
}