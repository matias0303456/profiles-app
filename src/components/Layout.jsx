import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthProvider";

export function Layout({ children }) {

    const { auth } = useContext(AuthContext)

    return (
        <div className="p-2 h-screen flex flex-col">

            <header className="flex flex-wrap bg-slate-800 text-slate-200 p-6 shadow-sm shadow-black rounded">
                <h1 className="w-2/4">Profiles App</h1>
                <nav className="w-2/4">
                    <ul className="flex justify-around">
                        {auth ?
                            <>
                                <li>
                                    <Link to="/profiles-app/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/profiles-app/profile/">Profile</Link>
                                </li>
                                <li>
                                    <span>
                                        Hola!
                                    </span>
                                </li>
                                <li>
                                    <button>
                                        Logout
                                    </button>
                                </li>
                            </> :
                            <>
                                <li>
                                    <button>
                                        Sign In
                                    </button>
                                </li>
                                <li>
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

            <footer className="bg-slate-800 text-slate-200 p-2 text-center shadow-sm shadow-black rounded">
                Made with love by matias0303456 | {new Date().getFullYear()}
            </footer>

        </div>
    )
}