import { Route ,Routes } from "react-router-dom"
import StaffLogin from "../Pages/staff/StaffLogin"
import Dashboard from "../Pages/staff/Dashboard"
import StaffPrivateRoute from "./staff/StaffPrivateRoute"
import StaffPublicRoute from "./staff/StaffPublicRoute"
const StaffRoutes = () => {
  return (
    <div>
        <Routes>
          <Route element={<StaffPublicRoute/>}>
           <Route path="/login" element={<StaffLogin/>}/>
          </Route>         
          <Route path="/dashboard" element={<StaffPrivateRoute><Dashboard/></StaffPrivateRoute>}/>
        </Routes>
    </div>
  )
}

export default StaffRoutes