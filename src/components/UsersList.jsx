import { useNavigate } from "react-router"

export function UsersList({ users, handleFollow, handleUnfollow, handleDeleteFollow, followText }) {

    const navigate = useNavigate()

    return (
        <section className="flex flex-wrap">
            {users.map(user => {
                return (
                    <div key={user.id}
                        className="m-3 bg-slate-200 text-slate-800 rounded w-48 p-2 flex gap-3">
                        <div className="flex items-center my-auto w-1/4 rounded-full overflow-hidden">
                            <img src={user.profile.avatar} alt="User's avatar" />
                        </div>
                        <div className="text-center flex flex-col justify-around w-3/4">
                            <p
                                className="flex gap-3 items-center justify-around text-md hover:text-slate-400 hover:cursor-pointer"
                                onClick={() => navigate(`/profiles-app/profile/${user.id}`)}
                            >
                                @{user.username}
                            </p>
                            <button
                                className="bg-slate-800 text-slate-200 rounded p-1 mt-2 hover:bg-slate-600"
                                onClick={() => {
                                    if (followText === 'Follow') {
                                        handleFollow(user.profile.id)
                                    }
                                    if (followText === 'Unfollow') {
                                        handleUnfollow(user.profile.id)
                                    }
                                    if (followText === 'Delete') {
                                        handleDeleteFollow(user.id)
                                    }
                                }}
                            >
                                {followText}
                            </button>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}