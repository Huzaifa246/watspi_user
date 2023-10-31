import React from 'react';
import whatsapiLogo from "../../../images/watspilogo.png";
import defaultImg from "../../../images/default-img.png"
import "./header2.css"

function Header2() {
    return (
        <>
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
                        <div>
                            <img
                                src={defaultImg}
                                className="Profile-img-radius"
                                alt="Profile-Image"
                                style={{ cursor: 'pointer' }}
                            />
                            <span style={{ marginLeft: '5px', color: "white" }}>
                                Huzaifa
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header2;
