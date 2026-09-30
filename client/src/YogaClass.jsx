


/**
 *   CUDYogaClass(arrInstructors)
 * @param {*} arrInstructors 
 * @returns 
 */
function CUDYogaClass() {
    /* todo change instructor to select box */
    return (
        <>
            <div className="userForm pb-1 rounded m-5" >
                <div id="response" className="ajaxReturnMsg"></div>

                <form id="modClass" className="classForm" action="doitUser">
                    <div className="row pb-1 border-bottom border-dark border-solid">
                        <div className="col-1">
                            <div className="logo"></div>
                        </div>
                        <div className="col-10">
                            <p className="p-3 fs-3 fw-bold text-white">Create Yoga Class</p>
                        </div>
                        <div className="col-1 fs-3 pr-3 fw-bold text-white  order-dark border-solid" title="Not functional yet">
                            <a href="/YogaClass/View">
                                <div className="btnClose FS5 text text-white">X</div>
                            </a>
                        </div>
                    </div>

                    <div className="row pb-1 border-bottom border-dark border-solid">
                        <div className="col-2">
                            <label for="type" className="formLabel fs-6 fw-bold">Type</label>
                        </div>
                        <div className="col-4">
                            <select id="role" name="type" className="formInput ">
                                <option value="Senior" >Senior</option>
                                <option value="General" >General</option>
                            </select>
                        </div>
                        <div className="col-2">
                            <label for="date_of_class" className="formLabel fs-5 fw-bold">Date:</label>
                        </div>
                        <div className="col-4">
                            <input type="date" name="date_of_class" id="date_of_class" className="formInput" />
                        </div>

                    </div>

                    <div className="row pb-1 border-bottom border-dark border-solid">
                        <div className="col-3">
                            <label for="Instructor" className="formLabel fs-5 fw-bold">Instructor:</label>
                        </div>
                        <div className="col-8">
                            <select id="role" name="YogaClass" className="formInput fs-6">
                                <option value="Terry" >Terry</option>
                                <option value="Tina" >Tina</option>
                                <option value="Theresa" >Teresa</option>
                                <option value="Tracy" >Tracy</option>
                            </select>
                        </div>
                    </div>

                    <div className="row p-3 border-bottom border-dark  border-solid">
                        <div className="col-2">
                            <label for="start_time" className="formLabel fs-5 fw-bold">Start Time:</label>
                        </div>
                        <div className="col-4">
                            <input type="time" name="start_time" id="start_time" className="formInput" />
                        </div>
                        <div className="col-2">
                            <label for="end_date" className="formLabel fs-5 fw-bold">End Time:</label>
                        </div>
                        <div className="col-4">
                            <input type="time" name="end_time" id="end_time" className="formInput" />
                        </div>
                    </div>

                    <div className="row p-3 border-bottom border-dark  border-solid">
                        <div className="col-9">
                        </div>
                        <div className="col-2">
                            <button className="btn btn-dark fs-5 fw-bold" type="button" onClick="">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </>

    );
}



import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function UpdateYogaClass() {

    const { id } = useParams();

    const [yoga_class, setYogaClass] = useState(null);

    useEffect(() => {

        fetch(`http://localhost:5000/api/yoga_classes/${id}`)
            .then((response) => {
                console.log("Status:", response.status);

                return response.json();
            })
            .then((data) => {
                console.log("YogaClass:", data);
                setYogaClass(data);
            })
            .catch((error) => {
                console.error("Error fetching yoga_class:", error);
            });

    }, [id]);

    return (
        <div>
            <h1>YogaClass</h1>

            {yoga_class && (
                <div>
                    <p>ID: {yoga_class.yoga_class_id}</p>
                    <p>First Name: {yoga_class.fname}</p>
                    <p>Last Name: {yoga_class.lname}</p>
                    <p>Email: {yoga_class.email}</p>
                    <p>Phone: {yoga_class.phone}</p>
                </div>
            )}
        </div>
    );
}

/**
 * ViewYogaClass()
 * @returns List of YogaClasses
 */

