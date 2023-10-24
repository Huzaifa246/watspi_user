import React from 'react'
import { Row, Col } from 'react-bootstrap';
import Sidebar2 from './Sidebar/Sidebar2';
import DashBoardComponent from './DashComponent/DashBoardComponent';
import MainInstance from './MainInstanceComp/MainInstance';

function Dashboard2() {
    return (
        <>
            <div style={{
                backgroundImage: `url("https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
                objectFit: 'cover',
                height: "100vh",
                width: "100%",
                overflow: 'hidden',
                backgroundRepeat: 'no-repeat'
            }}>
                <Row style={{padding: "3vh"}}>
                    <Col lg="1" xl="1" xxl="1">
                        <Sidebar2 />
                    </Col>
                    <Col md="7" lg="7" xl="7" xxl="7">
                        <DashBoardComponent />
                    </Col>
                    <Col md="4" lg="4" xl="4" xxl="4">
                        <MainInstance />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Dashboard2
