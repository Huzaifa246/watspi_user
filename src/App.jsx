import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Setting from "./Component/SettingPage/Setting";
import Dashboard from "./Component/Dashboard/Dashboard";
import HeaderComponent from "./Component/header/header";
import InstancePage from "./Component/InstancePage/InstancePage";
import BroadCast from './Component/BroadCast/broadCast';
import MyBroadCast from "./Component/BroadCast/MyBroadCast/MyBroadCast";
import MyContact from "./Component/MyContactPage/Contact";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path={"/"} element={<div>No content here</div>} /> */}
        <Route path={"/"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        
        <Route element={<HeaderComponent />}>
          <Route path={"/settings"} element={<Setting />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/instancePage"} element={<InstancePage />} />
          <Route path={"/broadCast"} element={<BroadCast />} />
          <Route path={"/mybroadCast"} element={<MyBroadCast />} />
          <Route path={"/myContact"} element={<MyContact />} /> 

        </Route>
        {/* <Route path={"/header"} element={<HeaderComponent />} />
        <Route path={"/sidebar"} element={<Sidebar />} /> */}


      </Routes>
    </BrowserRouter>
  )
}

export default App