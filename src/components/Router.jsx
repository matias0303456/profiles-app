import { Routes, Route } from "react-router-dom";

import { Error } from "../pages/Error";
import { Home } from "../pages/Home";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";

export function Router() {
    return (
        <Routes>
            <Route path="/profiles-app/" element={<Home />} />
            <Route path="/profiles-app/signup" element={<Signup />} />
            <Route path="/profiles-app/signin" element={<Signin />} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}