import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

import { useUsers } from "../hooks/useUsers"
import { UsersList } from '../components/UsersList'
import { AuthContext } from "../context/AuthProvider"
import { Alert } from '../components/Alert'

export function Profile() {

    const { auth } = useContext(AuthContext)

    const params = useParams()
    const navigate = useNavigate()

    const { getUsers, users, deleteUser, handleUnfollow, handleDeleteFollow } = useUsers()

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
            <div className="flex flex-col gap-10 items-center lg:flex-row lg:gap-5 lg:justify-start lg:items-start">
                <div className="text-center w-2/6">
                    <h3 className="text-2xl mb-5 flex gap-3 justify-center items-center">
                        User data
                        {parseInt(params.id) === parseInt(auth.user.id) &&
                            <>
                                <AiFillEdit
                                    className="hover:text-slate-400 hover:cursor-pointer"
                                    onClick={() => navigate(`/profiles-app/update-user/${auth.user.id}`)}
                                />
                                <AiFillDelete
                                    className="hover:text-slate-400 hover:cursor-pointer"
                                    onClick={() => {
                                        Alert.fire({
                                            title: <p>Delete account and all information?</p>,
                                            showConfirmButton: true,
                                            confirmButtonText: 'Confirm',
                                            confirmButtonColor: '#1E293B',
                                            showCancelButton: true
                                        }).then(res => {
                                            if (res.isConfirmed) deleteUser()
                                        })
                                    }}
                                />
                            </>
                        }
                    </h3>
                    <div className="rounded-full overflow-hidden h-64 w-64 mx-auto my-7">
                        <img src={profileUser.profile.avatar} alt="Avatar of profile's owner" />
                    </div>
                    <h4 className="mt-3 text-xl">Email</h4>
                    <p className="mb-5">{profileUser.email}</p>
                    <h4 className="text-xl">Biography</h4>
                    <p className="break-words">
                        {profileUser.profile.bio ? profileUser.profile.bio : 'No biography added.'}
                    </p>
                </div>
                <div className="w-2/6">
                    <h3 className="text-2xl mb-5 text-center">Followers</h3>
                    <UsersList
                        users={users.filter(user => profileUser.profile.follows.map(follow => follow.follower?.id).includes(user.id))}
                        handleDeleteFollow={handleDeleteFollow}
                        followText="Delete"
                    />
                </div>
                <div className="w-2/6">
                    <h3 className="text-2xl mb-5 text-center">Following</h3>
                    <UsersList
                        users={users.filter(user => profileUser.follows.map(follow => follow.followed?.id).includes(user.profile.id))}
                        handleUnfollow={handleUnfollow}
                        followText="Unfollow"
                    />
                </div>
            </div>
        </>
    )
}