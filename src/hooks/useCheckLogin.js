import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useCheckLogin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("spa_token");
        if (!token) {
            navigate("/login", { replace: true });
        }
    }, [navigate]);
};

export default useCheckLogin;
