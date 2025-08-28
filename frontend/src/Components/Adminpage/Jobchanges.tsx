import { useLocation } from "react-router-dom";
//incomplete work
const Jobchanges=()=>{
    const location=useLocation();
    const id=location.state.jobid
    return(
        <>
        <div>{id}</div>
        </>
    )
}
export default Jobchanges;