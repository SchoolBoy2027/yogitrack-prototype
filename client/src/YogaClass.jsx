import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import addButton from "./assets/btn-Add.png";
import editButton from "./assets/editButton.png";
import PersonSelect from "./components/PersonSelect";
import DDTable from "./components/DDTable";


/**
 * ViewYogaClass()
 * @returns List of YogaClasses
 */

function ViewYogaClass2() {

    const [yoga_classes, setYogaClasses] = useState([]);

    useEffect(() => {

        fetch("/api/yoga_classes")
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
     *  getEditRoute()
     * @returns routing string
     */
    function getEditRoute() {
        return "/YogaClass/Edit/";
    }
    /**
     *  getAddRoute()
     * @returns routing string
     */

    function getAddRoute() {
        return "/YogaClass/Add/";
    }

    return (
        <>
            <div className="container-fluid">
                <div className="container-fluid fs-1 bg-dark text-white fw-bold left">
                    <div className="col-12" >
                        <a href={getAddRoute()}  ><img className="addButton" alt="Missing" src={addButton} title="Add YogaClass" /> </a>
                        View Yoga Classes
                    </div>
                </div>

                <DDTable
                    data={yoga_classes}
                    actionPath={(row) => `/YogaClass/Edit/${row.yoga_class_id}`}
                    actionImage={editButton}
                />



            </div>

        </>
    );
}

 const handleChange = (e) => {       //experiment with this
        const value = e.target.value;
        const text = e.target.options[e.target.selectedIndex].text;
    }
/**
 * CreateYogaClass(action, id)
 * @param {*} action 
 * @returns 
 */
function CreateYogaClass(action, id) {
    const submitYogaClass = async () => {
        const form = document.getElementById("modClass");

        const formData = new FormData(form);
        const instructor = document.getElementById("instructor_id");
        const class_type = document.getElementById("class_type");

        const yoga_class = {
            yoga_class_id: 999,            //replaced at the server route
            yoga_class_type: class_type.options[class_type.selectedIndex].text,
            yoga_class_date: formData.get("class_date"),
            instructor_id: instructor.value,
            instructor_name: instructor.options[instructor.selectedIndex].text,
            start_time: new Date(`${formData.get("class_date")}T${formData.get("start_time")}`),
            end_time: new Date(`${formData.get("class_date")}T${formData.get("end_time")}`),
        };

        console.log("Sending yoga_class:", yoga_class);
        let msg = document.getElementById("response");
        try {
            const response = await fetch("/api/yoga_classes", {
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
                            <label htmlFor="class_type" className="formLabel fs-6 fw-bold">Type</label>
                        </div>
                        <div className="col-4">
                            <select id="class_type" name="class_type" className="formInput ">
                                <option value="General" >General</option>
                                <option value="Senior" >Special</option>
                            </select>
                        </div>
                        <div className="col-2">
                            <label htmlFor="class_date" className="formLabel fs-5 fw-bold">Date:</label>
                        </div>
                        <div className="col-4">
                            <input type="date" name="class_date" id="class_date" className="formInput" />
                        </div>

                    </div>

                    <div className="row pb-1 border-bottom border-dark border-solid">
                        <PersonSelect               /* columns are built in */
                            endpoint="/api/users/instructors"
                            label="Instructor"
                            onChange={handleChange}
                        />

                    </div>

                    <div className="row p-3 border-bottom border-dark  border-solid">
                        <div className="col-2">
                            <label htmlFor="start_time" className="formLabel fs-5 fw-bold">Start Time:</label>
                        </div>
                        <div className="col-4">
                            <input type="time" name="start_time" id="start_time" className="formInput" />
                        </div>
                        <div className="col-2">
                            <label htmlFor="end_time" className="formLabel fs-5 fw-bold">End Time:</label>
                        </div>
                        <div className="col-4">
                            <input type="time" name="end_time" id="end_time" className="formInput" />
                        </div>
                    </div>

                    <div className="row p-3 border-bottom border-dark  border-solid">
                        <div className="col-9">
                        </div>
                        <div className="col-2">
                            <button className="btn btn-dark fs-5 fw-bold" type="button" onClick={submitYogaClass}>Submit</button>
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

  const formatDate = (value) => {
    return new Date(value).toLocaleDateString("en-CA");
};

    const formatTime = (value) => {
        return new Date(value).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });
    };

    const updateYogaClass = async () => {
        const form = document.getElementById("modClass");

        const formData = new FormData(form);
        const instructor=document.getElementById("instructor_id");

    const yoga_class = {
            yoga_class_id: formData.get("yoga_class_id"),            //replaced at the server route
            yoga_class_type: class_type.options[class_type.selectedIndex].text,
            yoga_class_date: formData.get("class_date"),
            instructor_id: instructor.value,
            instructor_name: instructor.options[instructor.selectedIndex].text,
            start_time: new Date(`${formData.get("class_date")}T${formData.get("start_time")}`),
            end_time: new Date(`${formData.get("class_date")}T${formData.get("end_time")}`),
        };

        console.log("Updating yoga_class:", yoga_class);

        try {
            const response = await fetch(
                `/api/yoga_classes/${yoga_class.yoga_class_id}`,
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
                `/yoga_classes/${yoga_class.yoga_class_id}`,
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

        fetch(`/api/yoga_classes/${id}`)
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
                <>
                    <div className="userForm pb-1 rounded m-5" >
                        <div id="response" className="ajaxReturnMsg"></div>

                        <form id="modClass" className="classForm" action="doitUser">
                            <div className="row pb-1 border-bottom border-dark border-solid">
                                <div className="col-1">
                                    <div className="logo"></div>
                                </div>
                                <div className="col-10">
                                    <p className="p-3 fs-3 fw-bold text-white">Update Yoga Class </p>
                                </div>
                                <div className="col-1 fs-3 pr-3 fw-bold text-white  order-dark border-solid" title="Return to View">
                                    <a href="/YogaClass/View">
                                        <div className="btnClose FS5 text text-white">X</div>
                                    </a>
                                </div>
                            </div>
                            <div className="row pb-1 border-bottom border-dark border-solid">
                                <div className="col-4">
                                    <label htmlFor="yoga_class_id" className="formLabel fs-5 fw-bold">Yoga Class ID:</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" name="yoga_class_id" id="yoga_class_id" className="formInput"
                                        value={yoga_class.yoga_class_id}
                                    />
                                </div>
                            </div>
                              
                            <div className="row pb-1 border-bottom border-dark border-solid">
                            
                                <div className="col-2">
                                    <label htmlFor="class_type" className="formLabel fs-5 fw-bold">Type</label>
                                </div>
                                <div className="col-2">
                                    <select id="class_type" name="class_type" className="formInput" defaultValue={yoga_class.yoga_class_type}>
                                        <option value="Senior" >Senior</option>
                                        <option value="General" >General</option>
                                    </select>
                                </div>
                                <div className="col-2">
                                    <label htmlFor="class_date" className="formLabel fs-5 fw-bold">Date:</label>
                                </div>
                                <div className="col-4">
                                    <input type="date" name="class_date" id="class_date" className="formInput"
                                        defaultValue={formatDate(yoga_class.yoga_class_date)}
                                    />
                                </div>

                            </div>

                            <PersonSelect               /* columns are built in */
                                    endpoint="/api/users/instructors"
                                    label="Instructor"
                                    onChange={handleChange}
                                    value={yoga_class.instructor_id}
                                    />

                            <div className="row p-3 border-bottom border-dark  border-solid">
                                <div className="col-2">
                                    <label htmlFor="start_time" className="formLabel fs-5 fw-bold">Start Time:</label>
                                </div>
                                <div className="col-4">
                                    <input type="time" name="start_time" id="start_time" className="formInput"
                                        defaultValue={formatTime(yoga_class.start_time)}/>
                                </div>
                                <div className="col-2">
                                    <label htmlFor="end_time" className="formLabel fs-5 fw-bold">End Time:</label>
                                </div>
                                <div className="col-4">
                                    <input type="time" name="end_time" id="end_time" className="formInput"
                                        defaultValue={formatTime(yoga_class.end_time)} />
                                </div>
                            </div>

                            <div className="row p-3 border-bottom border-bg-light  border-solid">
                                <div className="col-5">
                                    <button className="btn btn-dark fs-5 fw-bold delete" title="You sure about this, customers get mad!?!?!?" type="button" onClick={deleteYogaClass}>Delete Yoga Class</button>
                                </div>
                                <div className="col-2">
                                </div>
                                <div className="col-5">
                                    <button className="btn btn-dark fs-5 fw-bold update" title="Customers love more classes!" type="button" onClick={updateYogaClass}>Update Yoga Class</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </>
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
            return <ViewYogaClass2 />;

        default:
            return <ViewYogaClass2 />;
    }
}

function YogaClass() {
    const { action, id } = useParams();

    return YogaClassAction(action, id);
}


export default YogaClass;
