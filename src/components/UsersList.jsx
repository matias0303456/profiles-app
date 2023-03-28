import { useContext } from "react"

import { AuthContext } from "../context/AuthProvider"

export function UsersList({ users }) {

    const { auth } = useContext(AuthContext)

    return (
        <section className="flex flex-wrap">
            {users.filter(user => !auth.user.follows.map(follow => follow.followed).includes(user.profile.id))
                .map(user => {
                    return (
                        <div key={user.id}
                            className="m-3 bg-slate-200 text-slate-800 rounded w-48 p-2 flex gap-3">
                            <img src={user.profile.avatar} alt="" className="w-2/4 rounded-full" />
                            <div className="w-2/4 text-center flex flex-col justify-around">
                                <p className="flex gap-3 items-center justify-around">
                                    @{user.username}
                                </p>
                                <button className="bg-slate-800 text-slate-200 rounded p-2 hover:bg-slate-600">
                                    Follow
                                </button>
                            </div>
                        </div>
                    )
                })}
        </section>
    )
}