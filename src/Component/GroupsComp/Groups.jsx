import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row, Table } from 'react-bootstrap';
import './groups.css';
import { FaSearch } from 'react-icons/fa';

function Groups() {
    const isSidebarOpen = useSelector((state) => state.sideBarStore.isSidebarOpen);

    return (
        <>
            {/* <div className={`${!isSidebarOpen ? 'trades-open' : ''}`}> */}
            <div style={{ marginTop: '6rem' }}></div>
            <Row className='mob-row' style={{ marginBottom: '20px', marginLeft: '10px', width: "99%" }}>
                <Col>
                    <div className='card-drop-style'>
                        <h1 style={{ padding: '10px', paddingTop: '20px', fontWeight: '600' }}>
                            Groups
                        </h1>
                    </div>
                    <Card className='card-box-border Grps-style'>
                        <Card className='card-box-border'>
                            <form>
                                <Row>
                                    <Col>
                                        <div className='My-form-input'>
                                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>

                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <div className="search-groups">
                                                    <FaSearch className="search-icon" />
                                                    <input
                                                        type="text"
                                                        placeholder="Search..."
                                                        className='grp-input-search'
                                                    />
                                                </div>
                                                <a href="/creategroup">
                                                    <button
                                                        type='button'
                                                        className='grps-btn'
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
            <Row className='mob-row' style={{ marginBottom: '20px', marginLeft: '10px', width: "99%" }}>
                <Col>
                    <Card className='card-box-border border-shadow-style style-myContactCard'>
                        <Table style={{ marginBottom: "0", tableLayout: "fixed" }}>
                            <thead>
                                <tr style={{ color: "#888" }} className='head-gp-tr'>
                                    <th className='td-Sno'>No</th>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Contacts</th>
                                    <th style={{ width: "30%" }}>Description</th>
                                </tr>
                            </thead>
                        </Table>
                    </Card>
                </Col>
            </Row>
            <Row  className='mob-row' style={{ marginBottom: '20px', marginLeft: '10px', width: "99%" }}>
                <Col>
                    <Card className='card-box-border border-shadow-style tbody-style-card'>
                        <Table style={{ marginBottom: "0", tableLayout: "fixed" }}>
                            <tbody>
                                <tr className='body-gp-tr'>
                                    <td className='td-Sno'>1</td>
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
                                <tr className='body-gp-tr'>
                                    <td className='td-Sno'>2</td>
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
            {/* </div> */}
        </>
    )
}

export default Groups
