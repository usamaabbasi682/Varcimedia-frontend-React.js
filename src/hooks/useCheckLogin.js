import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

const useCheckLogin = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('spa_token');

    useEffect(() => {
        if (token == null || token == '') {
            navigate('/login');
        }
    },[]);
}

export default useCheckLogin;