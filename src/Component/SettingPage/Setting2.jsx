import React, { useState } from 'react';
import "./setting2.css";
import { Card, Col, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faChevronDown, faUnlock, faBell, faFileInvoiceDollar, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import bgImg1 from "../../../images/bg-img1.jpg";
import Sidebar2 from '../Dashboard2/Sidebar/Sidebar2';

function Setting2() {

    const isSidebarOpen = useSelector((state) => state.sideBarStore.isSidebarOpen);

    const [isCardOpen, setIsCardOpen] = useState(false);
    const [isPassOpen, setIsPassOpen] = useState(false);
    const [isNotifyOpen, setIsNotifyOpen] = useState(false);
    const [isPayOpen, setIsPayOpen] = useState(false);
    const [isSubscibeOpen, setIsSubscibeOpen] = useState(false);

    // TOGGLES
    const toggleSubscibe = () => {
        setIsSubscibeOpen(!isSubscibeOpen);
    };
    const togglePayCard = () => {
        setIsPayOpen(!isPayOpen);
    };
    const toggleNotify = () => {
        setIsNotifyOpen(!isNotifyOpen);
    };

    const togglePass = () => {
        setIsPassOpen(!isPassOpen);
    };
    const toggleCard = () => {
        setIsCardOpen(!isCardOpen);
    };
    return (
        <>
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
                        <div>
                            <div className='set-main'>
                                <h2 className='sett-pad-20px' style={{color: 'white'}}>
                                    General Settings
                                </h2>
                                <div className='sett-pad-20px scroll-setting2'>
                                    <Row>
                                        <Col md={12} lg={12} className='backdrop-filter'>
                                            <div className={`main-sett-style ${isCardOpen ? 'card-open' : ''}`} onClick={toggleCard}>
                                                <div className='frst-div'>
                                                    <FontAwesomeIcon icon={faCog}
                                                        className='color-icon-white sett-icon'
                                                    />
                                                </div>
                                                <div>
                                                    <h6
                                                        className='color-h6-white'
                                                    >
                                                        Account
                                                    </h6>
                                                    <p className='color-white'>
                                                        Manage Your Account
                                                    </p>
                                                </div>
                                                <div className='down-icon'>
                                                    {isCardOpen && <FontAwesomeIcon icon={faChevronDown} />}
                                                </div>
                                            </div>
                                            {isCardOpen && (
                                                <div className='below-container'>
                                                    <div className='card-below-body'>
                                                        <form>
                                                            <Row>
                                                                <Col xs={12} md={12} lg={6}>
                                                                    <div className='acc-form-input'>
                                                                        <label> Name </label>
                                                                        <input type="text" placeholder="Name..." className='input-field-setting2' />
                                                                    </div>
                                                                </Col>

                                                                <Col xs={12} md={12} lg={6}>
                                                                    <div className='acc-form-input'>
                                                                        <label> Email </label>
                                                                        <input type="email" placeholder="xyz@gmail.com" className='input-field-setting2' />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs={12} md={12} lg={6}>
                                                                    <div className='acc-form-input'>
                                                                        <label> City </label>
                                                                        <input type="text" placeholder="Karachi" className='input-field-setting2' />
                                                                    </div>
                                                                </Col>

                                                                <Col xs={12} md={12} lg={6}>
                                                                    <div className='acc-form-input'>
                                                                        <label> Country </label>
                                                                        <input type="email" placeholder="Pakistan" className='input-field-setting2' />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <div className='btn-style-end'>
                                                                <Button className='Update-btn'>
                                                                    Save Changes
                                                                </Button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            )}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} lg={12} className='backdrop-filter'>
                                            <div className={`main-sett-style ${isPassOpen ? 'card-open' : ''}`} onClick={togglePass}>
                                                <div className='frst-div'>
                                                    <FontAwesomeIcon icon={faUnlock}
                                                        className='color-icon-white sett-icon'
                                                    />
                                                </div>
                                                <div>
                                                    <h6
                                                        className='color-h6-white'
                                                    >
                                                        Password
                                                    </h6>
                                                    <p className='color-white'>
                                                        Change Your Access Password
                                                    </p>
                                                </div>
                                                <div className='down-icon'>
                                                    {isPassOpen && <FontAwesomeIcon icon={faChevronDown} />}
                                                </div>
                                            </div>
                                            {isPassOpen && (
                                                <div className='below-container'>
                                                    <div className='card-below-body'>
                                                        <form>
                                                            <Row>
                                                                <Col xs={12} md={12} lg={12}>
                                                                    <div className='acc-form-input'>
                                                                        <label> Current Password </label>
                                                                        <input type="password" placeholder="Name..." className='input-field-setting2 cur-pass'
                                                                            style={{ width: "49%" }}
                                                                        />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <div className='acc-form-main'>
                                                                    <Col xs={12} md={6} lg={6}>
                                                                        <div className='acc-form-input'>
                                                                            <label> New Password </label>
                                                                            <input type="password" placeholder="Karachi" className='input-field-setting2' />
                                                                        </div>
                                                                    </Col>

                                                                    <Col xs={12} md={6} lg={6}>
                                                                        <div className='acc-form-input'>
                                                                            <label> Confirm Password </label>
                                                                            <input type="password" placeholder="Pakistan" className='input-field-setting2' />
                                                                        </div>
                                                                    </Col>
                                                                </div>
                                                            </Row>
                                                            <div className='btn-style-end'>
                                                                <Button className='Update-btn'>
                                                                    Update Password
                                                                </Button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            )}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} lg={12} className='backdrop-filter'>
                                            <div className={`main-sett-style ${isNotifyOpen ? 'card-open' : ''}`} onClick={toggleNotify}>
                                                <div className='frst-div'>
                                                    <FontAwesomeIcon icon={faBell}
                                                        className='color-icon-white sett-icon'
                                                    />
                                                </div>
                                                <div>
                                                    <h6
                                                        className='color-h6-white'
                                                    >
                                                        Notification
                                                    </h6>
                                                    <p className='color-white'>
                                                        Manage Your Notification of account
                                                    </p>
                                                </div>
                                                <div className='down-icon'>
                                                    {isNotifyOpen && <FontAwesomeIcon icon={faChevronDown} />}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={12} lg={12} className='backdrop-filter'>
                                            <div className={`main-sett-style ${isPayOpen ? 'card-open' : ''}`} onClick={togglePayCard}>
                                                <div className='frst-div'>
                                                    <FontAwesomeIcon icon={faFileInvoiceDollar}
                                                        className='color-icon-white sett-icon'
                                                    />
                                                </div>
                                                <div>
                                                    <h6
                                                        className='color-h6-white'
                                                    >
                                                        Payment Cards & Billings
                                                    </h6>
                                                    <p className='color-white'>
                                                        Manage Your Payment cards and check your account
                                                    </p>
                                                </div>
                                                <div className='down-icon'>
                                                    {isPayOpen &&
                                                        <div className='invoice-Addnew-main'>
                                                            <Button className='invoice-btn'>
                                                                Invoices
                                                            </Button>
                                                            <Button className='Add-new-btn'>
                                                                Add new Card
                                                            </Button>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                {isPayOpen && (
                                                    <div style={{ padding: "10px" }}>
                                                        <form id='form-file-upload'>
                                                            <label id="label-file-upload2" for="input-file-upload">
                                                                <div>
                                                                    <h6>Add Card Payment</h6>
                                                                    <p style={{ padding: "10px 0" }}>You have no payments cards yet. Click on the button below to add the first one.</p>
                                                                    <Button className='Add-new-btn'>
                                                                        Add new Card
                                                                    </Button>
                                                                </div>
                                                            </label>
                                                        </form>
                                                    </div>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} lg={12} className='backdrop-filter'>
                                            <div className={`main-sett-style ${isSubscibeOpen ? 'card-open' : ''}`} onClick={toggleSubscibe}>
                                                <div className='frst-div'>
                                                    <FontAwesomeIcon icon={faMobileAlt}
                                                        className='color-icon-white sett-icon'
                                                    />
                                                </div>
                                                <div>
                                                    <h6
                                                        className='color-h6-white'
                                                    >
                                                        Subscriptions
                                                    </h6>
                                                    <p className='color-white'>
                                                        Manage Your Monthly account subsriptions
                                                    </p>
                                                </div>
                                                <div className='down-icon'>
                                                    {isSubscibeOpen && <FontAwesomeIcon icon={faChevronDown} />}
                                                </div>
                                            </div>
                                            <div>
                                                {isSubscibeOpen && (
                                                    <div style={{ padding: "10px" }}>
                                                        <form id='form-file-upload'>
                                                            <label id="label-file-upload2" for="input-file-upload">
                                                                <div>
                                                                    <h6>Add Card Payment For Subscription</h6>
                                                                    <p style={{ padding: "10px 0" }}>You have no payments cards yet. Click on the button below to add the first one.</p>
                                                                    <Button className='Add-new-btn'>
                                                                        Add new Card
                                                                    </Button>
                                                                </div>
                                                            </label>
                                                        </form>
                                                    </div>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Setting2
