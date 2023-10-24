import React from 'react'
import { Row, Col } from 'react-bootstrap';
import Sidebar2 from './Sidebar/Sidebar2';
import DashBoardComponent from './DashComponent/DashBoardComponent';
import MainInstance from './MainInstanceComp/MainInstance';
import bgImg from "../../../images/bg-img.jpg";

function Dashboard2() {
    return (
        <>
            <div style={{
                backgroundImage: `url(${bgImg})`,
                width: "100%",
                height: "100vh",
                overflow: 'hidden',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}>
                <Row style={{padding: "3vh 4.5vh 3vh 0"}}>
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
