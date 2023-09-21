import React, { useState } from 'react';
import "./setting.css";
import { Card, Col, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faChevronDown, faLock, faBell, faCreditCard, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";

function Setting() {

  const isSidebarOpen = useSelector((state) => state.sideBarStore.isSidebarOpen);

  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isSubscibeOpen, setIsSubscibeOpen] = useState(false);

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
      <div className={`main-table-class ${!isSidebarOpen ? 'trades-open' : ''}`}>
        <div style={{ marginTop: "6rem" }}></div>
        <div className='main-setting'>
          <div style={{ padding: "25px", backgroundColor: "#f6f7fb" }}>
            <h1 className='sett-pad-20px color-grey'>
              General Settings
            </h1>
            <div className='sett-pad-20px'>
              <Row>
                <Col md={12} lg={12}>
                  <Card className={`mr-tb-10px col-style card-box-border ${isCardOpen ? 'card-open' : ''}`}>
                    <div className='main-sett-style' onClick={toggleCard}>
                      <div className='frst-div'>
                        <FontAwesomeIcon icon={faCog} style={{
                          fontSize: "3vh"
                        }}
                          className='color-icon-grey'
                        />
                      </div>
                      <div>
                        <h6 style={{
                          fontSize: "2.5vh", fontWeight: "600", color: "#666767"
                        }}
                          className='color-h6-grey'
                        >
                          Account
                        </h6>
                        <p className='color-grey'>
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
                            <div className='acc-form-main'>
                              <Row>
                                <Col xs={12} md={6} lg={12}>
                                  <div className='acc-form-input'>
                                    <label> Name </label>
                                    <input type="text" placeholder="Name..." className='input-field-setting' />
                                  </div>
                                </Col>

                                <Col xs={12} md={6} lg={12}>
                                  <div className='acc-form-input'>
                                    <label> Email </label>
                                    <input type="email" placeholder="xyz@gmail.com" className='input-field-setting' />
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={12} md={6} lg={12}>
                                  <div className='acc-form-input'>
                                    <label> City </label>
                                    <input type="text" placeholder="Karachi" className='input-field-setting' />
                                  </div>
                                </Col>

                                <Col xs={12} md={6} lg={12}>
                                  <div className='acc-form-input'>
                                    <label> Country </label>
                                    <input type="email" placeholder="Pakistan" className='input-field-setting' />
                                  </div>
                                </Col>
                              </Row>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <Button className='Update-btn'>
                                Save Changes
                              </Button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={12} lg={12}>
                  <Card className={`mr-tb-10px col-style card-box-border ${isPassOpen ? 'card-open' : ''}`}>
                    <div className='main-sett-style' onClick={togglePass}>
                      <div className='frst-div'>
                        <FontAwesomeIcon icon={faLock} style={{ fontSize: "3vh" }} className='color-icon-grey' />
                      </div>
                      <div>
                        <h6 style={{
                          fontSize: "2.5vh", fontWeight: "600"
                        }}
                          className='color-h6-grey'
                        >
                          Password
                        </h6>
                        <p className='color-grey'>
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
                                  <input type="password" placeholder="Name..." className='input-field-setting'
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
                                    <input type="password" placeholder="Karachi" className='input-field-setting' />
                                  </div>
                                </Col>

                                <Col xs={12} md={6} lg={6}>
                                  <div className='acc-form-input'>
                                    <label> Confirm Password </label>
                                    <input type="password" placeholder="Pakistan" className='input-field-setting' />
                                  </div>
                                </Col>
                              </div>
                            </Row>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <Button className='Update-btn'>
                                Update Password
                              </Button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={12} lg={12}>
                  <Card className={`mr-tb-10px col-style card-box-border ${isNotifyOpen ? 'card-open' : ''}`}>
                    <div className='main-sett-style' onClick={toggleNotify}>
                      <div className='frst-div'>
                        <FontAwesomeIcon icon={faBell} style={{ fontSize: "3vh" }} className='color-icon-grey' />
                      </div>
                      <div>
                        <h6 style={{
                          fontSize: "2.5vh", fontWeight: "600"
                        }}
                          className='color-h6-grey'
                        >
                          Notification
                        </h6>
                        <p>
                          Manage Your Notification of account
                        </p>
                      </div>
                      <div className='down-icon'>
                        {isNotifyOpen && <FontAwesomeIcon icon={faChevronDown} />}
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col md={12} lg={12}>
                  <Card className={`mr-tb-10px col-style card-box-border ${isPayOpen ? 'card-open' : ''}`}>
                    <div className='main-sett-style' onClick={togglePayCard}>
                      <div className='frst-div'>
                        <FontAwesomeIcon icon={faCreditCard} style={{ fontSize: "3vh" }} className='color-icon-grey' />
                      </div>
                      <div>
                        <h6 style={{
                          fontSize: "2.5vh", fontWeight: "600"
                        }}
                          className='color-h6-grey'
                        >
                          Payment Cards & Billings
                        </h6>
                        <p className='color-grey'>
                          Manage Your Payment cards and check your account
                        </p>
                      </div>
                      <div className='down-icon'>
                        {isPayOpen &&
                          <div>
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
                            <label id="label-file-upload" for="input-file-upload">
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
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={12} lg={12}>
                  <Card className={`mr-tb-10px col-style card-box-border ${isSubscibeOpen ? 'card-open' : ''}`}>
                    <div className='main-sett-style' onClick={toggleSubscibe}>
                      <div className='frst-div'>
                        <FontAwesomeIcon icon={faListAlt} style={{ fontSize: "3vh" }} className='color-icon-grey' />
                      </div>
                      <div>
                        <h6 style={{
                          fontSize: "2.5vh", fontWeight: "600"
                        }}
                          className='color-h6-grey'
                        >
                          Subscriptions
                        </h6>
                        <p className='color-grey'>
                          Manage Your Monthly account subsriptions
                        </p>
                      </div>
                      <div className='down-icon'>
                        {isSubscibeOpen && <FontAwesomeIcon icon={faChevronDown} />}
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Setting
