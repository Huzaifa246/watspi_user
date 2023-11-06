import React, { useState, useEffect } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import Sidebar2 from '../Dashboard2/Sidebar/Sidebar2';
import bgImg1 from "../../../images/bg1.jpg";
import "./createGroup2.css";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function CreateGroup2() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [selectAll, setSelectAll] = useState(false);
    const [data, setData] = useState([
        { id: 1, firstName: 'Huzaifa', lastName: 'Rehman', contact: '+920987654', desc: 'Lorem ipsum dolor sit amet consectetur.' },
        { id: 2, firstName: 'John', lastName: 'Doe', contact: '+123456789', desc: 'Another example description.' },
        { id: 3, firstName: 'Alice', lastName: 'Johnson', contact: '+987654321', desc: 'A third description.' },
        { id: 4, firstName: 'Mary', lastName: 'Smith', contact: '+555123456', desc: 'Description for Mary.' },
        { id: 5, firstName: 'David', lastName: 'Brown', contact: '+111222333', desc: 'Description for David.' },
    ]);

    const [textLength, setTextLength] = useState(100);
    useEffect(() => {
        function handleWindowResize() {
            const windowWidth = window.innerWidth;

            if (windowWidth > 1600) {
                setTextLength(150);
            } else if (windowWidth < 1600 && windowWidth > 1000) {
                setTextLength(100);
            } else if (windowWidth > 999) {
                setTextLength(50);
            }
            else if (windowWidth > 400) {
                setTextLength(20);
            }
        }
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    }
    const handleSelectAllChange = () => {
        setSelectAll(!selectAll); // Toggle the "Select All" state
    };
    const handleCheckboxChange = () => {
        // For Individual checkbox, in Futher
    };

    // Function to handle changes in the input fields
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Update the corresponding state variable
        if (name === 'name') {
            setName(value);
        } else if (name === 'description') {
            setDescription(value);
        }
    };

    // Check if all required fields are filled if not (HIDE BTN)
    const isSaveButtonVisible = (name !== '' && description !== '') && (selectAll || !handleCheckboxChange);

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
                    <Col sm="12" md="11" lg="11" xl="11" xxl="11" className='create_grp_filter'>
                        <Row className='mob-row' style={{ marginBottom: '20px', marginLeft: '10px', width: "98.5%" }}>
                            <Col>
                                <div className='card-drop-style'>
                                    <h1 style={{ padding: '10px', paddingTop: '20px', fontWeight: '600', color: 'white' }}>
                                        Create Groups
                                    </h1>
                                    {isSaveButtonVisible && (
                                        <button
                                            type='button'
                                            className='myexecl-btn_creategrp2 Save-CG-btn'
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                                <Col xs={12} md={12} lg={12} className='cr-display'>
                                    <div className='instance-form-input_grp2' style={{ paddingRight: "10px" }}>
                                        <label style={{ color: 'white' }}> Name </label>
                                        <span>
                                            <input
                                                type='text'
                                                placeholder='Name...'
                                                className='input-instance_grp2'
                                                name='name'
                                                value={name}
                                                onChange={handleInputChange}
                                            />
                                        </span>
                                    </div>
                                    <div className='instance-form-input_grp2'>
                                        <label style={{ color: 'white' }}> Description </label>
                                        <input
                                            type='text'
                                            placeholder='Description...'
                                            className='input-instance_grp2'
                                            name='description'
                                            value={description}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                        <Row className='mob-row' style={{ marginBottom: '20px', marginLeft: '10px', width: "98.5%" }}>
                            <Col>
                                <div className="creategrp2_maincontainer">
                                    <thead style={{ marginBottom: "0", tableLayout: "fixed", color: 'white' }}>
                                        <tr className='tr-create-gp'>
                                            <th className='th-checkbox'>
                                                <input
                                                    type="checkbox"
                                                    onChange={handleSelectAllChange}
                                                    checked={selectAll}
                                                />
                                            </th>
                                            <th>FirstName</th>
                                            <th>LastName</th>
                                            <th>Contacts</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <div className="creategrp2_container" style={{ color: 'white' }}>
                                        <table>
                                            {data.map((item, index) => (
                                                <tr className='tr-font-style' key={item?.id}>
                                                    <td className='th-checkbox'>
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => handleCheckboxChange(item?.id)}
                                                            checked={item.selected}
                                                        />
                                                    </td>
                                                    <td>{item?.firstName}</td>
                                                    <td>{item?.lastName}</td>
                                                    <td>{item?.contact}</td>
                                                    <td style={{ minWidth: "30%" }}>
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={<Tooltip id={`tooltip${index}`}>{item?.desc}</Tooltip>}
                                                        >
                                                            <span data-tip={item?.desc} data-for={`tooltip${index}`}>
                                                                {truncateText(item?.desc, textLength)}
                                                            </span>
                                                        </OverlayTrigger>
                                                    </td>
                                                </tr>
                                            ))}
                                        </table>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default CreateGroup2
