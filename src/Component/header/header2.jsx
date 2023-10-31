import React, { useState, useEffect } from 'react'
import whatsapiLogo from "../../../images/watspilogo.png";
import defaultImg from "../../../images/default-img.png"
import "./header2.css"
import bgImg1 from "../../../images/bg1.jpg";

function Header2() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    console.log(isDropdownOpen, "isDropdownOpen")
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };
    return (
        <>
            <div style={{
                backgroundImage: `url(${bgImg1})`,
                width: "100%",
                overflow: 'hidden',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}>
                <div className="Header_bg">
                    <div className='Header_display'>
                        <div>
                            <img src={whatsapiLogo}
                                alt="Profile-Image"
                                style={{ cursor: 'pointer', height: "4vh" }}
                            />
                        </div>
                        <div className='right_Profile_head'>
                            <div className='Pro_Head_badge'>
                                Pro
                            </div>
                            <div onClick={toggleDropdown} className="profile-dropdown">
                                <img
                                    src={defaultImg}
                                    className="Profile-img-radius"
                                    alt="Profile-Image"
                                    style={{ cursor: 'pointer' }}
                                />
                                <span style={{ marginLeft: '5px', color: "white" }}>
                                    Huzaifa
                                </span>
                                {isDropdownOpen && (
                                    <div className="dropdown_menu_MainInstance">
                                        {/* <div className="dropdown-divider"></div> */}
                                        <a
                                            className="dropdown-item_MainInstance"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header2;