function ViewYogaClass() {

    const [yoga_classes, setYogaClasses] = useState([]);

    useEffect(() => {

        fetch("http://localhost:5000/api/yoga_classes")
            .then((response) => {
                console.log("Status:", response.status);
                console.log("Content-Type:", response.headers.get("content-type"));

                return response.json();
            })
            .then((data) => {
                console.log("YogaClasses:", data);
                setYogaClasses(data);
            })
            .catch((error) => {
                console.error("Error fetching yoga_classes:", error);
            });

    }, []);

    /**
     *  getEditButton()
     * @returns routing string
     */
    function getEditButton() {
        return "/YogaClass/Edit/";
    }
    /**
     *  getAddButton()
     * @returns routing string
     */

    function getAddButton() {
        return "/YogaClass/Add/";
    }

    /**
     * getEditIcon()
     * @returns image string
     */

    function getEditIcon() {
        return "/src/assets/editButton.png";
    }


    function getAddIcon() {
        return "/src/assets/btn-Add.png";
    }
    return (
        <>
            <div className="container-fluid">
                <div className="container-fluid fs-1 bg-dark text-white fw-bold left">
                    <div className="col-12" >
                        <a href={getAddButton()}  ><img className="addButton" alt="Missing" src={getAddIcon()} title="Add YogaClass" /> </a>
                        View Yoga Classes
                    </div>
                </div>


                <table id="yogaTable" className=" mt-1  table table-primary overflow-scroll sticky-top">
                    <thead >
                        <tr className="bg-bg-dark">
                            <th>ID</th>
                            <th>Class Type</th>
                            <th>Date</th>
                            <th>Instructor</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {yoga_classes.map((yoga_class) => (
                            <tr key={yoga_class.yoga_class_id}>
                                <td> {yoga_class.yoga_class_id}</td>
                                <td>{yoga_class.class_type}</td>
                                <td>{yoga_class.date}</td>
                                <td>{yoga_class.instructor_id}</td>
                                <td>{yoga_class.start_time}</td>
                                <td>{yoga_class.end_time}</td>
                                <td><a href={getEditButton() + yoga_class.yoga_class_id} title={'Edit ' + yoga_class.fname + ' ' + yoga_class.lname} ><img className="editButton" alt="Missing" src={getEditIcon()} /> </a></td>

                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>

        </>
    );
}
//    
//    ${id}

/**
 * CreateYogaClass(action, id)
 * @param {*} action 
 * @returns 
 */
function CreateYogaClass(action, id) {

    const submitYogaClass = async () => {
        const form = document.getElementById("modClass");

        const formData = new FormData(form);

        const yoga_class = {
            yoga_class_id: formData.get("yoga_class_id"),
            class_type: formData.get("class_type"),
            date: formData.get("class_date"),
            instructor_id: formData.get("instructor"),
            start_time: formData.get("city"),
            end_time: formData.get("state"),
        };

        console.log("Sending yoga_class:", yoga_class);
        let msg = document.getElementById("response");
        try {
            const response = await fetch("http://localhost:5000/api/yoga_classes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(yoga_class)
            });

            const data = await response.json();

            console.log("Server response:", data);


            if (response.ok) {
                msg.innerHTML = "YogaClass saved successfully!";
            } else {
                msg.innerHTML = "Error: " + data.message;
            }

        } catch (error) {
            console.error("Error saving yoga_class:", error);
            msg.innerHTML = "Could not connect to the server.";
        }
    };

    return (
        <>
            <div className="userForm pb-1 rounded m-5" >
                <div id="response" className="ajaxReturnMsg"></div>

                <form id="modClass" className="classForm" action="doitUser">
                    <div className="row pb-1 border-bottom border-dark border-solid">
                        <div className="col-1">
                            <div className="logo"></div>
                        </div>
                        <div className="col-10">
                            <p className="p-3 fs-3 fw-bold text-white">Create Yoga Class</p>
                        </div>
                        <div className="col-1 fs-3 pr-3 fw-bold text-white  order-dark border-solid" title="Not functional yet">
                            <a href="/YogaClass/View">
                                <div className="btnClose FS5 text text-white">X</div>
                            </a>
                        </div>
                    </div>

                    <div className="row pb-1 border-bottom border-dark border-solid">
                        <div className="col-2">
                            <label for="type" className="formLabel fs-6 fw-bold">Type</label>
                        </div>
                        <div className="col-4">
                            <select id="role" name="type" className="formInput ">
                                <option value="Senior" >Senior</option>
                                <option value="General" >General</option>
                            </select>
                        </div>
                        <div className="col-2">
                            <label for="date_of_class" className="formLabel fs-5 fw-bold">Date:</label>
                        </div>
                        <div className="col-4">
                            <input type="date" name="date_of_class" id="date_of_class" className="formInput" />
                        </div>

                    </div>

                    <div className="row pb-1 border-bottom border-dark border-solid">
                        <div className="col-3">
                            <label for="Instructor" className="formLabel fs-5 fw-bold">Instructor:</label>
                        </div>
                        <div className="col-8">
                            <select id="role" name="YogaClass" className="formInput fs-6">
                                <option value="Terry" >Terry</option>
                                <option value="Tina" >Tina</option>
                                <option value="Theresa" >Teresa</option>
                                <option value="Tracy" >Tracy</option>
                            </select>
                        </div>
                    </div>

                    <div className="row p-3 border-bottom border-dark  border-solid">
                        <div className="col-2">
                            <label for="start_time" className="formLabel fs-5 fw-bold">Start Time:</label>
                        </div>
                        <div className="col-4">
                            <input type="time" name="start_time" id="start_time" className="formInput" />
                        </div>
                        <div className="col-2">
                            <label for="end_date" className="formLabel fs-5 fw-bold">End Time:</label>
                        </div>
                        <div className="col-4">
                            <input type="time" name="end_time" id="end_time" className="formInput" />
                        </div>
                    </div>

                    <div className="row p-3 border-bottom border-dark  border-solid">
                        <div className="col-9">
                        </div>
                        <div className="col-2">
                            <button className="btn btn-dark fs-5 fw-bold" type="button" onClick="">Submit</button>
                        </div>
                    </div>
                </form>
            </div>

        </>
    );
}
/**
 * UpdateDeleteYogaClass(action, id)
 * @param {*} action 
 * @returns 
 */
function UpdateDeleteYogaClass(action) {
    let msg = document.getElementById("response");

    /**
     * submit yoga_class Updates
     */
    const updateYogaClass = async () => {
        const form = document.getElementById("modClass");

        const formData = new FormData(form);

        const yoga_class = {
            yoga_class_id: formData.get("yoga_class_id"),
            class_type: formData.get("class_type"),
            date: formData.get("class_date"),
            instructor_id: formData.get("instructor"),
            start_time: formData.get("city"),
            end_time: formData.get("state"),
        };

        console.log("Updating yoga_class:", yoga_class);

        try {
            const response = await fetch(
                `http://localhost:5000/api/yoga_classes/${yoga_class.yoga_class_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(yoga_class)
                }
            );
            const data = await response.json();
            if (response.ok) {
                msg.innerHTML = "YogaClass saved successfully!";
            } else {
                msg.innerHTML = "Error: " + data.message;
            }

        } catch (error) {
            console.error("Error saving yoga_class:", error);
            msg.innerHTML = "Error saving yoga_class:", error;
        }
    };

    /**
     * deletes the yoga_class by ID
     */
    const deleteYogaClass = async () => {
        const form = document.getElementById("modClass");

        const formData = new FormData(form);

        const yoga_class = {
            yoga_class_id: formData.get("yoga_class_id"),
        };

        console.log("Deleting yoga_class:", yoga_class);

        try {
            const response = await fetch(
                `http://localhost:5000/api/yoga_classes/${yoga_class.yoga_class_id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const data = await response.json();

            console.log("Server response:", data);

            if (response.ok) {
                msg.innerHTML = "YogaClass saved successfully!";
            } else {
                msg.innerHTML = "Error: " + data.message;
            }

        } catch (error) {
            console.error("Error saving yoga_class:", error);
            msg.innerHTML = "Could not connect to the server.";
        }
    }

    /**
     * retrieves the data for the form
     */
    const { id } = useParams();     /* this is the retrieval      */

    const [yoga_class, setYogaClass] = useState(null);

    useEffect(() => {

        fetch(`http://localhost:5000/api/yoga_classes/${id}`)
            .then((response) => {
                console.log("Status:", response.status);

                return response.json();
            })
            .then((data) => {
                setYogaClass(data);
            })
            .catch((error) => {
                console.error("Error fetching yoga_class:", error);
            });

    }, [id]);

    return (
        <>
            {yoga_class && (
                <div className="userForm pb-1 rounded m-5" >
                    <div id="response" className="ajaxReturnMsg"></div>

                    <form id="modClass" className="classForm" action="doitUser">
                        <div className="row pb-1 border-bottom border-dark border-solid">
                            <div className="col-1">
                                <div className="logo"></div>
                            </div>
                            <div className="col-10">
                                <p className="p-3 fs-3 fw-bold text-white">Create Yoga Class</p>
                            </div>
                            <div className="col-1 fs-3 pr-3 fw-bold text-white  order-dark border-solid" title="Not functional yet">
                                <a href="/YogaClass/View">
                                    <div className="btnClose FS5 text text-white">X</div>
                                </a>
                            </div>
                        </div>

                        <div className="row pb-1 border-bottom border-dark border-solid">
                            <div className="col-2">
                                <label for="type" className="formLabel fs-6 fw-bold">Type</label>
                            </div>
                            <div className="col-4">
                                <select id="role" name="type" className="formInput ">
                                    <option value="Senior" >Senior</option>
                                    <option value="General" >General</option>
                                </select>
                            </div>
                            <div className="col-2">
                                <label for="date_of_class" className="formLabel fs-5 fw-bold">Date:</label>
                            </div>
                            <div className="col-4">
                                <input type="date" name="date_of_class" id="date_of_class" className="formInput" />
                            </div>

                        </div>

                        <div className="row pb-1 border-bottom border-dark border-solid">
                            <div className="col-3">
                                <label for="Instructor" className="formLabel fs-5 fw-bold">Instructor:</label>
                            </div>
                            <div className="col-8">
                                <select id="role" name="YogaClass" className="formInput fs-6">
                                    <option value="Terry" >Terry</option>
                                    <option value="Tina" >Tina</option>
                                    <option value="Theresa" >Teresa</option>
                                    <option value="Tracy" >Tracy</option>
                                </select>
                            </div>
                        </div>

                        <div className="row p-3 border-bottom border-dark  border-solid">
                            <div className="col-2">
                                <label for="start_time" className="formLabel fs-5 fw-bold">Start Time:</label>
                            </div>
                            <div className="col-4">
                                <input type="time" name="start_time" id="start_time" className="formInput" />
                            </div>
                            <div className="col-2">
                                <label for="end_date" className="formLabel fs-5 fw-bold">End Time:</label>
                            </div>
                            <div className="col-4">
                                <input type="time" name="end_time" id="end_time" className="formInput" />
                            </div>
                        </div>

                        <div className="row p-3 border-bottom border-dark  border-solid">
                            <div className="col-9">
                            </div>
                            <div className="col-2">
                                <button className="btn btn-dark fs-5 fw-bold" type="button" onClick="">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

        </>
    );
}

function YogaClassAction(action, id) {
    switch (action) {
        case "Add":
            return <CreateYogaClass action="Add" id={id} />;

        case "Edit":
            return <UpdateDeleteYogaClass action="Update" id={id} />;

        case "View":
            return <ViewYogaClass />;

        default:
            return <ViewYogaClass />;
    }
}

function YogaClass() {
    const { action, id } = useParams();

    return YogaClassAction(action, id);
}


export default YogaClass;

/*
       function Add() {
        return (
            <h2>I am a Add!</h2>
        );
        }

        function Modify() {
        return (
            <h2>I am Modify!</h2>
        );
        }

        function View() {
        return (
            <>
            <h1>I am View?</h1>
            </>
        );
        }

        */