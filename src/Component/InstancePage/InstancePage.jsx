import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Card, Col, Row, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faUser, faCog, faBell, faChevronDown, faChevronUp, faPencil, faCheck } from '@fortawesome/free-solid-svg-icons'; // Import the copy icon
import "./Instance.css"

function InstancePage() {
    const isSidebarOpen = useSelector((state) => state.sideBarStore.isSidebarOpen);


    const [isBasicOpen, setIsBasicOpen] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(true);
    const [isWebhooksOpen, setIsWebhooksOpen] = useState(true);
    const [isInputEnabled, setInputEnabled] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleEnableInput = () => {
        setInputEnabled(true);
    };

    const handleSaveInput = () => {
        // You can add your logic to save the input value here
        // For example, you can send it to an API or update your state.
        console.log('Input Value:', inputValue);
        setInputEnabled(false);
    };

    const toggleBasic = () => {
        setIsBasicOpen(!isBasicOpen);
    };
    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    // Function to toggle the visibility of Webhooks content
    const toggleWebhooks = () => {
        setIsWebhooksOpen(!isWebhooksOpen);
    };

    return (
        <>
            {/* <div className={`${!isSidebarOpen ? 'trades-open' : ''}`}> */}
            <div style={{ marginTop: "6rem" }}></div>
            <Row style={{ marginBottom: "20px", marginLeft: "10px", width: "98%" }}>
                <Col sm={12} md={6} lg={6}>
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
                            <Card className='card-box-border' style={{ padding: "15px 0" }}>
                                <form>
                                    <Row>
                                        <Col xs={6} md={6} lg={6}>
                                            <div className='instance-form-input'>
                                                <label> Name </label>
                                                <span>
                                                    <input
                                                        type="text"
                                                        placeholder="Name..."
                                                        className={`input-instance ${isInputEnabled ? '' : 'disabled'}`}
                                                        value={inputValue}
                                                        onChange={(e) => setInputValue(e.target.value)}
                                                        disabled={!isInputEnabled}
                                                    />
                                                    {!isInputEnabled && (
                                                        <FontAwesomeIcon
                                                            icon={faPencil}
                                                            className="left-input-copy"
                                                            onClick={handleEnableInput}
                                                        />
                                                    )}
                                                    {isInputEnabled && (
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                            className="left-input-copy"
                                                            onClick={handleSaveInput}
                                                            style={{ color: "#3ab19d" }}
                                                        />
                                                    )}
                                                </span>
                                            </div>
                                        </Col>

                                        <Col xs={6} md={6} lg={6}>
                                            <div className='instance-form-input'>
                                                <label> Phone </label>
                                                <input type="tel" placeholder="+90123456" className='input-instance' />
                                            </div>
                                        </Col>
                                        <Col xs={6} md={6} lg={6}>
                                            <div className='instance-form-input'>
                                                <label> API URL </label>
                                                <span>
                                                    <input type="text" placeholder="Name..." className='input-instance' />
                                                    <FontAwesomeIcon icon={faCopy} className="left-input-copy" />
                                                </span>
                                            </div>
                                        </Col>

                                        <Col xs={6} md={6} lg={6}>
                                            <div className='instance-form-input'>
                                                <label> Media URL </label>
                                                <span>
                                                    <input type="text" placeholder="+90123456" className='input-instance' />
                                                    <FontAwesomeIcon icon={faCopy} className="right-input-copy" />
                                                </span>
                                            </div>
                                        </Col>
                                        <Col xs={6} md={6} lg={6}>
                                            <div className='instance-form-input'>
                                                <label> Instance ID </label>
                                                <span>
                                                    <input type="text" placeholder="Instance ID" className='input-instance' />
                                                    <FontAwesomeIcon icon={faCopy} className="left-input-copy" />
                                                </span>
                                            </div>
                                        </Col>

                                        <Col xs={6} md={6} lg={6}>
                                            <div className='instance-form-input'>
                                                <label> Instance Token </label>
                                                <span>
                                                    <input type="text" placeholder="0987654321" className='input-instance' />
                                                    <FontAwesomeIcon icon={faCopy} className="right-input-copy" />
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                </form>
                                {/* <Table striped className='main-table'>
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
                                                                <FontAwesomeIcon icon={faCopy} className="fa-thin fa-copy" style={{ color: "#a5a5a5" }} />
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
                                                                <FontAwesomeIcon icon={faCopy} className="fa-thin fa-copy" style={{ color: "#a5a5a5" }} />
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
                                                                <FontAwesomeIcon icon={faCopy} className="fa-thin fa-copy" style={{ color: "#a5a5a5" }} />
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
                                                                <FontAwesomeIcon icon={faCopy} className="fa-thin fa-copy" style={{ color: "#a5a5a5" }} />
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
                                                            <span className='authorized-badge'>
                                                                Authorized
                                                            </span>
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
                                            </Table> */}
                            </Card>
                        )}
                    </Card>
                </Col>
                <Col>
                </Col>
            </Row>
            {/* Settings */}

            <Row style={{ marginBottom: "20px", marginLeft: "10px", width: "98%" }}>
                <Col>
                    <Card className='card-box-border border-shadow-style'>
                        <div className='card-drop-style' onClick={toggleSettings}>
                            <h6 style={{ padding: "10px", paddingTop: "20px", fontWeight: "600" }}>
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
                                            <td style={{ width: "50%" }} className='td-left-ftsize'>
                                                Making Incoming messages read
                                            </td>
                                            <td className='td-fl-center'>
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                </div>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='td-left-ftsize'>
                                                Making Incoming messages read
                                            </td>
                                            <td className='td-fl-center'>
                                                <div className="form-check form-switch custom-switch">
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                </div>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='td-left-ftsize'>
                                                Making sending delay from the queue
                                            </td>
                                            <td className='td-fl-center'>
                                                <input
                                                    type="text"
                                                    className="input_field-Prof IFP-msec"
                                                    value={0}
                                                    style={{
                                                        borderTopRightRadius: "0",
                                                        borderBottomRightRadius: "0",
                                                        borderTopLeftRadius: "5px",
                                                        borderBottomLeftRadius: "5px",
                                                        color: "red"
                                                    }}
                                                />
                                                <button className='msec-btn'>
                                                    msec
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='td-left-ftsize'>
                                                Keep online status
                                            </td>
                                            <td className='td-fl-center'>
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

            <Row style={{ marginBottom: "20px", marginLeft: "10px", width: "98%" }}>
                <Col>
                    <Card className='card-box-border border-shadow-style'>
                        <div className='card-drop-style' onClick={toggleWebhooks}>
                            <h6 style={{ padding: "10px", paddingTop: "20px", fontWeight: "600" }}>
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
                                            <td style={{ width: "50%" }} className='td-left-ftsize'>
                                                Webhook URL
                                            </td>
                                            <td className='td-fl-center'>
                                                <input
                                                    type="text"
                                                    placeholder='xyz.com'
                                                    className="input_field-Prof web-input"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='td-left-ftsize'>
                                                Webhook Authorization Header
                                            </td>
                                            <td className='td-fl-center'>
                                                <input
                                                    type="text"
                                                    placeholder='Enter text'
                                                    className="input_field-Prof web-input"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='td-left-ftsize'>
                                                Recieved webhooks on Incoming messages
                                            </td>
                                            <td className='td-fl-center'>
                                                <div className="form-check form-switch custom-switch">
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='td-left-ftsize'>
                                                Recieved webhooks on from sent status
                                            </td>
                                            <td className='td-fl-center'>
                                                <div className="form-check form-switch custom-switch">
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='td-left-ftsize'>
                                                Recieved webhooks on from sent status
                                            </td>
                                            <td className='td-fl-center'>
                                                <div className="form-check form-switch custom-switch">
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <div>
                                    <Button className='save-btn'>
                                        Save Changes
                                    </Button>
                                    <Button className='cancel-btn'>
                                        Cancel
                                    </Button>
                                </div>
                            </Card>
                        )}
                    </Card>
                </Col>
            </Row>
            {/* </div > */}
        </>
    )
}

export default InstancePage
