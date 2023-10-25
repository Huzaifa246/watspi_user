import React, { useState, useEffect } from 'react'
import "./DashboardInstances.css"
import { useSelector } from "react-redux";
import GetALLInstances from './../../../helpers/GetApis/GetALLInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import defaultImg from "../../../../images/default-img.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function DashboardInstances() {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails.userObj);
    const userId = userDetails?._id;

    //TEXT LENGTH ACCORDING to SCREEN
    const [textLength, setTextLength] = useState(50);
    useEffect(() => {
        function handleWindowResize() {
            const windowWidth = window.innerWidth;

            if (windowWidth > 1600) {
                setTextLength(100);
            } else if (windowWidth < 1600 && windowWidth > 1000) {
                setTextLength(60);
            } else if (windowWidth > 999) {
                setTextLength(33);
            }
            else if (windowWidth > 400) {
                setTextLength(20);
            }
        }
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    }
    const defaultMessages = [
        {
            text: 'Choose option 1',
        },
        {
            text: 'Choose option 2 Lorem ipsum dolor sit amet. Choose option Lorem ipsum dolor sit amet. Choose option Lorem ipsum dolor sit amet.Choose option Lorem ipsum dolor sit amet.',
        },
        {
            text: 'Choose option 2 Lorem ipsum dolor sit amet. Choose option Lorem ipsum dolor sit amet. Choose option Lorem ipsum dolor sit amet.Choose option Lorem ipsum dolor sit amet.',
        },
    ];
    const [instancesData, setInstancesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetALLInstances(userId);
                setInstancesData(data?.message);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4 style={{ textAlign: 'start', color: "white" }}>
                        Instances
                    </h4>
                    <a href="/instances2" style={{ textDecoration: "none" }}>
                        <h5 style={{ textAlign: 'start', color: "white", paddingRight: "10px" }}>
                            View All
                        </h5>
                    </a>
                </div>
                {/* <div className='Main-card-Dash'>
                    {instancesData?.map(instance => (
                        <div className="Dash-card-instance">
                            {instance?.keepOnlineStatus ? (
                                <>
                                    <div className="live-badge">Live</div>
                                </>
                            ) : (
                                <>
                                    <div className='red-badge'>
                                        Inactive
                                    </div>
                                </>
                            )}
                            <img src={"https://plus.unsplash.com/premium_photo-1661698763470-55da05629e50?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                alt="Profile-Image"
                                className='images-card-style'
                                style={{ cursor: 'pointer' }}
                            />
                            <div className="Dash-card-instance-container">
                                <h6 className='h6-font-size'>{instance?.InstancesName}</h6>
                                <p>{instance?.InstancesPhone}</p>
                            </div>
                        </div>
                    ))}
                </div> */}
                <Swiper
                    spaceBetween={8}
                    slidesPerView={5}
                >
                    {instancesData?.map((instance, index) => (
                        <SwiperSlide key={index}>
                            <div className="Dash-card-instance">
                                {instance?.keepOnlineStatus ? (
                                    <>
                                        <div className="live-badge">Live</div>
                                    </>
                                ) : (
                                    <>
                                        <div className='red-badge'>
                                            Inactive
                                        </div>
                                    </>
                                )}
                                <img src={"https://plus.unsplash.com/premium_photo-1661698763470-55da05629e50?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                    alt="Profile-Image"
                                    className='images-card-style'
                                    style={{ cursor: 'pointer' }}
                                />
                                <div className="Dash-card-instance-container">
                                    <h6 className='h6-font-size' style={{ marginBottom: "0.2rem" }}>{instance?.InstancesName}</h6>
                                    <p>{instance?.InstancesPhone}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* Messages */}
                <div>
                    <h6 style={{ textAlign: 'start', margin: "10px 0 10px 5px", color: "white" }}>
                        Messages
                    </h6>
                </div>
                <div className="table-wrap">
                    <div className='scroll-style'>
                        <tbody className='scrollable-body'>
                            {defaultMessages.map((message, index) => (
                                <tr className='msg-body-dash' key={index} style={{ verticalAlign: "baseline" }}>
                                    <td style={{ textAlign: "start" }}>
                                        <img src={defaultImg} className="Profile-img-radius" alt="Profile-Image"
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <span style={{ paddingLeft: "10px" }}>
                                            Huzaifa
                                        </span>
                                    </td>
                                    <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        {/* {createTooltip(message.text, `tooltip${index}`)} */}
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip id={`tooltip${index}`}>{message?.text}</Tooltip>}
                                        >
                                            <span data-tip={message.text} data-for={`tooltip${index}`}>
                                                {truncateText(message.text, textLength)}
                                            </span>
                                        </OverlayTrigger>
                                        <span style={{ marginLeft: "10px" }}>
                                            <FontAwesomeIcon
                                                icon={faEllipsisV}
                                                onClick={() => handleSelectMessage(message)}
                                            />
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardInstances
