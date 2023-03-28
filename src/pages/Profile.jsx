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

    const profileUser = users.find(item => parseInt(item.id) === parseInt(params.id)) || auth.user

    if (!profileUser) return <h3>Loading...</h3>

    return (
        <>
            <h2 className="text-3xl text-center mb-6">
                {parseInt(params.id) === parseInt(auth.user.id) ?
                    'My profile' :
                    `${profileUser.username}'s profile`
                }
            </h2>
            <div>
                <h3>User data</h3>
                <img src={profileUser.profile.avatar} alt="" />
                <h4>Email</h4>
                <p>{profileUser.email}</p>
                <h4>Bio</h4>
                <p>{profileUser.profile.bio}</p>
            </div>
            <div className="flex gap-5">
                <div>
                    <h3>Followers</h3>
                    <UsersList
                        users={users.filter(user => profileUser.profile.follows.map(follow => follow.follower.id).includes(user.id))}
                        handleDeleteFollow={handleDeleteFollow}
                        followText="Delete"
                    />
                </div>
                <div>
                    <h3>Following</h3>
                    <UsersList
                        users={users.filter(user => profileUser.follows.map(follow => follow.followed.id).includes(user.profile.id))}
                        handleUnfollow={handleUnfollow}
                        followText="Unfollow"
                    />
                </div>
            </div>
        </>
    )
}