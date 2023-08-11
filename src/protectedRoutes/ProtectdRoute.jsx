import { useContext } from "react"
import { IdContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom";

const ProtectdRoute = ({children}) => {
    //const {login} = useContext(IdContext);
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if(!isLoggedIn){
        return <Navigate to='/'  replace={true}></Navigate>
     }
     return children;
}

export default ProtectdRoute