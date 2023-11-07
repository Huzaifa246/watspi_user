import React, { useState, useEffect } from 'react';
import { Col, Row, Modal, Button, Form } from 'react-bootstrap';
import './groups2.css';
import { FaSearch } from 'react-icons/fa';
import Sidebar2 from '../Dashboard2/Sidebar/Sidebar2';
import bgImg1 from "../../../images/bg1.jpg";
import GetAllGroupsApi from '../../helpers/GetApis/GetAllGroups';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import DelGroupApi from './../../helpers/GetApis/DelGroup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateGroupApi from '../../helpers/PostApis/UpdateGroup';

function Groups2() {
    const [allGroups, setAllGroups] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [groupsIdToDelete, setGroupsIdToDelete] = useState(null);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [updateGroup, setUpdateGroup] = useState([]);

    const [formData, setFormData] = useState({
        groupName: "",
        contactList: "",
        status: "",
        description: "",
    });

    //Get All Groups
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetAllGroupsApi();
                if (Array.isArray(data)) {
                    setAllGroups(data);
                }
            } catch (error) {
                console.error('Error fetching data at groups:', error);
            }
        };

        fetchData();
    }, []);

    //Delete Group
    const deleteGroup = async (id) => {
        try {
            const data = await DelGroupApi(id);
            console.log(data, 'del data');
            toast.success(data?.message);

            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting contact:', error);
            toast.error(error?.message);
        }
    };

    const openUpdateModal = (data) => {
        setFormData(data || {
            groupName: "",
            contactList: "",
            status: "",
            description: "",
            groupId: ""
        });
        if (data) {
            if (data._id) {
                setFormData((prevData) => ({
                    ...prevData,
                    groupId: data._id
                }));
            }
        }
        setShowModalUpdate(true);
    };
    const handleUpdateInput = () => {
        const { groupName, contactList, status, description, groupId } = formData;

        const data = {
            groupName,
            contactList,
            status,
            description,
            groupId,
        };
        console.log(data, 'data')

        UpdateGroupApi(data)
            .then((response) => {
                console.log(response, 'response1')
                if (response?.message === "Group updated successfully") {
                    setUpdateGroup(response?.data)
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
    console.log(allGroups, "allGroups")

    return (
        <>
            <ToastContainer />
            {/* Del Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this contact?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => deleteGroup(groupsIdToDelete)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Update Modal */}
            <Modal show={showModalUpdate} onHide={() => setShowModalUpdate(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Group Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Group Name"
                                value={formData?.groupName}
                                onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contact List</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Contact List"
                                value={formData?.contactList}
                                onChange={(e) => setFormData({ ...formData, contactList: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Check
                                type="switch"
                                id="status-switch"
                                label="Active"
                                checked={formData.status}
                                onChange={() =>
                                    setFormData({ ...formData, status: !formData.status })
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Description"
                                value={formData?.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='Close_btn' onClick={() => setShowModalUpdate(false)}>
                        Close
                    </Button>
                    <Button className='Update_btn' onClick={handleUpdateInput}>
                        Update
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
                    <Col sm="12" md="11" lg="11" xl="11" xxl="11" className='Backdrop-myContact2'>
                        <div>
                            <Row className='mob-row width-100' style={{ marginBottom: '20px', marginLeft: '10px', width: "99%" }}>
                                <Col>
                                    <div className='group2_head_main'>
                                        <h1 style={{ padding: '10px', paddingTop: '20px', fontWeight: '600', color: 'white' }}>
                                            Groups
                                        </h1>
                                        <span style={{ display: 'flex' }}>
                                            <span className="search-groups2">
                                                <FaSearch className="search-icon2" />
                                                <input
                                                    type="text"
                                                    placeholder="Search..."
                                                    className='grp-input-search2'
                                                />
                                            </span>
                                            <span>
                                                <a href="/creategroup2">
                                                    <button
                                                        type='button'
                                                        className='grps2-btn'
                                                    >
                                                        Create Group
                                                    </button>
                                                </a>
                                            </span>
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='mob-row width-100' style={{ marginBottom: '20px', marginLeft: '10px', width: "99%" }}>
                                <Col>
                                    <div className="groups_2_maincontainer">
                                        <thead style={{ marginBottom: "0", tableLayout: "fixed" }}>
                                            <tr style={{ color: "white" }} className='head-gp-tr'>
                                                <th className='td-Sno'>No</th>
                                                <th>Group Name</th>
                                                <th>Contact List</th>
                                                <th>Status</th>
                                                <th>Description</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <div className="groups_2-container">
                                            <table className='groups_2_table'>
                                                {allGroups.map((group, index) => (
                                                    <tr key={index} style={{ marginBottom: "0", tableLayout: "fixed", color: 'white' }}>
                                                        <td className='td-Sno'>{index + 1}</td>
                                                        <td>{group?.groupName}</td>
                                                        <td>
                                                            {group?.contactList?.map((contact, contactIndex) => (
                                                                <li key={contactIndex}>{contact}</li>
                                                            ))}
                                                        </td>
                                                        <td>{group?.status}</td>
                                                        <td>{group?.description}</td>
                                                        <td>
                                                            <FontAwesomeIcon
                                                                icon={faEdit}
                                                                style={{ cursor: 'pointer', marginRight: '10px' }}
                                                                onClick={() => openUpdateModal({ ...group, groupId: group?._id })}
                                                            />
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => {
                                                                    setGroupsIdToDelete(group?._id);
                                                                    setShowDeleteModal(true);
                                                                }}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </table>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div >

        </>
    )
}

export default Groups2
