import React from 'react';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import ChartPageTwo from '../Chart/ChartPageTwo';
import "./DashboardComp.css"
import DashboardInstances from './../DashboardInstances/DashboardInstances';
import whatsapiLogo from "../../../../images/watspilogo.png"
const DashBoardComponent = () => {
  const userDetails = useSelector((state) => state.userInfoStore.userDetails.userObj);

  return (
    <div className="Dashboard-Comp-card">
      <div className='Dashboard-display'>
        <div>
          {/* <h3 style={{ color: "white" }}>
            Whatsapi
          </h3> */}
          <img src={whatsapiLogo}
            alt="Profile-Image"
            style={{ cursor: 'pointer', height: "4vh" }}
          />
        </div>
        <div>
          <FontAwesomeIcon icon={faBell} style={{ fontSize: "2.5vh", color: "rgb(255 252 252 / 100%)" }} />
        </div>
      </div>
      <ChartPageTwo />
      <DashboardInstances />
    </div>
  );
};

export default DashBoardComponent;
