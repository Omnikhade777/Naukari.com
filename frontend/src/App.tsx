import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./Components/authentication/AdminSignup"
import Signin from "./Components/authentication/AdminSignin"
import CSignin from "./Components/authentication/CandidateSignin"
import CSignup from "./Components/authentication/Candidatesignup"
import CandidateResetpass from "./Components/authentication/CandidateResetpass"
import AdminForgetpass from "./Components/authentication/AdminForgetass"
import AdminResetpass from "./Components/authentication/AdminResetpass"
import CandidateForgetpass from "./Components/authentication/CandidateForgetpass"
import Mainpage from "./Components/Candidatepages/Mainpage"
import UpdateProfile from "./Components/Candidatepages/Updateprofiel"
import Myapplications from "./Components/Candidatepages/Myapplications"
import Savedjobs from "./Components/Candidatepages/Savedjobs"
import Recommended from "./Components/Candidatepages/Recommended"
import Similarjobs from "./Components/Candidatepages/Similarjobs"
import  Home  from "./Components/Home"
import CreateProfile from "./Components/Candidatepages/CreateProfile"
import Privateroute from "./Components/Routeprotection/Privateroute"
import Publicroute from "./Components/Routeprotection/Publicroute"
import Landingpage from "./Components/Adminpage/Landingpage"
import Aboutpage from "./Components/Adminpage/Aboutpage"
import Jobchanges from "./Components/Adminpage/Jobchanges"
import Applications from "./Components/Adminpage/Applications"
import {Publicrouteofadmin,RootRoute} from "./Components/Routeprotection/Publicroute"
import {Privaterouteforadmin} from "./Components/Routeprotection/Privateroute"
import NotFoundroute from "./Components/Routeprotection/Notfoundroute"

function App() {

  return (
    <>
<BrowserRouter>
<Routes>
<Route path="/" element={ <RootRoute><Home/></RootRoute> }/>
<Route path="/signup" element={<Publicrouteofadmin><Signup/></Publicrouteofadmin>}/>
<Route path="/signin" element={<Publicrouteofadmin><Signin/></Publicrouteofadmin>}/>
<Route path="/user-signin" element={<Publicroute><CSignin/></Publicroute>}/>
<Route path="/user-signup" element={<Publicroute><CSignup/></Publicroute>}/>
<Route path="/adminfoget" element={<Publicrouteofadmin><AdminForgetpass/></Publicrouteofadmin>} />
<Route path="/userreset-password" element={<Publicroute><CandidateResetpass/></Publicroute>}/>
<Route path="/reset-password" element={<Publicrouteofadmin><AdminResetpass /></Publicrouteofadmin>} />
<Route path="/candidateforget" element={<Publicroute><CandidateForgetpass/></Publicroute>}/>
<Route path="/mainpage" element={ <Privateroute><Mainpage/></Privateroute>}/>
<Route path="/update/profile" element={<Privateroute><UpdateProfile/></Privateroute>}/>
<Route path="/allapplications" element={<Privateroute><Myapplications/></Privateroute>}/>
<Route path="/savedjobs" element={<Privateroute><Savedjobs/></Privateroute>}/>
<Route path="/recommendjobs" element={<Privateroute><Recommended/></Privateroute>}/>
<Route path="/similarjobs" element={<Privateroute><Similarjobs/></Privateroute>}/>
<Route path="/createprofile" element={<Privateroute><CreateProfile/></Privateroute> } />
<Route path="/landingpage" element={<Privaterouteforadmin><Landingpage/></Privaterouteforadmin> } />
<Route path="/aboutadmin" element={<Privaterouteforadmin><Aboutpage/></Privaterouteforadmin> }/>
<Route path="/joboperation" element={<Privaterouteforadmin><Jobchanges/></Privaterouteforadmin> }/>
<Route path="/application" element={<Privaterouteforadmin><Applications/></Privaterouteforadmin> }/>
<Route path="*" element={<NotFoundroute />} />
</Routes>
</BrowserRouter>
    </>
  )
}

export default App
