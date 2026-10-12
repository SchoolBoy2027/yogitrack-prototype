import React from 'react';
import { useEffect, useState } from "react";
import addButton from "./assets/btn-Add.png";
import YogaClassSelect from "./components/YogaClassSelect";

import DBF from "./library/DBF";

import FormHelp from "./library/FormHelp";

/**
 * CreateAttendanceList()
 * When the YogaClass select generates a list of classes for the day and a yoga_class is selected.
 * Then attendance list generates a list of eligible customers by filtering the list 
 * based on the yoga_class_type and class balance in the customer collection
 * If you're not on the list, you don't get to attend the class.  
 * 
 * @returns List of Customers
 */

function CreateAttendanceList() {
    const [formData, setFormData] = useState({
        yoga_class_id: "",
        yoga_class_type: "",
        yoga_class_date: "",
        start_time: "",
        end_time: "",
        instructor_id: "",
        instructor_name: "",

        customers: [],
    });

    const [customers, setCustomers] = useState([]);
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);

    const form = document.getElementById("modClass");


    const submitAttendanceList = async (event) => {

        const responseMsg = document.getElementById("response");
        try {
            const attendanceData = {
                yoga_class_id: formData.yoga_class_id,
                yoga_class_type: formData.yoga_class_type,
                yoga_class_date: formData.yoga_class_date,
                instructor_id: formData.instructor_id,
                instructor_name: formData.instructor_name,
                start_time: formData.start_time,
                end_time: formData.end_time,
                customers: selectedCustomers.map((customer) => ({
                    customer_id: customer.customer_id,
                    fname: customer.fname,
                    last_name: customer.lname,
                    balance: customer.balance
                }))
            };

            const response = await fetch("/api/attendance", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(attendanceData)
            });

            await FormHelp.ErrCheckThrow(response, "submitAttendanceList");

            const data = await response.json();

            responseMsg.textContent = data.message || "Attendance submitted successfully.";
        } catch (error) {
            FormHelp.ConsoleErr("Error submitting attendance:", error);
            responseMsg.textContent = error.message;
        }
    };


    const handleChange = (selectedClass) => {
        console.log("selectedClass=", selectedClass);
        setSelectedClass(selectedClass || null);
        setFormData((prev) => ({
            ...prev,
            yoga_class_id: selectedClass?.yoga_class_id || "",
            yoga_class_type: selectedClass?.yoga_class_type || "",
            instructor_id: selectedClass?.instructor_id || "",
            instructor_name: selectedClass?.instructor_name || "",
            yoga_class_date: FormHelp.ToFormInputDateOnly(selectedClass?.yoga_class_date),
            start_time: FormHelp.ToFormInputTimeOnly(selectedClass?.start_time),
            end_time: FormHelp.ToFormInputTimeOnly(selectedClass?.end_time),
        }));
    };

    useEffect(() => {
        if (!selectedClass) {
            setCustomers([]);
            return;
        }

        fetch("/api/customers")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const attendanceCustomers = DBF.getAttendanceCustomers(data, selectedClass);

                console.log("Customers received:", data);
                console.log("Customers eligible for attendance:", attendanceCustomers);

                setCustomers(attendanceCustomers);
            })
            .catch((error) => {
                console.error("Error fetching customers:", error);
            });

    }, [selectedClass]);

    return (
        <>
            <div className="container-fluid mt-5">
                <div className="container-fluid fs-6 bg-bg-transparent text-white  left">
                    <div id="response" className="ajaxReturnMsg"></div>

                    <form id="modClass" className="classForm">

                        <YogaClassSelect value={formData.yoga_class_id} onChange={handleChange} />
                        <div className="row pb-1 border-bottom border-dark border-solid">

                            <div className="col-1">
                                <label htmlFor="yoga_class_id" className="formLabel fs-6 text-right">ID:</label>
                            </div>
                            <div className="col-2 ps-3">
                                <input type="text" name="yoga_class_id" id="yoga_class_id" title="Yoga class ID" className="formInput"
                                    readOnly value={formData.yoga_class_id}
                                />
                            </div>

                            <div className="col-1">
                                <label htmlFor="instructor_id" className="formLabel fs-6 ">Instructor</label>
                            </div>

                            <div className="col-1 ps-3">
                                <input type="text" name="instructor_id" id="instructor_id" title="Instructor ID" className="formInput"
                                    readOnly value={formData.instructor_id}
                                />
                            </div>
                            <div className="col-2 ps-3">
                                <input type="text" name="instructor_name" id="instructor_name" title="Instructor Name" className="formInput"
                                    readOnly value={formData.instructor_name}
                                />
                            </div>
                            <div className="col-1 ps-3">
                                <a >
                                    <img
                                        className="addButton"
                                        alt="Submit Attendance"
                                        src={addButton}
                                        title="Submit Attendance"
                                        onClick={submitAttendanceList}
                                        style={{ cursor: "pointer" }}
                                    />
                                </a>
                            </div>

                        </div>

                        <div className="row pb-1 border-bottom border-dark border-solid">

                            <div className="col-1">
                                <label htmlFor="yoga_class_type" className="formLabel fs-6 ">Type</label>
                            </div>
                            <div className="col-1">
                                <select id="yoga_class_type" name="yoga_class_type" className="formInput" readOnly value={formData.yoga_class_type}>
                                    <option value="Senior" >Senior</option>
                                    <option value="General" >General</option>
                                </select>
                            </div>
                            <div className="col-1">
                                <label htmlFor="class_date" className="formLabel fs-6 ">Date:</label>
                            </div>
                            <div className="col-1">
                                <input type="date" name="yoga_class_date" id="yoga_class_date" className="formInput"
                                    readOnly value={formData.yoga_class_date} />
                            </div>


                            <div className="col-1">
                                <label htmlFor="start_time" className="formLabel fs-6 ">Times:</label>
                            </div>
                            <div className="col-2">
                                <input type="time" name="start_time" id="start_time" className="formInput"
                                    readOnly value={formData.start_time}
                                />
                            </div>
                            <div className="col-2">
                                <input type="time" name="end_time" id="end_time" className="formInput"
                                    readOnly value={formData.end_time}
                                />
                            </div>

                        </div>
                        <div className=" container-fluid " >
                            <table className="table sticky-top table-primary text white table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Present</th>
                                        <th>Customer ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((customer) => (
                                        <tr key={customer.customer_id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCustomers.some(
                                                        (item) => item.customer_id === customer.customer_id
                                                    )}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedCustomers((prev) => [
                                                                ...prev,
                                                                customer
                                                            ]);
                                                        } else {
                                                            setSelectedCustomers((prev) =>
                                                                prev.filter(
                                                                    (item) => item.customer_id !== customer.customer_id
                                                                )
                                                            );
                                                        }
                                                    }}
                                                />
                                            </td>
                                            <td>{customer.customer_id}</td>
                                            <td>{customer.fname}</td>
                                            <td>{customer.lname}</td>
                                            <td>{customer.balance}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
}
function AttendanceList() {
    return <CreateAttendanceList />;
}

export default AttendanceList;

