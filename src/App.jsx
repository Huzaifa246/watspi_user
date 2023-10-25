import React, { useEffect } from "react";
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
import Groups from "./Component/GroupsComp/Groups";
import CreateGroup from "./Component/GroupsComp/CreateGroup";
import OtpForm from "./Pages/OtpForm/otpForm";
import Instances from './Component/IntancesComponent/Instances';
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import Dashboard2 from "./Component/Dashboard2/Dashboard2";
import Sidebar2 from "./Component/Dashboard2/Sidebar/Sidebar2";
import Instances2 from './Component/IntancesComponent/instances2';

const App = () => {
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      axios
        .get(
          `${import.meta.env.VITE_APP_API}/api/users/currentUser/${token}`
        ).then((response) => {
          if (token) {
            dispatch(setUserDetails((response?.data)));
            console.log(token, "tt")
            console.log(response)
          }
          else {
            localStorage.removeItem("token");
            return;
          }
        })
        .catch((error) => {
          console.log("micc", error);
          localStorage.removeItem("token");
          return;
        });
    }
  }, [token]);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path={"/"} element={<div>No content here</div>} /> */}
        <Route path={"/"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/otpForm"} element={<OtpForm />} />

        {/* <Route element={<Sidebar2 />}> */}
          <Route path="/dashboard2" element={<Dashboard2 />} />
          <Route path="/Instances2" element={<Instances2 />} />
        {/* </Route> */}

        <Route element={<HeaderComponent />}>

          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/settings"} element={<Setting />} />
          <Route path={"/groups"} element={<Groups />} />
          <Route path={"/creategroup"} element={<CreateGroup />} />
          <Route path={"/myContact"} element={<MyContact />} />
          <Route path="/instancePage/:id" element={<InstancePage />} />
          <Route path={"/mybroadCast"} element={<MyBroadCast />} />
          <Route path={"/broadCast"} element={<BroadCast />} />
          <Route path={"/instances"} element={<Instances />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App