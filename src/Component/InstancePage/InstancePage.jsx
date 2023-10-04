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
    const [inputValue, setInputValue] = useState('Smith');

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
            <div className={`${!isSidebarOpen ? 'trades-open' : ''}`}>
                <div style={{ marginTop: "6rem" }}></div>
                <Row className='row-instance'>
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
                                            <Col xs={12} md={6} lg={6}>
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
                                                                className="left-input-copy left-copy-mob"
                                                                onClick={handleEnableInput}
                                                            />
                                                        )}
                                                        {isInputEnabled && (
                                                            <FontAwesomeIcon
                                                                icon={faCheck}
                                                                className="left-input-copy left-copy-mob"
                                                                onClick={handleSaveInput}
                                                                style={{ color: "#3ab19d" }}
                                                            />
                                                        )}
                                                    </span>
                                                </div>
                                            </Col>

                                            <Col xs={12} md={6} lg={6}>
                                                <div className='instance-form-input'>
                                                    <label> Phone </label>
                                                    <input type="tel" placeholder="+90123456" className='input-instance' />
                                                </div>
                                            </Col>
                                            <Col xs={12} md={6} lg={6}>
                                                <div className='instance-form-input'>
                                                    <label> API URL </label>
                                                    <span>
                                                        <input type="text" placeholder="Name..." className='input-instance' />
                                                        <FontAwesomeIcon icon={faCopy} className="left-input-copy left-copy-mob" />
                                                    </span>
                                                </div>
                                            </Col>

                                            <Col xs={12} md={6} lg={6}>
                                                <div className='instance-form-input'>
                                                    <label> Media URL </label>
                                                    <span>
                                                        <input type="text" placeholder="+90123456" className='input-instance' />
                                                        <FontAwesomeIcon icon={faCopy} className="right-input-copy" />
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col xs={12} md={6} lg={6}>
                                                <div className='instance-form-input'>
                                                    <label> Instance ID </label>
                                                    <span>
                                                        <input type="text" placeholder="Instance ID" className='input-instance' />
                                                        <FontAwesomeIcon icon={faCopy} className="left-input-copy left-copy-mob" />
                                                    </span>
                                                </div>
                                            </Col>

                                            <Col xs={12} md={6} lg={6}>
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
                                </Card>
                            )}
                        </Card>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                {/* Settings */}

                <Row className='row-instance'>
                    <Col sm={12} md={6} lg={6}>
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
                                                <td className="td-left-ftsize width-70per" style={{ width: "50%" }}>
                                                    Making Incoming messages read
                                                </td>
                                                <td className='td-fl-center'>
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" defaultChecked />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="td-left-ftsize width-70per">
                                                    Making Incoming messages read on replay
                                                </td>
                                                <td className='td-fl-center'>
                                                    <div className="form-check form-switch custom-switch">
                                                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                    </div>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="td-left-ftsize width-70per">
                                                    SendMessages delay
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
                                                        ms
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="td-left-ftsize width-70per">
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
                    {/* Webhooks */}
                    <Col sm={12} md={6} lg={6}>
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
                                    <Row>
                                        <Col xs={12} md={12} lg={12}>
                                            <div className='instance-form-input' style={{ padding: "5px 0" }}>
                                                <label className='label-webhook'> Webhook URL </label>
                                                <span>
                                                    <input type="text" placeholder="Webhook URL..." className='input-instance' />
                                                    <FontAwesomeIcon icon={faCopy} className="right-input-copy left-copy-wb-mob" style={{ right: "30px" }} />
                                                </span>
                                            </div>
                                        </Col>
                                        <Col xs={12} md={12} lg={12}>
                                            <div className='instance-form-input' style={{ padding: "5px 0" }}>
                                                <label className='label-webhook'>Webhook Url Token </label>
                                                <span>
                                                    <input type="text" placeholder="Webhook Url Token..." className='input-instance' />
                                                    <FontAwesomeIcon icon={faCopy} className="right-input-copy right-wb-mob" style={{ right: "30px" }} />
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Table striped className='main-table'>
                                        <tbody>
                                            <tr>
                                                <td className="td-left-ftsize width-70per">
                                                    Recieved webhooks on Incoming messages
                                                </td>
                                                <td className='td-fl-center'>
                                                    <div className="form-check form-switch custom-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked/>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="td-left-ftsize width-70per">
                                                    Outgoing API Message Webhook
                                                </td>
                                                <td className='td-fl-center'>
                                                    <div className="form-check form-switch custom-switch">
                                                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" defaultChecked />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="td-left-ftsize width-70per">
                                                    Outgoing Webhook
                                                </td>
                                                <td className='td-fl-center'>
                                                    <div className="form-check form-switch custom-switch">
                                                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" defaultChecked />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="td-left-ftsize width-70per">
                                                    Device Webhook
                                                </td>
                                                <td className='td-fl-center'>
                                                    <div className="form-check form-switch custom-switch">
                                                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="td-left-ftsize width-70per">
                                                    State Webhook
                                                </td>
                                                <td className='td-fl-center'>
                                                    <div className="form-check form-switch custom-switch">
                                                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="td-left-ftsize width-70per">
                                                    Outgoing Webhook
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
            </div >
        </>
    )
}

export default InstancePage
