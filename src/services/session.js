export const setUserSession=(user)=>{
    sessionStorage.setItem('user', JSON.stringify(user));
}
export const getUtilisateur=()=>{
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}
// remove the token and user from the session storage
export const restaurerSession =()=>{
    sessionStorage.removeItem('user');
}