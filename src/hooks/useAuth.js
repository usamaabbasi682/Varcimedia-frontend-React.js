import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("spa_token");
        if (token) {
            navigate("/admin/dashboard", { replace: true });
        }
    }, [navigate]);
};

export default useAuth;
