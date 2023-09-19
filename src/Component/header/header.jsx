import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './header.css';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';
import { useSelector, useDispatch } from "react-redux";
import { setSideBarState } from '../../store/sideBarSlice';

export const defaultImageUrl = 'https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png';

const HeaderComponent = () => {
    // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isSidebarOpen = useSelector((state) => state.sideBarStore.isSidebarOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const toggleSidebar = () => {
        // setIsSidebarOpen(!isSidebarOpen);
        dispatch(setSideBarState(!isSidebarOpen));
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    return (
        <>
            <Navbar bg="light" expand="lg" className={`fixed-top main-Nav ${!isSidebarOpen ? 'sidebar-open' : ''}`}>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="ml-auto profile-info">
                        <div className="user-icon" onClick={toggleUserDropdown}>
                            <FontAwesomeIcon icon={faUser} className='user-icon' />
                            {isUserDropdownOpen && (
                                <div className="dropdown-menu show-on-hover">
                                    <a class="dropdown-item" href="/profile">
                                        {/* <img src={defaultImageUrl} alt="user" className='list-img-icons' /> */}
                                        Account
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" onClick={() => {
                                        localStorage.removeItem("token")
                                        window.location.href = "/login";
                                    }}>
                                        {/* <img src={defaultImageUrl} alt="user" className='list-img-icons' /> */}
                                        Logout
                                    </a>
                                </div>
                            )}
                        </div>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleSidebar} />
            </Navbar>
            <Sidebar />
            <Outlet />
        </>
    );
};

export default HeaderComponent;
