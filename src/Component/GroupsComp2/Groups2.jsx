import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import './groups2.css';
import { FaSearch } from 'react-icons/fa';
import Sidebar2 from '../Dashboard2/Sidebar/Sidebar2';
import bgImg1 from "../../../images/bg-img1.jpg";

function Groups2() {

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
                    <Col sm="12" md="11" lg="11" xl="11" xxl="11" className='Backdrop-myContact2'>
                        <div>
                            <Row className='mob-row width-100' style={{ marginBottom: '20px', marginLeft: '10px', width: "99%" }}>
                                <Col>
                                    <div className='card-drop-style'>
                                        <h1 style={{ padding: '10px', paddingTop: '20px', fontWeight: '600', color: 'white' }}>
                                            Groups
                                        </h1>
                                        <span className='creategrp-mob-display'>
                                            <a href="/creategroup2">
                                                <button
                                                    type='button'
                                                    className='grps2-btn'
                                                >
                                                    Create Group
                                                </button>
                                            </a>
                                        </span>
                                    </div>
                                    <form>
                                        <Row>
                                            <Col>
                                                <div className='gps-form-input'>
                                                    <div className='sr-flex'>
                                                        <div className="search-groups2">
                                                            <FaSearch className="search-icon2" />
                                                            <input
                                                                type="text"
                                                                placeholder="Search..."
                                                                className='grp-input-search2'
                                                            />
                                                        </div>
                                                        <span className='creategrp-mob-hide'>
                                                            <a href="/creategroup2">
                                                                <button
                                                                    type='button'
                                                                    className='grps2-btn'
                                                                >
                                                                    Create Group
                                                                </button>
                                                            </a>
                                                        </span>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </form>
                                </Col>
                            </Row>
                            <Row className='mob-row width-100' style={{ marginBottom: '20px', marginLeft: '10px', width: "99%" }}>
                                <Col>
                                    <thead style={{ marginBottom: "0", tableLayout: "fixed" }}>
                                        <tr style={{ color: "white" }} className='head-gp-tr'>
                                            <th className='td-Sno'>No</th>
                                            <th>Name</th>
                                            <th>Contacts</th>
                                            <th style={{ width: "30%" }}>Description</th>
                                        </tr>
                                    </thead>
                                </Col>
                            </Row>
                            <Row className='mob-row width-100' style={{ marginBottom: '20px', marginLeft: '10px', width: "99%" }}>
                                <Col>
                                    <tbody style={{ marginBottom: "0", tableLayout: "fixed" }}>
                                        <tr className='body-gp-tr'>
                                            <td className='td-Sno'>1</td>
                                            <td>Huzaifa Rehman</td>
                                            <td>+920987654</td>
                                            <td style={{ width: "30%" }}>Lorem ipsum dolor sit amet consectetur.</td>
                                        </tr>
                                    </tbody>
                                    <tbody style={{ marginBottom: "0", tableLayout: "fixed" }}>
                                        <tr className='body-gp-tr'>
                                            <td className='td-Sno'>1</td>
                                            <td>Huzaifa Rehman</td>
                                            <td>+920987654</td>
                                            <td style={{ width: "30%" }}>Lorem ipsum dolor sit amet consectetur.</td>
                                        </tr>
                                    </tbody>
                                    <tbody style={{ marginBottom: "0", tableLayout: "fixed" }}>
                                        <tr className='body-gp-tr'>
                                            <td className='td-Sno'>1</td>
                                            <td>ALI KHAN</td>
                                            <td>+920987654</td>
                                            <td style={{ width: "30%" }}>Lorem ipsum dolor sit amet consectetur.</td>
                                        </tr>
                                    </tbody>
                                    <tbody style={{ marginBottom: "0", tableLayout: "fixed" }}>
                                        <tr className='body-gp-tr'>
                                            <td className='td-Sno'>1</td>
                                            <td>TOV</td>
                                            <td>+920987654</td>
                                            <td style={{ width: "30%" }}>Lorem ipsum dolor sit amet consectetur.</td>
                                        </tr>
                                    </tbody>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div >

        </>
    )
}

export default Groups2
