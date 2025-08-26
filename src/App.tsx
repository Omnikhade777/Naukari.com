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

function App() {

  return (
    <>
<BrowserRouter>
<Routes>
  <Route path="/" element={ <Publicroute><Home/></Publicroute> }/>
<Route path="/signup" element={<Publicroute><Signup/></Publicroute>}/>
<Route path="/signin" element={<Publicroute><Signin/></Publicroute>}/>
<Route path="/user-signin" element={<Publicroute><CSignin/></Publicroute>}/>
<Route path="/user-signup" element={<Publicroute><CSignup/></Publicroute>}/>
<Route path="/adminfoget" element={<Publicroute><AdminForgetpass/></Publicroute>} />
<Route path="/userreset-password" element={<Publicroute><CandidateResetpass/></Publicroute>}/>
<Route path="/reset-password" element={<Publicroute><AdminResetpass /></Publicroute>} />
<Route path="/candidateforget" element={<Publicroute><CandidateForgetpass/></Publicroute>}/>
<Route path="/mainpage" element={ <Privateroute><Mainpage/></Privateroute>}/>
<Route path="/update/profile" element={<Privateroute><UpdateProfile/></Privateroute>}/>
<Route path="/allapplications" element={<Privateroute><Myapplications/></Privateroute>}/>
<Route path="/savedjobs" element={<Privateroute><Savedjobs/></Privateroute>}/>
<Route path="/recommendjobs" element={<Privateroute><Recommended/></Privateroute>}/>
<Route path="/similarjobs" element={<Privateroute><Similarjobs/></Privateroute>}/>
<Route path="/createprofile" element={<Privateroute><CreateProfile/></Privateroute> } />
</Routes>
</BrowserRouter>
    </>
  )
}

export default App
