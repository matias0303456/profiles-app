import { Routes, Route } from "react-router-dom";

import { Error } from "./Error";
import { Home } from "./Home";

export function Router() {
    return (
        <Routes>
            <Route path="/profiles-app/" element={<Home />} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}