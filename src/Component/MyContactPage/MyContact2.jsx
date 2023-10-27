import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row, Dropdown, Table, Form } from 'react-bootstrap';
import './myContact.css';
import "./myContact2.css";
import * as XLSX from 'xlsx';
import { FaSearch } from 'react-icons/fa';
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Sidebar2 from './../Dashboard2/Sidebar/Sidebar2';
import bgImg1 from "../../../images/bg-img1.jpg";

function MyContact2() {
    const isSidebarOpen = useSelector((state) => state.sideBarStore.sideBarState);

    const [excelData, setExcelData] = useState([]);
    const [uploadTime, setUploadTime] = useState(null); // Store the upload time
    const [searchQuery, setSearchQuery] = useState('');

    const [filteredData, setFilteredData] = useState([]);

    const [rangeValues, setRangeValues] = useState([0, 100]);
    const [tooltipPosition, setTooltipPosition] = useState(null);

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

                    // Set the upload time to the current date and time
                    const newExcelData = excelData?.map(() => {
                        const currentTime = new Date();
                        const localTime = currentTime.toLocaleString(); // Get the local date and time
                        return { Date: currentTime, localTime }; // Add an object with Date and localTime properties
                    });
                    setUploadTime(newExcelData)

                    setExcelData(excelData);
                    setFilteredData(newExcelData);
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

    const handleFilterAgeChange = (newValues) => {
        console.log('New Age Values:', newValues); // Log the newValues
        // Filter data based on age range
        const filteredData = excelData?.filter((row) => {
            const age = parseInt(row[3]); // Age is at index 3 according to excel file
            if (!isNaN(age)) {
                return age >= newValues[0] && age <= newValues[1];
            }
            return false; // Exclude rows with invalid age values
        });

        console.log('Filtered Data:', filteredData); // Log the filteredData
        setFilteredData(filteredData);
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

    console.log(excelData, 'asad');
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
                    <Col sm="12" md="11" lg="11" xl="11" xxl="11" className='Backdrop-myContact2'>
                        <Row className='mob-row width-100' style={{ marginBottom: '20px', marginLeft: '10px', width: '99%' }}>
                            <Col>
                                <div className='card-drop-style'>
                                    <h1 style={{ padding: '10px', paddingTop: '20px', fontWeight: '600', color: "white" }}>
                                        My Contacts
                                    </h1>
                                    <span className='hide-ex-main-btn'>
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
                                                            className={filteredData === 'Age' ? 'selected-btn' : 'unselected-dropdown'}
                                                            id="filterDropdown"
                                                        >
                                                            Age
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className='menuAge'>
                                                            <RangeSlider
                                                                min={0}
                                                                max={100}
                                                                step={1}
                                                                rangeValues={rangeValues}
                                                                id="range-slider-gradient"
                                                                className="margin-lg"
                                                                onChange={(newValues) => {
                                                                    console.log('RangeSlider onChange:', newValues);
                                                                    setRangeValues(newValues);
                                                                    handleFilterAgeChange(newValues);
                                                                }}
                                                            // onClick={() => {
                                                            //     console.log('Slider Clicked'); // Add this line
                                                            // }}
                                                            />

                                                            {/*                                                             <div className='range-values'>
                                                                <span>{rangeValues[0]}</span> - <span>{rangeValues[1]}</span>
                                                            </div> */}

                                                        </Dropdown.Menu>
                                                    </Dropdown>
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
                        <div>
                            <Row className='mob-row width-100' style={{ marginBottom: '20px', marginLeft: '10px', width: '99%' }}>
                                <Col>
                                    {filteredData?.length === 0 ? (
                                        <>
                                            <p className='Not-Found-style'>No Data Found!!!</p>
                                        </>
                                    ) : (
                                        <>
                                            <thead style={{ marginBottom: "0", tableLayout: "fixed" }}>
                                                <tr style={{ color: "#888" }} className='th-font-style'>
                                                    <th style={{ width: "5%" }}>No</th>
                                                    <th style={{ width: "15%", textAlign: 'center' }}>Date & Time</th>
                                                    <th>Name</th>
                                                    {/* <th>LastName</th> */}
                                                    <th>Email</th>
                                                    <th>Age</th>
                                                    <th>Gender</th>
                                                    <th>Country</th>
                                                    <th>Phone</th>
                                                    <th style={{ width: "15%" }}>Description</th>
                                                </tr>
                                            </thead>
                                            {filteredData?.map((row, index) => (
                                                <tbody className='tbody-font-style' style={{ marginBottom: "0", tableLayout: "fixed" }}>
                                                    <tr key={index}>
                                                        <td style={{ width: "4%", textAlign: 'center' }}>{index + 1}</td>
                                                        <td style={{ width: "15%", textAlign: 'center' }}>{uploadTime[index]?.Date?.toLocaleString()}</td>
                                                        <td style={{ textAlign: 'center' }}>{row[0]}</td>
                                                        {/* <td style={{ textAlign: 'center' }}>{row[1]}</td> */}
                                                        <td style={{ width: "12%" }}>{row[2]}</td>
                                                        <td style={{ width: "5%" }}>{row[3]}</td>
                                                        <td>{row[4]}</td>
                                                        <td>{row[5]}</td>
                                                        <td>{row[6]}</td>
                                                        <td style={{ width: "15%" }}>{row[7]}</td>
                                                    </tr>
                                                </tbody>
                                            ))}
                                        </>
                                    )}
                                </Col>
                            </Row >
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default MyContact2;
