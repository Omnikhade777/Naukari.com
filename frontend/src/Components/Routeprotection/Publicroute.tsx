import { Navigate } from "react-router-dom";

const Publicroute=({children}:any)=>{
    const token=localStorage.getItem("token");
    return token ? <Navigate to="/mainpage"/>:children;
}
export default Publicroute;


export const Publicrouteofadmin=({children}:any)=>{
    const token=localStorage.getItem("admintoken");
    return token ? <Navigate to="/landingpage"/> : children;
}

export const RootRoute = ({ children }: any) => {
  const token = localStorage.getItem("token");
  const admintoken = localStorage.getItem("admintoken");

  if (admintoken) {
    return <Navigate to="/landingpage" />;
  }

  if (token) {
    return <Navigate to="/mainpage" />;
  }

  return children; 
};

