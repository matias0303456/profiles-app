export function UsersList({ users, handleFollow, handleUnfollow, follow = true }) {
    return (
        <section className="flex flex-wrap">
            {users.map(user => {
                return (
                    <div key={user.id}
                        className="m-3 bg-slate-200 text-slate-800 rounded w-48 p-2 flex gap-3">
                        <img src={user.profile.avatar} alt="" className="w-2/4 rounded-full" />
                        <div className="w-2/4 text-center flex flex-col justify-around">
                            <p className="flex gap-3 items-center justify-around">
                                @{user.username}
                            </p>
                            <button
                                className="bg-slate-800 text-slate-200 rounded p-2 hover:bg-slate-600"
                                onClick={() => {
                                    if (follow) {
                                        handleFollow(user.profile.id)
                                    }
                                    else {
                                        handleUnfollow(user.profile.id)
                                    }
                                }}
                            >
                                {follow ? 'Follow' : 'Unfollow'}
                            </button>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}