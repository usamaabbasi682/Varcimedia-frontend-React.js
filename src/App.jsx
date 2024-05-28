import { Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import Login from "views/Auth/Login";

const App = () => {
    
    return (
        <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
        </>
    );
}

export default App;