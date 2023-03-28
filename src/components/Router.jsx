import { Routes, Route } from "react-router-dom";

import { Error } from "../pages/Error";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";

export function Router() {
    return (
        <Routes>
            <Route path="/profiles-app/" element={<Home />} />
            <Route path="/profiles-app/signup" element={<Signup />} />
            <Route path="/profiles-app/signin" element={<Signin />} />
            <Route path="/profiles-app/profile/:id" element={<Profile />} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}