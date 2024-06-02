import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const [auth, setAuth] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        setAuth(sessionStorage.getItem('spa_token'));
        if (auth != null) {
            navigate('/admin/dashboard');
        }
    }, [auth]);
}

export default useAuth;