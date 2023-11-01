import React, { useState, useEffect } from 'react'
import defaultImg from "../../../../images/default-img.png"
import "./MainInstance.css"
import CreateInstanceApi from '../../../helpers/PostApis/CreateInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function MainInstance() {
  const userDetails = useSelector((state) => state.userInfoStore.userDetails.userObj);
  const userId = userDetails?._id;
  const userName = userDetails?.name;
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  //Create Instance
  const [createInstance, setCreateInstance] = useState('');
  const [markIncomingMessagesReaded, setMarkIncomingMessagesReaded] = useState(false);
  const [markIncomingMessagesReadedOnReply, setMarkIncomingMessagesReadedOnReply] = useState(false);
  const [keepOnlineStatus, setKeepOnlineStatus] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState('https://mysite.com/webhook/green-api/');
  const [webhookUrlToken, setWebhookUrlToken] = useState('qwerty');
  const [outgoingAPIMessageWebhook, setOutgoingAPIMessageWebhook] = useState(true);
  const [outgoingWebhook, setOutgoingWebhook] = useState(true);
  const [deviceWebhook, setDeviceWebhook] = useState(true);
  const [stateWebhook, setStateWebhook] = useState(true);
  const [outgoingMessageWebhook, setOutgoingMessageWebhook] = useState(true);
  const [incomingWebhook, setIncomingWebhook] = useState(true);
  const [delaySendMessagesMilliseconds, setDelaySendMessagesMilliseconds] = useState(1000);
  const [enableMessagesHistory, setEnableMessagesHistory] = useState(false);

  const handleSaveInput = () => {
    const randomNames = ["Ali", "Smith", "Johnson", "Brown", "Taylor", "Williams", "Huzaifa", "Saad", "Emma", "Liam",
      "Olivia", "Noah", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia", "Harper"];

    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const data = {
      webhookUrl,
      webhookUrlToken,
      delaySendMessagesMilliseconds,
      markIncomingMessagesReaded: JSON.stringify(markIncomingMessagesReaded),
      markIncomingMessagesReadedOnReply: JSON.stringify(markIncomingMessagesReadedOnReply),
      keepOnlineStatus: JSON.stringify(keepOnlineStatus),
      outgoingAPIMessageWebhook: JSON.stringify(outgoingAPIMessageWebhook),
      outgoingWebhook: JSON.stringify(outgoingWebhook),
      deviceWebhook: JSON.stringify(deviceWebhook),
      stateWebhook: JSON.stringify(stateWebhook),
      outgoingMessageWebhook: JSON.stringify(outgoingMessageWebhook),
      incomingWebhook: JSON.stringify(incomingWebhook),
      userId: userId,
      InstancesName: randomName,
      InstancesPhone: +92345678910,
      enableMessagesHistory: JSON.stringify(enableMessagesHistory)
    };

    CreateInstanceApi(data)
      .then((response) => {
        setCreateInstance(response?.data)
        console.log("API response:", response?.data);
        toast.success('Instance Created successfully', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };
  return (
    <>
      <ToastContainer />
      <div className="Dashboard-Comp-card">
        <div className='Profile-display'>
          <div className="profile-dropdown">
            <img
              src={defaultImg}
              className="Profile-img-radius"
              alt="Profile-Image"
              style={{ cursor: 'pointer' }}
            />
            <span style={{ marginLeft: '5px', color: "white" }}>
              {userName || "Huzaifa"}
            </span>
          </div>

          <span style={{ display: 'flex', alignItems: "baseline" }}>
            <div className='Pro-badge'>
              Pro
            </div>
            <a
              className="dropdown-item_MainInstance"
              onClick={handleLogout}
              title='Logout'
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </a>
          </span>
        </div>
        <div>
          <button className='Add-new-Dash-btn'
            onClick={handleSaveInput}
          >
            Add new Instance
          </button>
        </div>

        <div className='images-section'>
          <img src={"https://plus.unsplash.com/premium_photo-1661698763470-55da05629e50?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            alt="Profile-Image"
            className='images-card-section'
            style={{ cursor: 'pointer' }}
          />
          <img src={"https://plus.unsplash.com/premium_photo-1661698763470-55da05629e50?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            alt="Profile-Image"
            className='images-card-section'
            style={{ cursor: 'pointer' }}
          />
          <img src={"https://plus.unsplash.com/premium_photo-1661698763470-55da05629e50?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            alt="Profile-Image"
            className='images-card-section'
            style={{ cursor: 'pointer' }}
          />
          <img src={"https://plus.unsplash.com/premium_photo-1661698763470-55da05629e50?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            alt="Profile-Image"
            className='images-card-section'
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div>
          <h6 style={{ textAlign: 'start', color: 'white' }}>
            Contacts
          </h6>
          <div className='Contact-display'>
            <img src={defaultImg} className="Profile-img-radius" alt="Profile-Image"
              style={{ cursor: 'pointer' }}
            />
            <img src={defaultImg} className="Profile-img-radius" alt="Profile-Image"
              style={{ cursor: 'pointer' }}
            />
            <img src={defaultImg} className="Profile-img-radius" alt="Profile-Image"
              style={{ cursor: 'pointer' }}
            />
            <img src={defaultImg} className="Profile-img-radius" alt="Profile-Image"
              style={{ cursor: 'pointer' }}
            />
            <img src={defaultImg} className="Profile-img-radius" alt="Profile-Image"
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default MainInstance
