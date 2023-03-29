import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import { AuthContext } from "../context/AuthProvider";
import { API_URL, DEFAULT_AVATAR } from "../utils/config";

export function useUsers() {

    const { auth, setAuth } = useContext(AuthContext)

    const navigate = useNavigate()

    const [users, setUsers] = useState([])

    async function getUsers() {
        if (!auth) return
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

    async function updateUser({ avatar, username, bio }) {
        const userPromise = await fetch(API_URL + `/user/${auth.user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth?.token
            },
            body: JSON.stringify({ username })
        })
        const profilePromise = await fetch(API_URL + `/profile/${auth.user.id}/${auth.user.profile.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth?.token
            },
            body: JSON.stringify({ avatar, bio })
        })
        try {
            const res = await Promise.all([userPromise, profilePromise])
            const [newUser, newProfile] = await Promise.all([res[0].json(), res[1].json()])
            setAuth({
                ...auth,
                user: {
                    ...auth.user,
                    username: newUser.username,
                    profile: {
                        ...auth.user.profile,
                        avatar: newProfile.avatar,
                        bio: newProfile.bio
                    }
                },
            })
            navigate(`/profiles-app/profile/${auth.user.id}`)
        } catch (err) {
            console.log(err.message)
        }
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
                body: JSON.stringify({ follower: auth?.user.id, followed })
            })
            const data = await res.json()
            setAuth({ ...auth, user: { ...auth.user, follows: [...auth.user.follows, data] } })
            setUsers([...users.filter(item => parseInt(item.profile.id) !== parseInt(data.id))])
        } catch (err) {
            console.log(err)
        }
    }

    async function handleUnfollow(followed) {
        if (!auth) return
        try {
            await fetch(API_URL + `/unfollow/${auth?.user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': auth?.token
                },
                body: JSON.stringify({ follower: auth?.user.id, followed })
            })
            setAuth({
                ...auth,
                user: {
                    ...auth.user,
                    follows: [
                        ...auth.user.follows.filter(item => parseInt(item.followed.id) !== parseInt(followed))
                    ]
                }
            })
            setUsers([...users.filter(item => parseInt(item.profile.id) !== parseInt(followed))])
        } catch (err) {
            console.log(err)
        }
    }

    async function handleDeleteFollow(follower) {
        if (!auth) return
        try {
            await fetch(API_URL + `/unfollow/${auth?.user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': auth?.token
                },
                body: JSON.stringify({ follower, followed: auth?.user.id })
            })
            setAuth({
                ...auth,
                user: {
                    ...auth.user,
                    profile: {
                        ...auth.user.profile,
                        follows: [
                            ...auth.user.profile.follows
                                .filter(item => parseInt(item.follower.id) !== parseInt(follower))
                        ]
                    }
                }
            })
            setUsers([...users.filter(item => parseInt(item.profile.id) !== parseInt(follower))])
        } catch (err) {
            console.log(err)
        }
    }

    return { getUsers, users, updateUser, handleFollow, handleUnfollow, handleDeleteFollow }

}