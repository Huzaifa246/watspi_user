import React from 'react';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import ChartPageTwo from '../Chart/ChartPageTwo';
import "./DashboardComp.css"
import DashboardInstances from './../DashboardInstances/DashboardInstances';
const DashBoardComponent = () => {
  const userDetails = useSelector((state) => state.userInfoStore.userDetails.userObj);

  return (
    <div className="Dashboard-Comp-card">
      <div className='Profile-display'>
        <div>
          <h3>
            Whatsapi
          </h3>
        </div>
        <div>
          <FontAwesomeIcon icon={faBell} style={{ fontSize: "2.5vh" }} />
        </div>
      </div>
      <ChartPageTwo />
      <DashboardInstances />
    </div>
  );
};

export default DashBoardComponent;
