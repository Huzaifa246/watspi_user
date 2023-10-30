import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Modal, Dropdown } from 'react-bootstrap';
import { useSelector } from "react-redux";
import GetALLInstances from '../../helpers/GetApis/GetALLInstance';
import "./Intances.css"
import DelIndiInstance from '../../helpers/GetApis/DelIndiInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateInstanceApi from '../../helpers/PostApis/CreateInstance';
import { useDispatch } from "react-redux";
import { setSelectedInstanceId } from '../../store/intanceSettingSlice';
import bgImg1 from "../../../images/bg-img1.jpg";
import Sidebar2 from '../Dashboard2/Sidebar/Sidebar2';
import "./instances2.css"
import { Link } from 'react-router-dom';

function Instances2() {
    const dispatch = useDispatch();
    const isSidebarOpen = useSelector((state) => state.sideBarStore.isSidebarOpen);
    const selectedInstanceId = useSelector((state) => state.userSetting.selectedInstanceId);
    console.log(selectedInstanceId, "as")

    const userDetails = useSelector((state) => state.userInfoStore.userDetails.userObj);
    console.log(userDetails)
    const userId = userDetails?._id;

    const [showModal, setShowModal] = useState(false);
    const [showDelModal, setShowDelModal] = useState(false);
    const [indiInstanceData, setIndiInstanceData] = useState(null);

    const [createInstance, setCreateInstance] = useState('');
    const [markIncomingMessagesReaded, setMarkIncomingMessagesReaded] = useState(false);
    const [markIncomingMessagesReadedOnReply, setMarkIncomingMessagesReadedOnReply] = useState(false);
    const [keepOnlineStatus, setKeepOnlineStatus] = useState(true);
    const [webhookUrl, setWebhookUrl] = useState('https://mysite.com/webhook/green-api/');
    const [outgoingAPIMessageWebhook, setOutgoingAPIMessageWebhook] = useState(true);
    const [outgoingWebhook, setOutgoingWebhook] = useState(true);
    const [deviceWebhook, setDeviceWebhook] = useState(true);
    const [stateWebhook, setStateWebhook] = useState(true);
    const [outgoingMessageWebhook, setOutgoingMessageWebhook] = useState(true);
    const [incomingWebhook, setIncomingWebhook] = useState(true);
    const [delaySendMessagesMilliseconds, setDelaySendMessagesMilliseconds] = useState(1000);
    const [enableMessagesHistory, setEnableMessagesHistory] = useState(false);

    const [instancesData, setInstancesData] = useState([]); // Default to an empty array
    const [selectedCardCount, setSelectedCardCount] = useState(10); // Default to 10 cards
    const [filteredInstances, setFilteredInstances] = useState([]); // Initially empty
    // Initially empty

    //ALL instances
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetALLInstances(userId);
                if (Array.isArray(data?.message)) {
                    setInstancesData(data.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId]);
    useEffect(() => {
        console.log(instancesData, "Instance data"); // Add this line
        if (selectedCardCount === 10) {
            // If the selected number is 10, no filtering is needed
            setFilteredInstances([...instancesData]); // Create a shallow copy of instancesData
        } else {
            // Filter instances based on selectedCardCount
            setFilteredInstances(instancesData.slice(0, selectedCardCount));
        }
        console.log(filteredInstances, "Filter data"); // Add this line
    }, [selectedCardCount, instancesData]);

    const deleteInstance = async (instanceId) => {
        try {
            await DelIndiInstance(instanceId);
            // Remove the deleted instance from the state
            setInstancesData((prevData) => prevData?.filter((instance) => instance?._id !== instanceId));
            setShowDelModal(false);
            toast.success('Instance deleted successfully', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            console.error('Error deleting instance:', error);
        }
    };
    // Function to close the modal
    const handleCloseModal = () => {
        setShowDelModal(false)
        setShowModal(false);
    };

    //----Create Instance
    const handleSaveInput = () => {
        const randomNames = ["Ali", "Smith", "Johnson", "Brown", "Taylor", "Williams", "Huzaifa", "Saad", "Emma", "Liam",
            "Olivia", "Noah", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia", "Harper"];

        const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
        const data = {
            webhookUrl,
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
            if (response?.message === "Instance Added") {
                setCreateInstance(response?.data);
                toast.success(response?.message, {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            } else {
                console.error("API error:", response);
                toast.error(response?.message, {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        })
        .catch((error) => {
            console.error("API error:", error);
            toast.error(error?.message, {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        });
    
    };
    //----Ends Create Instance

    const handleLinkClick = () => {
        dispatch(setSelectedInstanceId(instance?._id));
    };

    return (
        <>
            <ToastContainer />
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Individual Instance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {indiInstanceData && (
                        <>
                            <div style={{ textAlign: 'center' }}>
                                <h6>{indiInstanceData?.InstancesName}</h6>
                                <h6>{indiInstanceData?.InstancesPhone}</h6>
                                <h6>{indiInstanceData?.webhookUrl}</h6>
                                <h6>{indiInstanceData?.delaySendMessagesMilliseconds}</h6>
                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Del Modal */}
            <Modal show={showDelModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Instance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are You Sure You want to Delete selected Instance
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={() => {
                        deleteInstance(selectedInstanceId);
                        setShowDelModal(false)
                    }}
                    >
                        Delete
                    </Button>
                    <Button variant='light' onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal >

            <div style={{
                backgroundImage: `url(${bgImg1})`,
                width: "100%",
                height: "100vh",
                overflow: 'hidden',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}>
                <Row style={{ padding: "3vh 4.5vh 3vh 0" }}>
                    <Col sm="1" lg="1" xl="1" xxl="1">
                        <Sidebar2 />
                    </Col>
                    <Col sm="12" md="11" lg="11" xl="11" xxl="11">
                        <div className="Dashboard-Comp-card">
                            <div className='Dashboard-display'>
                                <Row className='pd-20 pd-10-mob'>
                                    <Col className='pd-mob-instances'>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: "15px 0", alignItems: "baseline" }}>
                                            <h4 style={{ fontWeight: "600", color: 'white', lineHeight: "0" }}>
                                                All Instances
                                            </h4>
                                            <div style={{ display: 'flex' }}>
                                                <Dropdown style={{ paddingRight: "10px" }}>
                                                    <Dropdown.Toggle variant="light" id="cardCountDropdown" className="transparent-background-dropdown" style={{ color: "white" }}>
                                                        Show {selectedCardCount} Cards
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="transparent-background-dropdown" style={{ color: "white" }}>
                                                        <Dropdown.Item onClick={() => setSelectedCardCount(10)}>10 Cards</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSelectedCardCount(20)}>20 Cards</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSelectedCardCount(50)}>50 Cards</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSelectedCardCount(100)}>100 Cards</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSelectedCardCount(200)}>200 Cards</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                <Button className='create-instance2' onClick={handleSaveInput}>
                                                    Create Instance
                                                </Button>
                                            </div>
                                        </div>
                                        <div className='All-Instance-Card'>
                                            {filteredInstances?.map(instance => (
                                                <Link
                                                    to={`/instancePage2/${instance?._id}`}
                                                    onClick={() => {
                                                        dispatch(setSelectedInstanceId(instance?._id));
                                                        console.log('Dispatched setSelectedInstanceId with ID:', instance?._id);
                                                    }}
                                                    style={{ textDecoration: "none" }}
                                                >
                                                    <div className="All-single-card">
                                                        {instance?.keepOnlineStatus ? (
                                                            <>
                                                                <div className="live-all-badge">Live</div>
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
                                                            className='images-allcard-style'
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                        <div className="AllI-Rightcard-container">
                                                            <div className="instance-id">{instance?.idInstance}</div>
                                                            <h6 className='h6-font-size'>{instance?.InstancesName}</h6>
                                                            <p>{instance?.InstancesPhone}</p>
                                                            <p>10 Days Left</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Instances2
