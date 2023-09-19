import React, { useState } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';
import { useSelector, useDispatch } from "react-redux";
import { setSideBarState } from '../../store/sideBarSlice';


const Sidebar = () => {
    const isSidebarOpen = useSelector((state) => state.sideBarStore.isSidebarOpen);
    const dispatch = useDispatch();

    const toggleSidebar = () => {
        dispatch(setSideBarState(isSidebarOpen));
    };

    return (
        <>
            {!isSidebarOpen && (
                <div className="its-heading-logo">
                    {/* <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="ITS Logo" className="its-logo" /> */}
                    <h1 className="its-heading">WatsApi</h1>
                </div>
            )}
            <nav id="sidebar" className={!isSidebarOpen ? "active" : ""}>
                <div className="p-4" style={{ marginTop: "50px" }}>
                    <ul className="list-unstyled">
                        <Nav.Link href="/dashboard" className={`mb-2 main-sidebar ${window.location.pathname === '/dashboard' ? 'active-link' : ''}`} onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={faTachometerAlt} className="me-2 sidebar-icon" />
                            <span className='sidebar-text'>
                                Dashboard
                            </span>
                        </Nav.Link>
                        <Nav.Link href="/settings" className={`mb-2 main-sidebar ${window.location.pathname === '/dashboard' ? 'active-link' : ''}`} onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={faCog} className="me-2 sidebar-icon" />
                            <span className='sidebar-text'>
                                Setting
                            </span>
                        </Nav.Link>
                    </ul>
                </div>
            </nav>

        </>
    );
};

export default Sidebar;
