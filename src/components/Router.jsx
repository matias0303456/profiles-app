import { Routes, Route } from "react-router-dom";

import { Error } from "../pages/Error";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";
import { UpdateUser } from "../pages/UpdateUser";

export function Router() {
    return (
        <Routes>
            <Route path="/profiles/" element={<Home />} />
            <Route path="/profiles/signup" element={<Signup />} />
            <Route path="/profiles/signin" element={<Signin />} />
            <Route path="/profiles/profile/:id" element={<Profile />} />
            <Route path="/profiles/update-user/:id" element={<UpdateUser />} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}