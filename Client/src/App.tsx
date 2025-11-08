
import { Route ,Routes } from "react-router-dom"
import LandingPagesRoutes from "./Routes/LandingPageRoutes"
import AdminRoutes from "./Routes/AdminRoutes"
const App = () => {
  return (
     <Routes>
      <Route path="/*" element={<LandingPagesRoutes/>} />
      <Route path="/Admin/*" element={<AdminRoutes/>}/>
     </Routes>
  )
}

export default App