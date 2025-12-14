import { Route ,Routes } from "react-router-dom"
import StaffLogin from "../Pages/staff/StaffLogin"

const StaffRoutes = () => {
  return (
    <div>
        <Routes>
          <Route path="/login" element={<StaffLogin/>}/>
        </Routes>
    </div>
  )
}

export default StaffRoutes