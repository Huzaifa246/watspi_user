import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row, Dropdown, Modal, Button } from 'react-bootstrap';
import './myContact.css';
import "./myContact2.css";
import * as XLSX from 'xlsx';
import { FaSearch } from 'react-icons/fa';
import Sidebar2 from './../Dashboard2/Sidebar/Sidebar2';
import bgImg1 from "../../../images/bg1.jpg";
import CreateContactApi from '../../helpers/PostApis/CreateContact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { decryption } from '../../helpers/encryptionDecryption';
import ProgressBar from 'react-bootstrap/ProgressBar';
import GetAllContacts from '../../helpers/GetApis/GetAllContacts';

function MyContact2() {

    const [showModal, setShowModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [status, setStatus] = useState('');
    const [errStatus, setErrStatus] = useState('');
    const [modalData, setModalData] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [dropdownOptions, setDropdownOptions] = useState([])
    const [selectedDropdownColumn, setSelectedDropdownColumn] = useState(false);
    const [firstNameOptions, setFirstNameOptions] = useState([]);
    const [lastNameOptions, setLastNameOptions] = useState([]);
    const [numberOptions, setNumberOptions] = useState([]);
    const [header, setHeader] = useState('');
    const [selectedNumberOptions, setSelectedNumberOptions] = useState([]);
    const [options, setOptions] = useState([]); // Declare the options array
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedDropdowns, setSelectedDropdowns] = useState({});
    const [uploadProgress, setUploadProgress] = useState(0);


    const [excelData, setExcelData] = useState([]);
    const [uploadTime, setUploadTime] = useState(null); // Store the upload time
    const [searchQuery, setSearchQuery] = useState('');

    const [filteredData, setFilteredData] = useState([]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const defaultCountries = [
        { name: 'USA', flagUrl: 'https://flagcdn.com/us.svg' },
        { name: 'Pakistan', flagUrl: 'https://flagcdn.com/pk.svg' },
        { name: 'United Kingdom', flagUrl: 'https://flagcdn.com/gb.svg' },
        { name: 'Australia', flagUrl: 'https://flagcdn.com/au.svg' },
        { name: 'China', flagUrl: 'https://flagcdn.com/cn.svg' },
    ];

    const fileInputRef = useRef(null);

    const handleFileSelect = () => {
        fileInputRef.current.click(); // Click the hidden file input element
    };

    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (
                file.type ===
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                file.type === 'application/vnd.ms-excel'
            ) {
                const reader = new FileReader();

                reader.onload = async (e) => {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];

                    const sheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                    const header = jsonData[0];
                    setHeader(header);
                    // Assuming your Excel sheet has columns in this order: FirstName, LastName, Phone
                    const excelData = jsonData.slice(1); // Skip the header row

                    // Set the upload time to the current date and time
                    const newExcelData = excelData.map(() => {
                        const currentTime = new Date();
                        const localTime = currentTime.toLocaleString(); // Get the local date and time
                        return { Date: currentTime, localTime }; // Add an object with Date and localTime properties
                    });
                    setUploadTime(newExcelData);

                    const dropdownOptions = excelData[0];
                    setExcelData(excelData);
                    setFilteredData(newExcelData);
                    handleOpenModal(excelData);
                    setDropdownOptions(dropdownOptions);

                    const columnsToFind = ["FirstName", "LastName", "Phone"];
                    const headerRow = excelData[0];
                    const columnIndices = {};

                    // Loop through the header row to find the column indices
                    headerRow.forEach((cell, index) => {
                        if (columnsToFind.includes(cell)) {
                            columnIndices[cell] = index;
                        }
                    });

                    // Now, the columnIndices object contains the indices of the columns you want
                    console.log(columnIndices);

                    // Identify the "Name" column and extract options when excelData is available
                    identifyNameColumnAndOptions(excelData);
                };

                reader.readAsBinaryString(file);
            } else {
                // Display an error message or alert for an invalid file type
                alert('Please select a valid Excel file.');
                e.target.value = null; // Reset the file input
            }
        }
    };

    useEffect(() => {
        // Set the initial state when the component loads
        setFilteredData(excelData);
    }, [excelData]);

    // When "All" button is clicked, show all data
    const handleFilterAllClick = () => {
        setFilteredData(excelData);
    };

    //FILTER BY GENDER
    const handleFilterGenderChange = (selectedGender) => {
        // Filter data based on selected gender
        const filteredData = excelData.filter((row) => {
            return row[4] === selectedGender; // gender is at index 4 according to excel file
        });

        setFilteredData(filteredData);
    };
    //FILTER BY COUNTRY
    const handleFilterCountryChange = (selectedCountry) => {
        // Filter data based on selected country
        const filteredData = excelData.filter((row) => {
            return row[5] === defaultCountries[selectedCountry].name; // Country is at index 5 according to excel file
        });

        setFilteredData(filteredData);
    };
    // const dataToSend = {
    //     firstName: selectedValue,
    //     lastName: selectedValue,
    //     number: selectedValue,
    //     gender: selectedValue,
    //     email: selectedValue,
    //     country: selectedValue,
    // };
    // const handleUploadClick = async () => {
    //     try {
    //         setUploading(true);
    //         if (selectedOptions.length === 0) {
    //             console.log("No options selected");
    //             return;
    //         }
    //         for (const entry of excelData) {
    //             const dataToSend = {};
    //             // selectedOptions.forEach((option) => {
    //             //     dataToSend[option] = entry[header.indexOf(option)];
    //             // });
    //             // Iterate through selected options and add them to the dataToSend object
    //             selectedOptions?.forEach((option) => {
    //                 const optionIndex = header?.indexOf(option);
    //                 if (optionIndex !== -1) {
    //                     dataToSend[option] = entry[optionIndex];
    //                 }
    //             });

    //             // Call the CreateContactApi function to send the data
    //             // const response = await CreateContactApi(dataToSend);
    //             // setStatus(response?.message);
    //             // if (response?.message == "Contact Saved") {
    //             //     setUploading(false);
    //             //     setShowModal(false);
    //             //     setSuccessModal(true);
    //             // }
    //             // // Handle the response if needed
    //             // console.log('API Response:', response);
    //             // // const responseCheck = response
    //             // if (response?.message === "Request failed with status code 400") {
    //             //     setErrStatus("Contact already exists");
    //             // }
    //             if (Object.keys(dataToSend).length > 0) {
    //                 const response = await CreateContactApi(dataToSend);
    //                 setStatus(response?.message);
    //                 if (response?.message === "Contact Saved") {
    //                     setUploading(false);
    //                     setShowModal(false);
    //                     setSuccessModal(true);
    //                 }
    //                 console.log('API Response:', response);
    //                 if (response?.message === "Request failed with status code 400") {
    //                     setErrStatus("Contact already exists");
    //                 }
    //             }
    //         }
    //     } catch (error) {
    //         // Handle any errors that occur during the API call
    //         console.log(error);//?.response?.data?.data;
    //         // setUploading(false);
    //         // setShowModal(false);
    //         // setErrStatus('An error occurred while uploading. Please try again.'); // Set the error status message
    //     }
    // };
    // const handleUploadClick = () => {
    //     setUploadProgress(0);
    //     setUploading(true);
    //     if (selectedOptions.length === 0) {
    //         console.log("No options selected");
    //         return;
    //     }

    //     const promises = excelData?.map(async (entry, index) => {
    //         console.log(entry, 'entry')
    //         console.log(index, 'index')
    //         const dataToSend = {};
    //         selectedOptions?.forEach((option) => {
    //             const optionIndex = header?.indexOf(option);
    //             if (optionIndex !== -1) {
    //                 dataToSend[option] = entry[optionIndex];
    //             }
    //             const dataToSend = {
    //                 firstName: entry[index][0],
    //                 lastName: entry[index][1],
    //                 number: entry[index][2],
    //                 gender: entry[index][3],
    //                 email: entry[index][4],
    //                 country: entry[index][5],
    //             }; 
    //         });
    //         console.log(dataToSend, 'dataToSend')
    //         if (Object.keys(dataToSend).length > 0) {
    //             return CreateContactApi(dataToSend)
    //                 .then((response) => {
    //                     setStatus(response?.message);
    //                     if (response?.message === "Contact Saved") {
    //                         setSuccessModal(true);
    //                     }
    //                     const progress = ((index + 1) / excelData.length) * 100;
    //                     setUploadProgress(progress);
    //                     return response;
    //                 })
    //                 .catch((error) => {
    //                     console.error('API Error:', error);
    //                     setErrStatus('An error occurred while uploading. Please try again.');
    //                     return error;
    //                 });
    //         }

    //         return null;
    //     });

    //     Promise.all(promises)
    //         .then(() => {
    //             setUploading(false);
    //             setShowModal(false);
    //         })
    //         .catch((error) => {
    //             console.error('Promise.all Error:', error);
    //             setUploading(false);
    //             setShowModal(false);
    //         });
    // };
    const handleUploadClick = () => {
        setUploadProgress(0);
        setUploading(true);
        if (selectedOptions.length === 0) {
            console.log("No options selected");
            return;
        }

        const promises = excelData?.map(async (entry, index) => {
            console.log(entry, 'entry');
            console.log(index, 'index');
            const dataToSend = {};

            // selectedOptions?.forEach((option) => {
            //     const optionIndex = header?.indexOf(option);
            //     if (optionIndex !== -1) {
            //         // Map the selected header to specific keys in dataToSend
            //         if (option === 'First Name') {
            //             dataToSend.firstName = entry[optionIndex];
            //         } else if (option === 'Last Name') {
            //             dataToSend.lastName = entry[optionIndex];
            //         } else if (option === 'Number') {
            //             dataToSend.number = entry[optionIndex];
            //         } else if (option === 'Gender') {
            //             dataToSend.gender = entry[optionIndex];
            //         } else if (option === 'Email') {
            //             dataToSend.email = entry[optionIndex];
            //         } else if (option === 'Country') {
            //             dataToSend.country = entry[optionIndex];
            //         }
            //         else{
            //             dataToSend[option] = entry[optionIndex];
            //         }
            //     }
            //     console.log(optionIndex, 'optionIndex')
            // });
            selectedOptions?.forEach((option) => {
                const optionIndex = header?.indexOf(option);
                if (optionIndex !== -1) {
                    dataToSend[option] = entry[optionIndex] || ''; // Set empty string as default value if not selected
                }
                console.log(optionIndex, 'optionIndex');
            });

            console.log(dataToSend, 'dataToSend');
            if (Object.keys(dataToSend).length > 0) {
                console.log(dataToSend, 'inside dataToSend')
                return CreateContactApi(dataToSend)
                    .then((response) => {
                        setStatus(response?.message);
                        console.log(response, 'response msg')
                        if (response?.message === "Contact Saved") {
                            setSuccessModal(true);
                        }
                        const progress = ((index + 1) / excelData.length) * 100;
                        setUploadProgress(progress);
                        return response;
                    })
                    .catch((error) => {
                        console.error('API Error:', error);
                        setErrStatus('An error occurred while uploading. Please try again.');
                        return error;
                    });
            }

            return null;
        });

        Promise.all(promises)
            .then(() => {
                setUploading(false);
                setShowModal(false);
            })
            .catch((error) => {
                console.error('Promise.all Error:', error);
                setUploading(false);
                setShowModal(false);
            });
    };


    useEffect(() => {
        // Update the selected options when the header changes
        setSelectedOptions(header);
    }, [header]);
    // const handleOpenModal = () => {
    //     setShowModal(true);
    //     setModalData(excelData);
    // };
    const handleOpenModal = (data) => {
        setModalData(data);
        setShowModal(true);
        setSelectedDropdownColumn(true);

        const initialOptions = header.map((headerText) => headerText);
        setOptions(initialOptions);
    };

    const identifyNameColumnAndOptions = (data) => {
        const headerRow = data[0]; // Assuming the header row is the first row
        const nameColumnIndex = headerRow.findIndex((cell) => cell === "Name");

        if (nameColumnIndex !== -1) {
            const nameOptions = data.slice(1).map((row) => row[nameColumnIndex]);
            setDropdownOptions(nameOptions);
        }
    };
    useEffect(() => {
        if (excelData.length > 0) {
            // Identify the "Name" column and extract options when excelData is available
            identifyNameColumnAndOptions(excelData);

            // Assuming the columns you want to find are "FirstName," "LastName," and "Number"
            const columnsToFind = ["FirstName", "LastName", "Number"];
            const headerRow = excelData[0];
            const columnIndices = {};

            // Loop through the header row to find the column indices
            headerRow.forEach((cell, index) => {
                if (columnsToFind.includes(cell)) {
                    columnIndices[cell] = index;
                }
            });

            // Now, the columnIndices object contains the indices of the columns you want
            console.log(columnIndices);

            // Extract options for each column and set them in the respective state variables
            const firstNameIndex = columnIndices["FirstName"];
            const lastNameIndex = columnIndices["LastName"];
            const numberIndex = columnIndices["Number"];

            const firstNameOptions = excelData.slice(1).map((row) => row[firstNameIndex]);
            setFirstNameOptions(firstNameOptions);

            const lastNameOptions = excelData.slice(1).map((row) => row[lastNameIndex]);
            setLastNameOptions(lastNameOptions);

            const numberOptions = excelData.slice(1).map((row) => row[numberIndex]);
            setNumberOptions(numberOptions);
        }
    }, [excelData]);

    const handleOptionSelect = (option) => {
        setSelectedOptions((prevOptions) => {
            if (prevOptions.includes(option)) {
                // Remove the column from selected options
                return prevOptions.filter((opt) => opt !== option);
            } else {
                // Add the column to selected options
                return [...prevOptions, option];
            }
        });
    };

    console.log(excelData, 'asad');
    return (
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Excel Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <div>
                            <label>First Name:</label>
                            {header?.length > 0 && (
                                <div>
                                    <label>
                                        <select>
                                            {header?.map((option, index) => (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>

                                            ))}
                                        </select>
                                    </label>
                                </div>
                            )}
                        </div>
                        <div>
                            <label>Last Name:</label>
                            {header?.length > 0 && (
                                <div>
                                    <label>
                                        <select
                                        // checked={selectedOptions.includes(option)}
                                        >
                                            {header?.map((option, index) => (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>

                                            ))}
                                        </select>
                                    </label>
                                </div>
                            )}
                        </div>
                        <div>
                            <label>Number:</label>
                            {header?.length > 0 && (
                                <div>
                                    <label>
                                        <select
                                        // checked={selectedOptions.includes(option)}
                                        >
                                            {header?.map((option, index) => (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>

                                            ))}
                                        </select>
                                    </label>
                                </div>
                            )}
                        </div>
                        <div>
                            <label>Gender:</label>
                            {header?.length > 0 && (
                                <div>
                                    <label>
                                        <select
                                        // checked={selectedOptions.includes(option)}
                                        >
                                            {header?.map((option, index) => (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>

                                            ))}
                                        </select>
                                    </label>
                                </div>
                            )}
                        </div>
                        <div>
                            <label>Email:</label>
                            {header?.length > 0 && (
                                <div>
                                    <label>
                                        <select
                                        // checked={selectedOptions.includes(option)}
                                        >
                                            {header?.map((option, index) => (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>

                                            ))}
                                        </select>
                                    </label>
                                </div>
                            )}
                        </div>
                        <div>
                            <label>Country:</label>
                            {header?.length > 0 && (
                                <div>
                                    <label>
                                        <select
                                        // checked={selectedOptions.includes(option)}
                                        >
                                            {header?.map((option, index) => (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>

                                            ))}
                                        </select>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div> */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <div>
                            <label>First Name:</label>
                            {header?.length > 0 && (
                                <div>
                                    <select
                                        onChange={(e) => handleOptionSelect("First Name", e.target.value)}
                                        value={selectedOptions.includes("First Name") ? "First Name" : ""}
                                    >
                                        {selectedOptions.includes("First Name") ? (
                                            <option value="First Name">First Name</option>
                                        ) : (
                                            <option value="">Select FirstName</option>
                                        )}
                                        {header?.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        <div>
                            <label>Last Name:</label>
                            {header?.length > 0 && (
                                <div>
                                    <select
                                        onChange={(e) => handleOptionSelect("Last Name", e.target.value)}
                                        value={selectedOptions.includes("Last Name") ? "Last Name" : ""}
                                    >
                                        {selectedOptions.includes("Last Name") ? (
                                            <option value="Last Name">Last Name</option>
                                        ) : (
                                            <option value="">Select LastName</option>
                                        )}
                                        {header?.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        <div>
                            <label>Number:</label>
                            {header?.length > 0 && (
                                <div>
                                    <select
                                        onChange={(e) => handleOptionSelect("Number", e.target.value)}
                                        value={selectedOptions.includes("Number") ? "Number" : ""}
                                    >
                                        {selectedOptions.includes("Number") ? (
                                            <option value="Number">Number</option>
                                        ) : (
                                            <option value="">Select Number</option>
                                        )}
                                        {header?.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        <div>
                            <label>Gender:</label>
                            {header?.length > 0 && (
                                <div>
                                    <select
                                        onChange={(e) => handleOptionSelect("Gender", e.target.value)}
                                        value={selectedOptions.includes("Gender") ? "Gender" : ""}
                                    >
                                        {selectedOptions.includes("Gender") ? (
                                            <option value="Gender">Gender</option>
                                        ) : (
                                            <option value="">Select Gender</option>
                                        )}
                                        {header?.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        <div>
                            <label>Email:</label>
                            {header?.length > 0 && (
                                <div>
                                    <select
                                        onChange={(e) => handleOptionSelect("Email", e.target.value)}
                                        value={selectedOptions.includes("Email") ? "Email" : ""}
                                    >
                                        {selectedOptions.includes("Email") ? (
                                            <option value="Email">Email</option>
                                        ) : (
                                            <option value="">Select Email</option>
                                        )}
                                        {header?.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        <div>
                            <label>Country:</label>
                            {header?.length > 0 && (
                                <div>
                                    <select
                                        onChange={(e) => handleOptionSelect("Country", e.target.value)}
                                        value={selectedOptions.includes("Country") ? "Country" : ""}
                                    >
                                        {selectedOptions.includes("Country") ? (
                                            <option value="Country">Country</option>
                                        ) : (
                                            <option value="">Select Country</option>
                                        )}
                                        {header?.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        {selectedDropdownColumn && (
                            <div>
                                {selectedDropdownColumn && (
                                    <div>
                                        {uploading ? (
                                            <ProgressBar animated now={uploadProgress} label={`${uploadProgress}%`} />
                                        ) : (
                                            <button onClick={handleUploadClick}>Create Contacts</button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className='MyContact_scroll'>
                        <table className="table table-striped">
                            {header?.length > 0 && (
                                <thead>
                                    <tr>
                                        {header.map((headerText, index) => (
                                            <th key={index}>{headerText}</th>
                                        ))}
                                    </tr>
                                </thead>
                            )}
                            <tbody>
                                {modalData?.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                            <td key={cellIndex}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        {errStatus}
                    </div>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleUploadClick}
                        disabled={uploading}
                    >
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={successModal} onHide={() => setSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{status}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setSuccessModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>



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
                    <Col>
                        <Row className='mob-row width-100' style={{ marginBottom: '20px' }}>
                            <Col sm="1" lg="1" xl="1" xxl="1"></Col>
                            <Col sm="12" md="12" lg="11" xl="11" xxl="11" className='Backdrop-myContact2' style={{ paddingBottom: '10px' }}>
                                <div className='card-drop-style'>
                                    <h1 style={{ padding: '10px', paddingTop: '20px', fontWeight: '600', color: "white" }}>
                                        My Contacts
                                    </h1>
                                    <span className='hide-ex-main-btn'>
                                        <button
                                            type='button'
                                            // onClick={handleFileSelect}
                                            onClick={() => handleOpenModal(excelData)}
                                            className='myexecl-btn2 mycontact-btn'
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

                                <form>
                                    <Row>
                                        <Col>
                                            <div className='My-form-input'>
                                                <div className='Contact-flex-style'>
                                                    <button
                                                        type='button'
                                                        className={filteredData === excelData ? 'selected-btn' : 'unselected-dropdown'}
                                                        onClick={handleFilterAllClick}
                                                    >
                                                        All
                                                    </button>
                                                    <Dropdown>
                                                        <Dropdown.Toggle
                                                            className={filteredData === 'Gender' ? 'selected-btn' : 'unselected-dropdown'}
                                                            id="filterDropdown"
                                                        >
                                                            Gender
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className='menu-Gender'>
                                                            <Dropdown.Item value="Male"
                                                                onClick={() => handleFilterGenderChange("Male")}
                                                            >Male</Dropdown.Item>
                                                            <Dropdown.Item value="Female"
                                                                onClick={() => handleFilterGenderChange("Female")}
                                                            >Female</Dropdown.Item>
                                                            <Dropdown.Item value="Others"
                                                                onClick={() => handleFilterGenderChange("Others")}
                                                            >Others</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                    <Dropdown>
                                                        <Dropdown.Toggle
                                                            className={filteredData === 'Country' ? 'selected-btn' : 'unselected-dropdown'}
                                                            id="filterDropdown"
                                                        >
                                                            Country
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className='menu-Country'>
                                                            {defaultCountries.map((country, index) => (
                                                                <Dropdown.Item key={index} value={index}
                                                                    onClick={() => handleFilterCountryChange(index)}
                                                                >
                                                                    <img src={country.flagUrl} className="country-flag" />
                                                                    {country.name}
                                                                </Dropdown.Item>
                                                            ))}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                                <div className='search-flex-main'>
                                                    <div className="search-container2">
                                                        <FaSearch className="search-icon2" />
                                                        <input
                                                            type="text"
                                                            placeholder="Search..."
                                                            value={searchQuery}
                                                            onChange={handleSearchInputChange}
                                                            className='input-search inputsearch-2'
                                                        />
                                                    </div>
                                                    <span className='hide-ex-btn'>
                                                        <button
                                                            type='button'
                                                            onClick={handleFileSelect}

                                                            className='myexecl-btn2 mycontact-btn'
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
                                            </div>
                                        </Col>
                                    </Row>
                                </form>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="1" lg="1" xl="1" xxl="1"></Col>
                            <Col md={11} lg={11} className='Backdrop-myContact2' style={{ padding: "10px" }}>
                                <div>
                                    <div className="MyContact_2_maincontainer">
                                        <thead style={{ marginBottom: "0", tableLayout: "fixed" }}>
                                            <tr style={{ color: "white" }} className='th-font-style'>
                                                <th className='td_min_sNo_width'>S.N</th>
                                                <th className='td_min_width'>First Name</th>
                                                <th className='td_min_width'>Last Name</th>
                                                <th className='td_min_width'>Phone</th>
                                                <th className='td_min_width'>Email</th>
                                                <th className='td_min_width'>Gender</th>
                                                <th className='td_min_width'>Country</th>
                                                <th className='td_min_width'>Actions</th>
                                            </tr>
                                        </thead>
                                        <div className="MyContact_2_container">
                                            <table>
                                                <tbody className='tbody-font-style' style={{ marginBottom: "0", tableLayout: "fixed" }}>
                                                    <tr>
                                                        <td className='td_min_sNo_width'>{1}</td>
                                                        <td className='td_min_width'>Huzaifa</td>
                                                        <td className='td_min_width'>Khan</td>
                                                        <td className='td_min_width'>+92098765432</td>
                                                        <td className='td_min_width'>huzaifa@gmail.com</td>
                                                        <td className='td_min_width'>Male</td>
                                                        <td className='td_min_width'>Pakistan</td>
                                                        <td className='td_min_width'>
                                                            <FontAwesomeIcon
                                                                icon={faEdit}
                                                                style={{ cursor: 'pointer', marginRight: '10px' }}
                                                            // onClick={() => handleEdit(row)}
                                                            />
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => handleDelete(row)} // Replace handleDelete with your delete function
                                                            />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>

                </Row>

            </div>
        </>
    );
}

export default MyContact2;
