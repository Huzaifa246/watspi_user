import React, { useState } from 'react';
import ChartPage from './Chart/ChartPage';
import { Card } from 'react-bootstrap';
import "./dashboard.css";
import Messages from './Messages/Messages';
import { useSelector } from "react-redux";

function Dashboard() {
    const isSidebarOpen = useSelector((state) => state.sideBarStore.isSidebarOpen);
    
    return (
        <>
            <div className={`main-table-class ${!isSidebarOpen ? 'trades-open' : ''}`}>
                <div className='main-bg-pd-10px'>
                    <Card className='card-border-none'>
                        <div style={{ padding: "20px" }}>
                            <h4 style={{ fontWeight: "600" }}>Area Spaline Chart</h4>
                        </div>
                        <ChartPage />
                    </Card>
                    <div className='pd-tb-30'>
                        {/* className='card-border-none' */}
                        <Messages />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
