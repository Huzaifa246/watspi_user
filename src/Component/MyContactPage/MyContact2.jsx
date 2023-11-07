import React, { useState, useEffect, useRef } from 'react';
import { Col, Row, Dropdown, Modal, Button, Form } from 'react-bootstrap';
import './myContact.css';
import "./myContact2.css";
import * as XLSX from 'xlsx';
import { FaSearch } from 'react-icons/fa';
import Sidebar2 from './../Dashboard2/Sidebar/Sidebar2';
import bgImg1 from "../../../images/bg1.jpg";
import CreateContactApi from '../../helpers/PostApis/CreateContact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from 'react-bootstrap/ProgressBar';

import GetAllContacts from '../../helpers/GetApis/GetAllContacts';
import DelIndiContact from './../../helpers/GetApis/DelIndiContact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditContactApi from '../../helpers/PostApis/EditContact';

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
    const [allContacts, setAllContacts] = useState([]);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [updateInstance, setUpdateInstance] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        number: '',
        gender: '',
        email: '',
        country: '',
    });

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

    //Get all contacts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetAllContacts();
                setAllContacts(data?.message);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    //del contact
    const deleteContact = async (id) => {
        try {
            const data = await DelIndiContact(id);
            console.log(data, 'del data')
            toast.success(data?.message);
        } catch (error) {
            console.error('Error deleting contact:', error);
            toast.error(error?.message);
        }
    };
    const openEditModal = (data) => {
        setFormData(data || {
            firstName: '',
            lastName: '',
            number: '',
            gender: '',
            email: '',
            country: '',
        });
        setShowModalEdit(true);
    };
    //edit contact
    const handleUpdateInput = () => {
        const data = formData;

        EditContactApi(data, data?._id)
            .then((response) => {
                if (response?.message === "Contact updated successfully") {
                    setUpdateInstance(response?.data)
                }
                console.log(response, 'response')
                toast.success(response?.message, {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            })
            .catch((error) => {
                console.error("API error:", error);
                toast.error(error?.message, {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
    };

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
                    // Assuming your Excel sheet has columns in this order: firstName, lastName, Phone
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

                    // const columnsToFind = ["firstName", "lastName", "number"];
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
    const optionToFieldName = {
        "First Name": "firstName",
        "Last Name": "lastName",
        "number": "number",
        "Gender": "gender",
        "Email": "email",
        "Country": "country",
      };
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
            //         if (option === 'firstName') {
            //             dataToSend.firstName = entry[optionIndex];
            //         } else if (option === 'lastName') {
            //             dataToSend.lastName = entry[optionIndex];
            //         } else if (option === 'number') {
            //             dataToSend.number = entry[optionIndex];
            //         } else if (option === 'gender') {
            //             dataToSend.gender = entry[optionIndex];
            //         } else if (option === 'email') {
            //             dataToSend.email = entry[optionIndex];
            //         } else if (option === 'country') {
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
                // if (optionIndex !== -1) {
                //     // Map the selected header to specific keys in dataToSend
                //     const fieldName = optionToFieldName[option];
                //     dataToSend[fieldName] = entry[optionIndex] || ''; // Set empty string as default value if not selected
                //   }
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
                            const progress = ((index + 1) / excelData?.length) * 100;
                            setUploadProgress(progress);
                            setSuccessModal(true);
                            return response;
                        }
                    })
                    .catch((error) => {
                        console.error('API Error:', error);
                        setErrStatus('An error occurred while uploading. Please try again.');
                        setShowModal(true);
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
                setShowModal(true);
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

        const initialOptions = header?.map((headerText) => headerText);
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

            // Assuming the columns you want to find are "firstName," "lastName," and "number"
            const columnsToFind = ["firstName", "lastName", "number"];
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
            const firstNameIndex = columnIndices["firstName"];
            const lastNameIndex = columnIndices["lastName"];
            const numberIndex = columnIndices["number"];

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
            <ToastContainer />
            <Modal show={showModalEdit} onHide={() => setShowModalEdit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="First Name"
                                value={formData?.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Last Name"
                                value={formData?.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>number</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="First Name"
                                value={formData?.number}
                                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={formData?.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="gender"
                                value={formData?.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Country"
                                value={formData?.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            />
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalEdit(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateInput}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
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
                            <label>number:</label>
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
                                        onChange={(e) => handleOptionSelect("firstName", e.target.value)}
                                        value={selectedOptions.includes("firstName") ? "firstName" : ""}
                                    >
                                        {selectedOptions.includes("firstName") ? (
                                            <option value="firstName">First Name</option>
                                        ) : (
                                            <option value="">firstName</option>
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
                                        onChange={(e) => handleOptionSelect("lastName", e.target.value)}
                                        value={selectedOptions.includes("lastName") ? "lastName" : ""}
                                    >
                                        {selectedOptions.includes("lastName") ? (
                                            <option value="lastName">Last Name</option>
                                        ) : (
                                            <option value="">lastName</option>
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
                            <label>number:</label>
                            {header?.length > 0 && (
                                <div>
                                    <select
                                        onChange={(e) => handleOptionSelect("number", e.target.value)}
                                        value={selectedOptions.includes("number") ? "number" : ""}
                                    >
                                        {selectedOptions.includes("number") ? (
                                            <option value="number">number</option>
                                        ) : (
                                            <option value="">number</option>
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
                                        onChange={(e) => handleOptionSelect("gender", e.target.value)}
                                        value={selectedOptions.includes("gender") ? "gender" : ""}
                                    >
                                        {selectedOptions.includes("gender") ? (
                                            <option value="gender">Gender</option>
                                        ) : (
                                            <option value="">Gender</option>
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
                                        onChange={(e) => handleOptionSelect("email", e.target.value)}
                                        value={selectedOptions.includes("email") ? "email" : ""}
                                    >
                                        {selectedOptions.includes("email") ? (
                                            <option value="email">Email</option>
                                        ) : (
                                            <option value="">Email</option>
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
                                        onChange={(e) => handleOptionSelect("country", e.target.value)}
                                        value={selectedOptions.includes("country") ? "country" : ""}
                                    >
                                        {selectedOptions.includes("country") ? (
                                            <option value="country">Country</option>
                                        ) : (
                                            <option value="">Country</option>
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
                            <Col></Col>
                            <Col sm={11} md={12} lg={12} xxl={11} xl={11} className='Backdrop-myContact2' style={{ paddingBottom: '10px' }}>
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
                                                        className={filteredData === excelData ? 'selected-btn' : 'unselected-dropdown_2'}
                                                        onClick={handleFilterAllClick}
                                                    >
                                                        All
                                                    </button>
                                                    <Dropdown>
                                                        <Dropdown.Toggle
                                                            className={filteredData === 'Gender' ? 'selected-btn' : 'unselected-dropdown_2'}
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
                                                            className={filteredData === 'Country' ? 'selected-btn' : 'unselected-dropdown_2'}
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
                            <Col sm={1}></Col>
                            <Col md={11} lg={12} xxl={11} xl={11} className='Backdrop-myContact2' style={{ padding: "10px" }}>
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
                                            {allContacts?.length === 0 ? (
                                                <p>No data found</p>
                                            ) : (
                                                allContacts?.map((row, index) => (
                                                    <table>
                                                        <tbody className='tbody-font-style' style={{ marginBottom: "0", tableLayout: "fixed", color: "white" }}>
                                                            <tr key={row._id}>
                                                                <td className='td_min_sNo_width'>{index + 1}</td>
                                                                <td className='td_min_width'>{row?.firstName}</td>
                                                                <td className='td_min_width'>{row?.lastName || ''}</td>
                                                                <td className='td_min_width'>{row?.number}</td>
                                                                <td className='td_min_width'>{row?.email || ''}</td>
                                                                <td className='td_min_width'>{row?.gender || ''}</td>
                                                                <td className='td_min_width'>{row?.country || ''}</td>
                                                                <td className='td_min_width'>
                                                                    <FontAwesomeIcon
                                                                        icon={faEdit}
                                                                        style={{ cursor: 'pointer', marginRight: '10px' }}
                                                                        onClick={() => openEditModal(row)}
                                                                    />
                                                                    <FontAwesomeIcon
                                                                        icon={faTrash}
                                                                        style={{ cursor: 'pointer' }}
                                                                        onClick={() => deleteContact(row?._id)}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    // ))
                                                ))
                                            )}
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
