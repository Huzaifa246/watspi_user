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
                <Row style={{padding: "4vh 3vh"}}>
                    <Col lg="2" xl="2" xxl="2">
                        <Sidebar2 />
                    </Col>
                    <Col md="6" lg="6" xl="6" xxl="6">
                        <DashBoardComponent />
                    </Col>
                    <Col md="6" lg="4" xl="4" xxl="4">
                        <MainInstance />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Dashboard2
