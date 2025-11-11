
import { Route ,Routes } from "react-router-dom"
import LandingPagesRoutes from "./Routes/LandingPageRoutes"
import AdminRoutes from "./Routes/AdminRoutes"
import PublicRoute from "./Routes/publicRoute"
const App = () => {
  return (
     <Routes>
      <Route path="/*" element={<PublicRoute><LandingPagesRoutes/></PublicRoute>} />
      <Route path="/admin/*" element={<AdminRoutes/>}/>
     </Routes>
  )
}

export default App