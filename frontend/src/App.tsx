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

function App() {

  return (
    <>
<BrowserRouter>
<Routes>
<Route path="/signup" element={<Signup/>}/>
<Route path="/signin" element={<Signin/>}/>
<Route path="/user-signin" element={<CSignin/>}/>
<Route path="/user-signup" element={<CSignup/>}/>
<Route path="/adminfoget" element={<AdminForgetpass/>} />
<Route path="/userreset-password" element={<CandidateResetpass/>}/>
<Route path="/reset-password" element={<AdminResetpass />} />
<Route path="/candidateforget" element={<CandidateForgetpass/>}/>
<Route path="/mainpage" element={<Mainpage/>}/>
<Route path="/update/profile" element={<UpdateProfile/>}/>
<Route path="/allapplications" element={<Myapplications/>}/>
<Route path="/savedjobs" element={<Savedjobs/>}/>
<Route path="/recommendjobs" element={<Recommended/>}/>
<Route path="/similarjobs" element={<Similarjobs/>}/>

</Routes>
</BrowserRouter>
    </>
  )
}

export default App
