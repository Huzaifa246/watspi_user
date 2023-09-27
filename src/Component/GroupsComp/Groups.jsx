import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row, Table } from 'react-bootstrap';
import './groups.css';
import { FaSearch } from 'react-icons/fa';

function Groups() {
    const isSidebarOpen = useSelector((state) => state.sideBarStore.isSidebarOpen);

    return (
        <>
            <div className={`${!isSidebarOpen ? 'trades-open' : ''}`}>
                <div style={{ marginTop: '6rem' }}></div>
                <Row style={{ marginBottom: '20px', marginLeft: '10px',  width: "98.5%" }}>
                    <Col>
                        <div className='card-drop-style'>
                            <h1 style={{ padding: '10px', paddingTop: '20px', fontWeight: '600' }}>
                                Groups
                            </h1>
                        </div>
                        <Card className='card-box-border my-Context-style'>
                            <Card className='card-box-border'>
                                <form>
                                    <Row>
                                        <Col>
                                            <div className='My-form-input'>
                                                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                                   
                                                </div>
                                                <div style={{ display: 'flex' }}>
                                                    <div className="search-container">
                                                        <FaSearch className="search-icon" />
                                                        <input
                                                            type="text"
                                                            placeholder="Search..."
                                                            className='input-search'
                                                        />
                                                    </div>
                                                    <a href="/creategroup">
                                                        <button
                                                            type='button'
                                                            className='myexecl-btn'
                                                        >
                                                            Create Group
                                                        </button>
                                                    </a>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </form>
                            </Card>
                        </Card>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '20px', marginLeft: '10px',  width: "98.5%" }}>
                    <Col>
                        <Card className='card-box-border border-shadow-style style-myContactCard'>
                            <Table style={{ marginBottom: "0", tableLayout: "fixed" }}>
                                <thead>
                                    <tr style={{ color: "#888" }}>
                                        <th>S.No</th>
                                        <th>Date</th>
                                        <th>Name</th>
                                        <th>No of Contacts</th>
                                        <th style={{ width: "30%" }}>Description</th>
                                    </tr>
                                </thead>
                            </Table>
                        </Card>
                        <Card className='card-box-border border-shadow-style tbody-style-card'>
                            <Table style={{ marginBottom: "0", tableLayout: "fixed" }}>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>27-09-2023</td>
                                        <td>Huzaifa Rehman</td>
                                        <td>+920987654</td>
                                        <td style={{ width: "30%" }}>Lorem ipsum dolor sit amet consectetur.</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                        <Card className='card-box-border border-shadow-style tbody-style-card'>
                            <Table style={{ marginBottom: "0", tableLayout: "fixed" }}>
                                <tbody>
                                    <tr>
                                        <td>2</td>
                                        <td>27-09-2023</td>
                                        <td>Ali</td>
                                        <td>+921234567</td>
                                        <td style={{ width: "30%" }}>Lorem ipsum dolor sit amet consectetur.</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Groups
