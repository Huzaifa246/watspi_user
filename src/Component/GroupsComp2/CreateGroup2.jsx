import React, { useState, useEffect } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import Sidebar2 from '../Dashboard2/Sidebar/Sidebar2';
import bgImg1 from "../../../images/bg1.jpg";
import "./createGroup2.css";

function CreateGroup2() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [selectAll, setSelectAll] = useState(false);
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
                                <tbody style={{ marginBottom: "0", tableLayout: "fixed" }}>
                                    <tr className='tr-font-style'>
                                        <td className='th-checkbox'>
                                            <input type="checkbox" onChange={handleCheckboxChange} checked={selectAll} />
                                        </td>
                                        <td>Huzaifa</td>
                                        <td>Rehman</td>
                                        <td>+920987654</td>
                                        <td>Lorem ipsum dolor sit amet consectetur.</td>
                                    </tr>
                                </tbody>
                                <tbody style={{ marginBottom: "0", tableLayout: "fixed" }}>
                                    <tr className='tr-font-style'>
                                        <td className='th-checkbox'>
                                            <input type="checkbox" onChange={handleCheckboxChange} checked={selectAll} />
                                        </td>
                                        <td>Huzaifa</td>
                                        <td>Rehman</td>
                                        <td>+920987654</td>
                                        <td>Lorem ipsum dolor sit amet consectetur.</td>
                                    </tr>
                                </tbody>
                                <tbody style={{ marginBottom: "0", tableLayout: "fixed" }}>
                                    <tr className='tr-font-style'>
                                        <td className='th-checkbox'>
                                            <input type="checkbox" onChange={handleCheckboxChange} checked={selectAll} />
                                        </td>
                                        <td>Huzaifa</td>
                                        <td>Rehman</td>
                                        <td>+920987654</td>
                                        <td>Lorem ipsum dolor sit amet consectetur.</td>
                                    </tr>
                                </tbody>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default CreateGroup2
