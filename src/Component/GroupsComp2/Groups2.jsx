import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import './groups2.css';
import { FaSearch } from 'react-icons/fa';
import Sidebar2 from '../Dashboard2/Sidebar/Sidebar2';
import bgImg1 from "../../../images/bg-img1.jpg";

function Groups2() {
    const data = [
        {
            sno: 1,
            name: 'Huzaifa Rehman',
            phone: '+920987654',
            description: 'Lorem ipsum dolor sit amet consectetur.',
        },
        {
            sno: 2,
            name: 'Huzaifa Rehman',
            phone: '+920987654',
            description: 'Lorem ipsum dolor sit amet consectetur.',
        },
        {
            sno: 3,
            name: 'ALI KHAN',
            phone: '+920987654',
            description: 'Lorem ipsum dolor sit amet consectetur.',
        },
        {
            sno: 4,
            name: 'TOV',
            phone: '+920987654',
            description: 'Lorem ipsum dolor sit amet consectetur.',
        },
        {
            sno: 5,
            name: 'John Doe',
            phone: '+123456789',
            description: 'Lorem ipsum dolor sit amet consectetur.',
        },
        {
            sno: 6,
            name: 'Jane Smith',
            phone: '+987654321',
            description: 'Lorem ipsum dolor sit amet consectetur.',
        },
    ];
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
                                    <div className='group2_head_main'>
                                        <h1 style={{ padding: '10px', paddingTop: '20px', fontWeight: '600', color: 'white' }}>
                                            Groups
                                        </h1>
                                        <span style={{ display: 'flex' }}>
                                            <span className="search-groups2">
                                                <FaSearch className="search-icon2" />
                                                <input
                                                    type="text"
                                                    placeholder="Search..."
                                                    className='grp-input-search2'
                                                />
                                            </span>
                                            <span>
                                                <a href="/creategroup2">
                                                    <button
                                                        type='button'
                                                        className='grps2-btn'
                                                    >
                                                        Create Group
                                                    </button>
                                                </a>
                                            </span>
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='mob-row width-100' style={{ marginBottom: '20px', marginLeft: '10px', width: "99%" }}>
                                <Col>
                                    <div className="groups_2_maincontainer">
                                        <thead style={{ marginBottom: "0", tableLayout: "fixed" }}>
                                            <tr style={{ color: "white" }} className='head-gp-tr'>
                                                <th className='td-Sno'>No</th>
                                                <th>Name</th>
                                                <th>Contacts</th>
                                                <th style={{ width: "30%" }}>Description</th>
                                            </tr>
                                        </thead>
                                        <div className="groups_2-container">
                                            <table className='groups_2_table'>
                                                {data?.map((item, index) => (
                                                    <tbody key={index} style={{ marginBottom: "0", tableLayout: "fixed" }}>
                                                        <tr className='body-gp-tr'>
                                                            <td className='td-Sno'>{item?.sno}</td>
                                                            <td>{item?.name}</td>
                                                            <td>{item?.phone}</td>
                                                            <td style={{ width: "30%" }}>{item?.description}</td>
                                                        </tr>
                                                    </tbody>
                                                ))}
                                            </table>
                                        </div>
                                    </div>
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
