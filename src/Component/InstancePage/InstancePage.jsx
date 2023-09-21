import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Card, Col, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faUser, faCog, faBell, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'; // Import the copy icon
import "./Instance.css"

function InstancePage() {
    const isSidebarOpen = useSelector((state) => state.sideBarStore.isSidebarOpen);


    const [isBasicOpen, setIsBasicOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isWebhooksOpen, setIsWebhooksOpen] = useState(false);

    const toggleBasic = () => {
        setIsBasicOpen(!isBasicOpen);
        setIsSettingsOpen(false);
        setIsWebhooksOpen(false);
    };
    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
        setIsBasicOpen(false);
        setIsWebhooksOpen(false); // Close Webhooks content if open
    };

    // Function to toggle the visibility of Webhooks content
    const toggleWebhooks = () => {
        setIsWebhooksOpen(!isWebhooksOpen);
        setIsBasicOpen(false);
        setIsSettingsOpen(false); // Close Settings content if open
    };

    return (
        <>
            <div className={`${!isSidebarOpen ? 'trades-open' : ''}`}>
                <div style={{ marginTop: "6rem" }}></div>
                <Row>
                    <Col>
                        <Row style={{ marginBottom: "20px", marginLeft: "10px",width: "99.5%" }}>
                            <Col>
                                <Card className='card-box-border border-shadow-style'>
                                    <div className='card-drop-style' onClick={toggleBasic}>
                                        <h6 style={{ padding: "10px", paddingTop: "20px", fontWeight: "600" }}>
                                            Basic Info
                                        </h6>
                                        <FontAwesomeIcon
                                            icon={isBasicOpen ? faChevronUp : faChevronDown} // Arrow icon for toggle
                                            className='arrow-icon'
                                        />
                                    </div>
                                    {isBasicOpen && (
                                        <Card style={{ padding: "15px 0"}}>
                                            <Table striped className='main-table'>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            API URL
                                                        </td>
                                                        <td>
                                                            afomedia.com
                                                        </td>
                                                        <td style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                            <span>
                                                                <FontAwesomeIcon icon={faCopy} className="fa-thin fa-copy" style={{ color: "#686868" }} />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Media URL
                                                        </td>
                                                        <td>
                                                            media.com
                                                        </td>
                                                        <td style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                            <span>
                                                                <FontAwesomeIcon icon={faCopy} className="fa-thin fa-copy" style={{ color: "#686868" }} />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            IdInstance
                                                        </td>
                                                        <td>
                                                            0987654321
                                                        </td>
                                                        <td style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                            <span>
                                                                <FontAwesomeIcon icon={faCopy} className="fa-thin fa-copy" style={{ color: "#686868" }} />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            ApiTokenInstance
                                                        </td>
                                                        <td>
                                                            098765432123456789
                                                        </td>
                                                        <td style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                            <span>
                                                                <FontAwesomeIcon icon={faCopy} className="fa-thin fa-copy" style={{ color: "#686868" }} />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Name
                                                        </td>
                                                        <td>
                                                            Panther d1
                                                        </td>
                                                        <td>    
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Status
                                                        </td>
                                                        <td>
                                                            Authorized
                                                        </td>
                                                        <td>    
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Phone
                                                        </td>
                                                        <td>
                                                            0987654321
                                                        </td>
                                                        <td>    
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Card>
                                    )}
                                </Card>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                        {/* Settings */}

                        <Row style={{ marginBottom: "20px", marginLeft: "10px",width: "99.5%" }}>
                            <Col>
                                <Card className='card-box-border border-shadow-style'>
                                    <div className='card-drop-style' onClick={toggleSettings}>
                                        <h6 style={{ padding: "10px",paddingTop: "20px", fontWeight: "600" }}>
                                            Settings
                                        </h6>
                                        <FontAwesomeIcon
                                            icon={isSettingsOpen ? faChevronUp : faChevronDown} // Arrow icon for toggle
                                            className='arrow-icon'
                                            
                                        />
                                    </div>
                                    {isSettingsOpen && (
                                        <Card className='card-box-border'>
                                            <Table striped className='main-table'>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: "50%" }}>
                                                            Making Incoming messages read
                                                        </td>
                                                        <td>
                                                            <div className="form-check form-switch">
                                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                            </div>

                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Making Incoming messages read
                                                        </td>
                                                        <td>
                                                            <div className="form-check form-switch custom-switch">
                                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                            </div>

                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Making sending delay from the queue
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="input_field-Prof"
                                                                style={{
                                                                    borderTopRightRadius: "0",
                                                                    borderTopLeftRadius: "0",
                                                                    border: "1px solid #d3d1d1"
                                                                }}
                                                            />
                                                            <button className='msec-btn'>
                                                                msec
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Keep online status
                                                        </td>
                                                        <td>
                                                            <div className="form-check form-switch custom-switch">
                                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Card>
                                    )}
                                </Card>
                            </Col>
                        </Row>
                        {/* Webhooks */}

                        <Row style={{ marginBottom: "20px", marginLeft: "10px", width: "99.5%" }}>
                            <Col>
                                <Card className='card-box-border border-shadow-style'>
                                    <div className='card-drop-style' onClick={toggleWebhooks}>
                                        <h6 style={{ padding: "10px",paddingTop: "20px", fontWeight: "600" }}>
                                            Webhooks
                                        </h6>
                                        <FontAwesomeIcon
                                            icon={isWebhooksOpen ? faChevronUp : faChevronDown} // Arrow icon for toggle
                                            className='arrow-icon'
                                        />
                                    </div>
                                    {isWebhooksOpen && (
                                        <Card className='card-box-border'>
                                            <Table striped className='main-table'>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: "50%" }}>
                                                            Webhook URL
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                placeholder='xyz.com'
                                                                className="input_field-Prof"
                                                                style={{
                                                                    border: "1px solid #d3d1d1",
                                                                    borderRadius: "5px",
                                                                    padding: "0 5px"
                                                                }}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Webhook Authorization Header
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                placeholder='Enter text'
                                                                className="input_field-Prof"
                                                                style={{
                                                                    border: "1px solid #d3d1d1",
                                                                    borderRadius: "5px",
                                                                    padding: "0 5px"
                                                                }}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Recieved webhooks on Incoming messages
                                                        </td>
                                                        <td>
                                                            <div className="form-check form-switch custom-switch">
                                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Recieved webhooks on from sent status
                                                        </td>
                                                        <td>
                                                            <div className="form-check form-switch custom-switch">
                                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Recieved webhooks on from sent status
                                                        </td>
                                                        <td>
                                                            <div className="form-check form-switch custom-switch">
                                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Card>
                                    )}
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div >
        </>
    )
}

export default InstancePage
