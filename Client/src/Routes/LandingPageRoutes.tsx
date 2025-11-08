
import { Route,Routes } from "react-router-dom"
import LandingPage from "../Pages/LandingPages"
const LandingPagesRoutes = () => {
  return (
     <Routes>
         <Route path="/" element={<LandingPage/>}/>
     </Routes>
  )
}

export default LandingPagesRoutes