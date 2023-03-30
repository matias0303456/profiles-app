import { useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart } from 'react-icons/ai'

import { AuthContext } from "../context/AuthProvider";
import { useAuth } from "../hooks/useAuth";

export function Layout({ children }) {

    const { auth } = useContext(AuthContext)

    const { handleLogout } = useAuth()

    return (
        <div className="p-2 h-screen flex flex-col">

            <header className="flex flex-wrap bg-slate-800 text-slate-200 p-3 shadow-sm shadow-black rounded">
                <h1 className="w-2/4 text-6xl pl-6 tracking-wider">Profiles App</h1>
                <nav className="w-2/4 flex items-center">
                    <ul className="w-full flex justify-around">
                        {auth ?
                            <>
                                <li className="p-2 rounded">
                                    <span>
                                        Hi {auth.user.username}!
                                    </span>
                                </li>
                                <li className="p-2 rounded hover:bg-slate-200 hover:cursor-pointer hover:text-slate-800">
                                    <Link to="/profiles-app/">Home</Link>
                                </li>
                                <li className="p-2 rounded hover:bg-slate-200 hover:cursor-pointer hover:text-slate-800">
                                    <Link to={`/profiles-app/profile/${auth.user.id}`}>Profile</Link>
                                </li>
                                <li className="p-2 rounded hover:bg-slate-200 hover:cursor-pointer hover:text-slate-800">
                                    <button onClick={() => handleLogout()}>
                                        Logout
                                    </button>
                                </li>
                            </> :
                            <>
                                <li className="p-2 rounded hover:bg-slate-200 hover:cursor-pointer hover:text-slate-800">
                                    <Link to="/profiles-app/signin">Sign In</Link>
                                </li>
                                <li className="p-2 rounded hover:bg-slate-200 hover:cursor-pointer hover:text-slate-800">
                                    <Link to="/profiles-app/signup">Sign Up</Link>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </header>

            <main className="bg-slate-800 text-slate-200 p-6 shadow-sm shadow-black rounded my-3 flex-1">
                {children}
            </main>

            <footer className="bg-slate-800 text-slate-200 p-2 text-center shadow-sm shadow-black rounded flex justify-center items-center gap-1">
                <span>Made with</span>
                <AiFillHeart className="text-red-500" />
                <span>
                    by <Link to="https://github.com/matias0303456" target="_blank" className="hover:text-slate-400">
                        matias0303456
                    </Link> | {new Date().getFullYear()}
                </span>
            </footer>

        </div>
    )
}