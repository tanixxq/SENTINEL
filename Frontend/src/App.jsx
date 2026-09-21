import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoutes";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Monitors from "./pages/Monitors";
import MonitorDetails from "./pages/MonitorDetails";
import Incidents from "./pages/Incidents";
import Settings from "./pages/Settings";

function App() {
return ( <Routes>
<Route path="/" element={<Home />} />


        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/monitors" element={<Monitors />} />

                <Route
                    path="/monitors/:id"
                    element={<MonitorDetails />}
                />

                <Route path="/incidents" element={<Incidents />} />

                <Route path="/settings" element={<Settings />} />
            </Route>
        </Route>

        <Route
            path="*"
            element={<Navigate to="/" replace />}
        />
    </Routes>
);


}

export default App;
