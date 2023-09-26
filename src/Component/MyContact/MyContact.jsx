import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row, Dropdown, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencil,
    faCheck,
    faPaperclip,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import './myContact.css';
import * as XLSX from 'xlsx';

function MyContact() {
    const isSidebarOpen = useSelector((state) => state.sideBarStore.isSidebarOpen);

    const [excelData, setExcelData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    const [uploadTime, setUploadTime] = useState(null); // Store the upload time


    const toggleItemSelection = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const fileInputRef = useRef(null);

    const handleFileSelect = () => {
        fileInputRef.current.click(); // Click the hidden file input element
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (
                file.type ===
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                file.type === 'application/vnd.ms-excel'
            ) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];

                    const sheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                    // Assuming your Excel sheet has columns in this order: FirstName, LastName, Phone
                    const excelData = jsonData.slice(1); // Skip the header row

                    setExcelData(excelData);

                    // Set the upload time to the current date and time
                    const currentTime = new Date();
                    setUploadTime(currentTime.toLocaleString());
                };

                reader.readAsBinaryString(file);
            } else {
                // Display an error message or alert for an invalid file type
                alert('Please select a valid Excel file.');
                e.target.value = null; // Reset the file input
            }
        }
    };

    console.log(excelData, 'asad');
    return (
        <>
            <div className={`${!isSidebarOpen ? 'trades-open' : ''}`}>
                <div style={{ marginTop: '6rem' }}></div>
                <Row style={{ marginBottom: '20px', marginLeft: '10px', width: '99%' }}>
                    <Col>
                        <Card className='card-box-border border-shadow-style'>
                            <div className='card-drop-style'>
                                <h2 style={{ padding: '10px', paddingTop: '20px', fontWeight: '600' }}>
                                    My Contacts
                                </h2>
                            </div>
                            <Card className='card-box-border' style={{ padding: '15px 0' }}>
                                <form>
                                    <Row>
                                        <Col xs={12} md={12} lg={12}>
                                            <div className='My-form-input'>
                                                <span>
                                                    <button
                                                        type='button'
                                                        onClick={handleFileSelect}
                                                        className='myexecl-btn'
                                                    >
                                                        Add Excel File
                                                    </button>
                                                    <input
                                                        ref={fileInputRef}
                                                        type='file'
                                                        accept='.xls, .xlsx'
                                                        onChange={handleFileInputChange}
                                                        style={{ display: 'none' }} // Hide the input
                                                    />
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                </form>
                            </Card>
                        </Card>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '20px', marginLeft: '10px', width: '99%' }}>
                    <Col>
                        <Card className='card-box-border border-shadow-style' style={{ padding: '15px' }}>
                            <h4>
                                Contact List
                            </h4>
                            <Table striped className='main-table'>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th style={{ display: 'flex', justifyContent: 'center' }}>Date&Time</th>
                                        <th style={{ paddingLeft: '10px' }}>FirstName</th>
                                        <th style={{ paddingLeft: '10px' }}>LastName</th>
                                        <th style={{ paddingLeft: '10px' }}>Email</th>
                                        <th style={{ paddingLeft: '10px' }}>Age</th>
                                        <th style={{ paddingLeft: '10px' }}>Gender</th>
                                        <th style={{ paddingLeft: '10px' }}>Country</th>
                                        <th style={{ paddingLeft: '10px' }}>Phone</th>
                                        <th style={{ paddingLeft: '10px' }}>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {excelData?.map((row, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td> 
                                            <td style={{textAlign: 'center'}}>{uploadTime}</td>
                                            <td>{row[0]}</td> 
                                            <td>{row[1]}</td> 
                                            <td>{row[2]}</td>
                                            <td>{row[3]}</td>
                                            <td>{row[4]}</td>
                                            <td>{row[5]}</td>
                                            <td>{row[6]}</td>
                                            <td>{row[7]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default MyContact;
