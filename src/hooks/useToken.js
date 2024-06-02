import React,{useState,useEffect} from "react";

const useToken = () => {
    const [token, setToken] = useState();

    useEffect(() => {
        setToken(sessionStorage.getItem('spa_token'));
    }, []);

    return token;
}

export default useToken;