import { createContext, useState } from "react";


export function AuthProvider({ children }) {

    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')))

    const UserContext = createContext({
        auth: null,
        setAuth: () => { }
    })

    return (
        <UserContext.Provider value={{ auth, setAuth }}>
            {children}
        </UserContext.Provider>
    )

}