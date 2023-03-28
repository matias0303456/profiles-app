import { useContext, useEffect } from "react"
import { useParams } from "react-router"

import { useUsers } from "../hooks/useUsers"
import { UsersList } from '../components/UsersList'
import { AuthContext } from "../context/AuthProvider"

export function Profile() {

    const { auth } = useContext(AuthContext)

    const params = useParams()

    const { getUsers, users, handleUnfollow, handleDeleteFollow } = useUsers()

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>
            <h2 className="text-3xl text-center mb-6">
                {parseInt(params.id) === parseInt(auth.user.id) ?
                    'My profile' :
                    `${users.find(item => parseInt(item.id) === parseInt(params.id))?.username}'s profile`
                }
            </h2>
            <div className="flex gap-5">
                <div>
                    <h3>Followers</h3>
                    <UsersList
                        users={users.filter(user => auth.user.profile.follows.map(follow => follow.follower.id).includes(user.id))}
                        handleDeleteFollow={handleDeleteFollow}
                        followText="Delete"
                    />
                </div>
                <div>
                    <h3>Following</h3>
                    <UsersList
                        users={users.filter(user => auth.user.follows.map(follow => follow.followed.id).includes(user.profile.id))}
                        handleUnfollow={handleUnfollow}
                        followText="Unfollow"
                    />
                </div>
            </div>
        </>
    )
}