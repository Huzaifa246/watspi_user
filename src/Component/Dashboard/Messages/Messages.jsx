import React from 'react'
import { Card, Button, Table } from 'react-bootstrap';
import "./messages.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCog, faChartBar, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

function Messages() {
    return (
        <>
            {/* main-card */}
            <Card className='card-msg-border'>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: "10px 0" }}>
                    <h4 style={{ fontWeight: "600" }}>
                        WhatsApp Numbers
                    </h4>
                    <Button style={{ backgroundColor: "#44acf6" }}>
                        Add Number
                    </Button>
                </div>
                <Card>
                    <div className='main-msg'>
                        <div className='Main-Profile-flex'>
                            <div className='Profile-style'>
                                <img src="data:image/png;base64,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" alt=""
                                    className='image-style'
                                />
                                <div className='Profile-flex'>
                                    <span style={{ fontWeight: "600" }}>
                                        Jenny USA
                                    </span>
                                    <span>
                                        +098765432
                                    </span>
                                    <span className='connected-badge'>
                                        Connected
                                    </span>
                                </div>
                            </div>
                            <div className='main-status'>
                                <div className='main-status-col'>
                                    <span className='font-style-status'>
                                        2
                                    </span>
                                    <span>
                                        pending Chats
                                    </span>
                                </div>
                                <div className='main-status-col'>
                                    <span className='font-style-status'>
                                        999
                                    </span>
                                    <span>
                                        Groups
                                    </span>
                                </div>
                                <div className='main-status-col'>
                                    <span className='font-style-status'>
                                        100
                                    </span>
                                    <span>
                                        Contacts
                                    </span>
                                </div>
                                <div className='main-status-col'>
                                    <span className='font-style-status'>
                                        10
                                    </span>
                                    <span>
                                        Active Chats
                                    </span>
                                </div>
                            </div>
                            <div className='icon-style-flex'>
                                <FontAwesomeIcon icon={faEnvelope} className='pd-lr-10' /> {/* Message icon */}
                                <FontAwesomeIcon icon={faCog} className='pd-lr-10' /> {/* Settings icon */}
                                <FontAwesomeIcon icon={faChartBar} className='pd-lr-10' />
                            </div>
                        </div>
                    </div>
                </Card>
            </Card>
            <Card style={{ marginTop: "20px" }}>
                <div className='Main-Msgs'>
                    <h4>
                        Messages
                    </h4>
                    <div>
                        <Button style={{ backgroundColor: "#ffffff", color: 'black', margin: "0 10px" }}>
                            Filter
                        </Button>
                        <Button style={{ backgroundColor: "#44acf6" }}>
                            Add Number
                        </Button>
                    </div>
                </div>
                <div>
                    <Table striped className='main-table'>
                        <thead className='table-heading-style'>
                            <tr>
                                <th>
                                    Whatsapp
                                </th>
                                <th>
                                    Target
                                </th>
                                <th>
                                    Status
                                </th>
                                <th>
                                    Author
                                </th>
                                <th>
                                    Message
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Jenny USA
                                </td>
                                <td>
                                    +09876543
                                </td>
                                <td>
                                    Hour Ago
                                </td>
                                <td>
                                    xyz
                                </td>
                                <td style={{ display: 'flex', justifyContent: 'space-between'}}>
                                    Choose option
                                    <span>
                                        <FontAwesomeIcon icon={faEllipsisV} />
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Jenny USA
                                </td>
                                <td>
                                    +09876543
                                </td>
                                <td>
                                    Hour Ago
                                </td>
                                <td>
                                    xyz
                                </td>
                                <td style={{ display: 'flex', justifyContent: 'space-between'}}>
                                    Choose option
                                    <span>
                                        <FontAwesomeIcon icon={faEllipsisV} />
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Jenny USA
                                </td>
                                <td>
                                    +09876543
                                </td>
                                <td>
                                    Hour Ago
                                </td>
                                <td>
                                    xyz
                                </td>
                                <td style={{ display: 'flex', justifyContent: 'space-between'}}>
                                    Choose option
                                    <span>
                                        <FontAwesomeIcon icon={faEllipsisV} />
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </Card>
        </>
    )
}

export default Messages
