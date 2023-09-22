import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';
import { useSelector, useDispatch } from "react-redux";
import { setSideBarState } from '../../store/sideBarSlice';
import img1 from "../../../images/watspilogo.png"
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
                    <img src={img1} alt="ITS Logo" className="its-logo" />
                    {/* <h1 className="its-heading">WatsApi</h1> */}
                </div>
            )}
            <nav id="sidebar" className={!isSidebarOpen ? "active" : ""}>
                <div className="p-4" style={{ marginTop: "6vh" }}>
                    <ul className="list-unstyled">
                        <h6 className='heading-style'>MAIN MENU</h6>
                        <Nav.Link href="/dashboard" className={`mb-2 main-sidebar ${window.location.pathname === '/dashboard' ? 'active-link' : ''}`} onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={faTachometerAlt} className="me-2 sidebar-icon" />
                            <span className='sidebar-text'>
                                Dashboard
                            </span>
                        </Nav.Link>
                        <Nav.Link href="/instancePage" className={`mb-2 main-sidebar ${window.location.pathname === '/instancePage' ? 'active-link' : ''}`} onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={faTachometerAlt} className="me-2 sidebar-icon" />
                            <span className='sidebar-text'>
                                InstancePage
                            </span>
                        </Nav.Link>
                        <Nav.Link href="/broadCast" className={`mb-2 main-sidebar ${window.location.pathname === '/broadCast' ? 'active-link' : ''}`} onClick={toggleSidebar}>
                            <FontAwesomeIcon icon={faTachometerAlt} className="me-2 sidebar-icon" />
                            <span className='sidebar-text'>
                                BroadCast
                            </span>
                        </Nav.Link>
                    </ul>
                    <ul className="list-unstyled">
                        <h6 className='heading-style'>OTHERS</h6>
                        <Nav.Link href="/settings" className={`mb-2 main-sidebar ${window.location.pathname === '/settings' ? 'active-link' : ''}`} onClick={toggleSidebar}>
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
