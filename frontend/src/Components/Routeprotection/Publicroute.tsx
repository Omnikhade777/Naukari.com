import { Navigate } from "react-router-dom";

const Publicroute=({children}:any)=>{
    const token=localStorage.getItem("token");
    return token ? <Navigate to="/mainpage"/>:children;
}
export default Publicroute;