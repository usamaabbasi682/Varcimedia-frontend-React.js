const useGetRole = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const role = user?.role;
    return role;
}

export default useGetRole;