const useGetData = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user;
}

export default useGetData;