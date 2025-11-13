import { Route,Routes } from "react-router-dom";
import UserLandingPage from "../Pages/user/auth/LandingPage";
const UserRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<UserLandingPage/>}/>
      </Routes>
  )
}

export default UserRoutes