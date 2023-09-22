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
import './broadcast.css';
import * as XLSX from 'xlsx'; // Import the xlsx library

function BroadCast() {
    const isSidebarOpen = useSelector((state) => state.sideBarStore.isSidebarOpen);

    const [excelData, setExcelData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const instanceOptions = ['Option 1', 'Option 2', 'Option 3'];

    const [isInputEnabled, setInputEnabled] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);
    const [textMessage, setTextMessage] = useState('');

    const [templates, setTemplates] = useState([
        { textMessage: '' },
        { textMessage: '' },
        { textMessage: '' },
    ]);

    const attachmentInputs = useRef(Array(templates.length).fill(null));
    const [attachmentFiles, setAttachmentFiles] = useState(Array(templates.length).fill(null));

    const handleAttachmentSelect = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const allowedFileTypes = ['.pdf', '.doc', '.docx']; // Specify the allowed file types
            const fileExtension = file.name.split('.').pop(); // Get the file extension

            if (allowedFileTypes.includes('.' + fileExtension.toLowerCase())) {
                const updatedAttachmentFiles = [...attachmentFiles];
                updatedAttachmentFiles[index] = file;
                setAttachmentFiles(updatedAttachmentFiles);

                // Extract and display only the file name without the full path
                const fileName = file.name;
                const updatedTemplates = [...templates];
                updatedTemplates[index].attachmentFileName = fileName;
                setTemplates(updatedTemplates);
            } else {
                alert('Please select a valid multimedia file (PDF, DOC, or DOCX).');
                e.target.value = null;
            }
        }
    };

    const handleEnableInput = () => {
        setInputEnabled(true);
    };

    const handleSaveInput = () => {
        console.log('Input Value:', inputValue);
        setInputEnabled(false);
    };

    const toggleItemSelection = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const handleFileSelect = (e) => {
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
                };

                reader.readAsBinaryString(file);
            } else {
                // Display an error message or alert for an invalid file type
                alert('Please select a valid Excel file.');
                e.target.value = null; // Reset the file input
            }
        }
    };

    const handleAddTemplate = () => {
        // Create a new message template object or any data structure you prefer
        const newTemplate = {
            textMessage: '',
            // Add other properties as needed
        };

        // Update your state or an array that holds message templates
        setTemplates([...templates, newTemplate]);
    };

    const handleTemplateChange = (e, index) => {
        const updatedTemplates = [...templates];
        updatedTemplates[index].textMessage = e.target.value;
        setTemplates(updatedTemplates);
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
                                    BroadCast
                                </h2>
                            </div>
                            <Card className='card-box-border' style={{ padding: '15px 0' }}>
                                <form>
                                    <Row>
                                        <Col xs={4} md={4} lg={4}>
                                            <div className='instance-form-input'>
                                                <label> Name </label>
                                                <span>
                                                    <input
                                                        type='text'
                                                        placeholder='Name...'
                                                        className={`input-instance ${isInputEnabled ? '' : 'disabled'}`}
                                                        value={inputValue}
                                                        onChange={(e) => setInputValue(e.target.value)}
                                                        disabled={!isInputEnabled}
                                                    />
                                                    {!isInputEnabled && (
                                                        <FontAwesomeIcon
                                                            icon={faPencil}
                                                            className='left-input-copy'
                                                            onClick={handleEnableInput}
                                                        />
                                                    )}
                                                    {isInputEnabled && (
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                            className='left-input-copy'
                                                            onClick={handleSaveInput}
                                                            style={{ color: '#3ab19d' }}
                                                        />
                                                    )}
                                                </span>
                                            </div>
                                        </Col>

                                        <Col xs={4} md={4} lg={4}>
                                            <div className='instance-form-input'>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant='primary' id='dropdown-basic' className='Drop-btnstyle'>
                                                        Select Instance
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        {instanceOptions.map((option, index) => (
                                                            <div key={index} className='form-check'>
                                                                <input
                                                                    type='checkbox'
                                                                    className='form-check-input'
                                                                    id={`checkbox-${index}`}
                                                                    checked={selectedItems.includes(option)}
                                                                    onChange={() => toggleItemSelection(option)}
                                                                />
                                                                <label className='form-check-label' htmlFor={`checkbox-${index}`}>
                                                                    {option}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </Col>
                                        <Col xs={4} md={4} lg={4}>
                                            <div className='instance-form-input'>
                                                <label> Upload Excel File </label>
                                                <span>
                                                    <input
                                                        type='file'
                                                        accept='.xls, .xlsx'
                                                        onChange={handleFileSelect}
                                                        className='input-instance'
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
                        <Card className='card-box-border border-shadow-style'>
                            <Col xs={12} md={12} lg={12}>
                                <div className='instance-form-input'>
                                    <h5> Message Templates</h5>
                                    <div className='message-templates-container'>
                                        {/* To add a new template */}
                                        {templates.map((template, index) => (
                                            <div className='card-stylebdcast' key={index}>
                                                <form id={`form-file-upload-${index}`}>
                                                    <label id={`text-upload-${index}`} htmlFor={`input-file-upload-${index}`} style={{ width: '100%' }}>
                                                        <div className='text-area-main'>
                                                            <textarea
                                                                type='text'
                                                                placeholder='Enter your message...'
                                                                className='input-instance'
                                                                value={template?.textMessage}
                                                                onChange={(e) => handleTemplateChange(e, index)}
                                                                style={{ border: 'none', backgroundColor: 'white', resize: 'none' }}
                                                            />
                                                            <Button
                                                                className='Add-new-btn'
                                                                onClick={() => attachmentInputs[index].click()} // Trigger file input click
                                                            >
                                                                <FontAwesomeIcon icon={faPaperclip} />
                                                            </Button>
                                                            <span>{template.attachmentFileName}</span> {/* Display file name */}
                                                            <input
                                                                type='file'
                                                                accept='.pdf, .doc, .docx' // Specify the allowed file types here
                                                                onChange={(e) => handleAttachmentSelect(e, index)}
                                                                style={{ display: 'none' }} // Hide the input element
                                                                ref={(input) => (attachmentInputs[index] = input)}
                                                            />
                                                        </div>
                                                    </label>
                                                </form>
                                            </div>
                                        ))}
                                        {/* To add a new template end */}
                                        <div style={{ display: 'flex' }}>
                                            <Button className='Add-new-btn' onClick={handleAddTemplate}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button className='Add-new-btn'>Send Now</Button>
                                <Button className='Add-new-btn'>Schedule</Button>
                            </div>
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
                                        <th style={{ width: '10%' }}>S.No</th>
                                        <th style={{ paddingLeft: '10px' }}>FirstName</th>
                                        <th style={{ paddingLeft: '10px' }}>LastName</th>
                                        <th style={{ display: 'flex', justifyContent: 'center' }}>Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {excelData?.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row[0]}</td> {/* FirstName */}
                                            <td>{row[1]}</td> {/* LastName */}
                                            <td>{row[2]}</td> {/* Phone */}
                                            <td style={{ display: 'flex', justifyContent: 'center' }}>{row[3]}</td>
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

export default BroadCast;
