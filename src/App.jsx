import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Setting from "./Component/SettingPage/Setting";
import Dashboard from "./Component/Dashboard/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<div>No content here</div>} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/settings"} element={<Setting />} />
        <Route path={"/dashboard"} element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App