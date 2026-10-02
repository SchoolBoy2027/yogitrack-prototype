
import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import addButton from "./assets/btn-Add.png";
import editButton from "./assets/editButton.png";

function UpdateCustomer() {

    const { id } = useParams();

    const [customer, setCustomer] = useState(null);

    useEffect(() => {

        fetch(`http://localhost:5000/api/customers/${id}`)
            .then((response) => {
                console.log("Status:", response.status);

                return response.json();
            })
            .then((data) => {
                console.log("Customer:", data);
                setCustomer(data);
            })
            .catch((error) => {
                console.error("Error fetching customer:", error);
            });

    }, [id]);

    return (
        <div>
            <h1>Customer</h1>

            {customer && (
                <div>
                    <p>ID: {customer.customer_id}</p>
                    <p>First Name: {customer.fname}</p>
                    <p>Last Name: {customer.lname}</p>
                    <p>Email: {customer.email}</p>
                    <p>Phone: {customer.phone}</p>
                </div>
            )}
        </div>
    );
}

/**
 * ViewCustomer()
 * @returns List of Customers
 */

function ViewCustomer() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {

        fetch("http://localhost:5000/api/customers")
            .then((response) => {
                console.log("Status:", response.status);
                console.log("Content-Type:", response.headers.get("content-type"));

                return response.json();
            })
            .then((data) => {
                console.log("Customers:", data);
                setCustomers(data);
            })
            .catch((error) => {
                console.error("Error fetching customers:", error);
            });

    }, []);

    /**
     *  getEditButton()
     * @returns routing string
     */
    function getEditButton() {
        return "/Customer/Edit/";
    }
    /**
     *  getAddButton()
     * @returns routing string
     */

    function getAddButton() {
        return "/Customer/Add/";
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
                        <a href={getAddButton()}  ><img className="addButton" alt="Missing" src={addButton} title="Add Customer" /> </a>
                        View Customers
                    </div>
                </div>


                <table id="yogaTable" className=" mt-1  table table-primary overflow-scroll sticky-top">
                    <thead >
                        <tr className="bg-bg-dark">
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip Code</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Preference</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.customer_id}>
                                <td> {customer.customer_id}</td>
                                <td>{customer.fname}</td>
                                <td>{customer.lname}</td>
                                <td>{customer.address}</td>
                                <td>{customer.city}</td>
                                <td>{customer.state}</td>
                                <td>{customer.zip}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.email}</td>
                                <td>{customer.communication_preference}</td>
                                <td><a href={getEditButton() + customer.customer_id} title={'Edit ' + customer.fname + ' ' + customer.lname} ><img className="editButton" alt="Missing" src={editButton} /> </a></td>

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
 * CreateCustomer(action, id)
 * @param {*} action 
 * @returns 
 */
function CreateCustomer(action, id) {

    const submitCustomer = async () => {
        const form = document.getElementById("modClass");

        const formData = new FormData(form);

        const customer = {
            customer_id: formData.get("customer_id"),
            fname: formData.get("fName"),
            lname: formData.get("lName"),
            address: formData.get("address"),
            city: formData.get("city"),
            state: formData.get("state"),
            zip: formData.get("zip_code"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            communication_preference: formData.get("communication"),
            customer_type: formData.get("type")
        };

        console.log("Sending customer:", customer);
        let msg = document.getElementById("response");
        try {
            const response = await fetch("http://localhost:5000/api/customers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(customer)
            });

            const data = await response.json();

            console.log("Server response:", data);


            if (response.ok) {
                msg.innerHTML = "Customer saved successfully!";
            } else {
                msg.innerHTML = "Error: " + data.message;
            }

        } catch (error) {
            console.error("Error saving customer:", error);
            msg.innerHTML = "Could not connect to the server.";
        }
    };

    return (
        <>

            <div className="userForm pb-1 rounded m-5" >
                <div id="response" className="ajaxReturnMsg"></div>

                <form id="modClass" className="classForm">
                    <div className="row pb-1 border-bottom border-dark border-solid">
                        <div className="col-1">
                            <div className="logo"></div>
                        </div>
                        <div className="col-10">
                            <p className="p-3 fs-3 fw-bold text-white">{`${action.action}`} Customer</p>
                        </div>
                        <div className="col-1 fs-3 pr-3 fw-bold text-white  order-dark border-solid" title="Not functional yet">
                            <a href="/Customer/View">
                                <div className="btnClose FS5 text text-white">X</div>
                            </a>
                        </div>
                    </div>
                    <div className="row pb-1 border-bottom border-dark border-solid">

                        <div className="col-3">
                            <label htmlFor="id" className="formLabel fs-6 fw-bold">Customer ID:</label>
                        </div>
                        <div className="col-2">
                            <input type="text" name="customer_id" className="formInput" />
                        </div>
                        <div className="col-3">
                            <label htmlFor="type" className="formLabel fs-5 fw-bold">Customer Type:</label>
                        </div>
                        <div className="col-3">
                            <select id="type" name="type" className="formInput fs-5">
                                <option value="General" >General</option>
                                <option value="Senior" >Senior</option>
                            </select>
                        </div>
                    </div>

                    <div className="row p-3 border-bottom border-dark border-solid  ">
                        <div className="col-4">
                            <label htmlFor="fName" className="formLabel fs-5 fw-bold">First Name:</label>
                        </div>
                        <div className="col-8">
                            <input type="text" name="fName" className="formInput" />
                        </div>
                    </div>
                    <div className="row p-3 border-bottom border-dark border-solid">
                        <div className="col-4 ">
                            <label htmlFor="lName" className="formLabel fs-5 fw-bold">Last Name:</label>
                        </div>
                        <div className="col-8">
                            <input type="text" name="lName" className="formInput" />
                        </div>
                    </div>


                    <div className="row p-3 border-bottom border-dark border-solid">
                        <div className="col-3">
                            <label htmlFor="address" className="formLabel fs-5 fw-bold">Address:</label>
                        </div>
                        <div className="col-9">
                            <input type="text" name="address" className="formInput" />
                        </div>
                    </div>

                    <div className="row p-3 border-bottom border-dark  border-solid">
                        <div className="col-1">
                            <label htmlFor="city" className="formLabel fs-5 fw-bold">City:</label>
                        </div>
                        <div className="col-4">
                            <input type="text" name="city" id="city" className="formInput" />
                        </div>
                        <div className="col-2">
                            <label htmlFor="state" className="formLabel fs-5 fw-bold">State:</label>
                        </div>
                        <div className="col-2">
                            <input type="text" name="state" id="state" className="formInput" />
                        </div>
                        <div className="col-1">
                            <label htmlFor="zip_code" className="formLabel fs-5 fw-bold">Zip Code:</label>
                        </div>
                        <div className="col-2">
                            <input type="text" name="zip_code" className="formInput" />
                        </div>
                    </div>



                    <div className="row p-3 border-bottom border-dark  border-solid">
                        <div className="col-2">
                            <label htmlFor="phone" className="formLabel fs-5 fw-bold">Phone:</label>
                        </div>
                        <div className="col-4">
                            <input type="tel" name="phone" id="phone" className="formInput" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
                        </div>

                        <div className="row p-3 border-bottom border-dark border-solid">
                            <div className="col-2">
                                <label htmlFor="email" className="formLabel fs-5 fw-bold">
                                    Email:
                                </label>
                            </div>

                            <div className="col-10">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="formInput"
                                />
                            </div>
                        </div>

                        <div className="col-3">
                            <label htmlFor="communication" className="formLabel fs-5 fw-bold">Mode of Communication</label>
                        </div>
                        <div className="col-3">
                            <select id="communication" name="communication" className="formInput">
                                <option value="Phone" >Phone</option>
                                <option value="Email" >Email</option>
                            </select>
                        </div>
                    </div>

                    <div className="row p-3 border-bottom border-dark  border-solid">
                        <div className="col-9">
                        </div>
                        <div className="col-2">
                            <button className="btn btn-dark fs-5 fw-bold" type="button" onClick={submitCustomer}>Submit</button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
}
/**
 * UpdateDeleteCustomer(action, id)
 * @param {*} action 
 * @returns 
 */
function UpdateDeleteCustomer(action) {
    let msg = document.getElementById("response");

    /**
     * submit customer Updates
     */
    const updateCustomer = async () => {
        const form = document.getElementById("modClass");

        const formData = new FormData(form);

        const customer = {
            customer_id: formData.get("customer_id"),
            fname: formData.get("fName"),
            lname: formData.get("lName"),
            address: formData.get("address"),
            city: formData.get("city"),
            state: formData.get("state"),
            zip: formData.get("zip_code"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            communication_preference: formData.get("communication"),
            customer_type: formData.get("type")
        };

        console.log("Updating customer:", customer);

        try {
            const response = await fetch(
                `http://localhost:5000/api/customers/${customer.customer_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(customer)
                }
            );
            const data = await response.json();
            if (response.ok) {
                msg.innerHTML = "Customer saved successfully!";
            } else {
                msg.innerHTML = "Error: " + data.message;
            }

        } catch (error) {
            console.error("Error saving customer:", error);
            msg.innerHTML = "Error saving customer:", error;
        }
    };

    /**
     * deletes the customer by ID
     */
    const deleteCustomer = async () => {
        const form = document.getElementById("modClass");

        const formData = new FormData(form);

        const customer = {
            customer_id: formData.get("customer_id"),
        };

        console.log("Deleting customer:", customer);

        try {
            const response = await fetch(
                `http://localhost:5000/api/customers/${customer.customer_id}`,
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
                msg.innerHTML = "Customer saved successfully!";
            } else {
                msg.innerHTML = "Error: " + data.message;
            }

        } catch (error) {
            console.error("Error saving customer:", error);
            msg.innerHTML = "Could not connect to the server.";
        }
    }

    /**
     * retrieves the data for the form
     */
    const { id } = useParams();     /* this is the retrieval      */

    const [customer, setCustomer] = useState(null);

    useEffect(() => {

        fetch(`http://localhost:5000/api/customers/${id}`)
            .then((response) => {
                console.log("Status:", response.status);

                return response.json();
            })
            .then((data) => {
                setCustomer(data);
            })
            .catch((error) => {
                console.error("Error fetching customer:", error);
            });

    }, [id]);

    return (
        <>


            {customer && (
                <div>

                    <div className="userForm pb-1 rounded m-5" >
                        <div id="response" className="ajaxReturnMsg"></div>

                        <form id="modClass" className="classForm">
                            <div className="row pb-1 border-bottom border-dark border-solid">
                                <div className="col-1">
                                    <div className="logo"></div>
                                </div>
                                <div className="col-10">
                                    <p className="p-3 fs-3 fw-bold text-white">{`${action.action}`} Customer</p>
                                </div>
                                <div className="col-1 fs-3 pr-3 fw-bold text-white  order-dark border-solid" title="Not functional yet">
                                    <a href="/Customer/View">
                                        <div className="btnClose FS5 text text-white">X</div>
                                    </a>
                                </div>
                            </div>
                            <div className="row pb-1 border-bottom border-dark border-solid">
                                <div className="col-3">
                                    <label htmlFor="id" className="formLabel fs-5 fw-bold">Customer ID:</label>
                                </div>
                                <div className="col-3">
                                    <input type="text" name="customer_id" className="formInput" value={customer.customer_id} readOnly />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="type" className="formLabel fs-6 fw-bold">Customer Type</label>
                                </div>
                                <div className="col-3">
                                    <select id="type" name="type" className="formInput fs-5">
                                        <option value="General" >General</option>
                                        <option value="Senior" >Senior</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row pb-1 border-bottom border-dark border-solid">
                                <div className="col-2 ">
                                    <label htmlFor="lName" className="formLabel fs-6 fw-bold">Last Name:</label>
                                </div>
                                <div className="col-4">
                                    <input type="text" name="lName" className="formInput" defaultValue={customer.lname} />
                                </div>
                                <div className="col-2">
                                    <label htmlFor="fName" className="formLabel fs-6 fw-bold">First Name:</label>
                                </div>
                                <div className="col-4">
                                    <input type="text" name="fName" className="formInput" defaultValue={customer.fname} />
                                </div>
                            </div>


                            <div className="row p-3 border-bottom border-dark border-solid">
                                <div className="col-3">
                                    <label htmlFor="address" className="formLabel fs-5 fw-bold">Address:</label>
                                </div>
                                <div className="col-9">
                                    <input type="text" name="address" className="formInput" defaultValue={customer.address} />
                                </div>
                            </div>

                            <div className="row p-3 border-bottom border-dark  border-solid">
                                <div className="col-1">
                                    <label htmlFor="city" className="formLabel fs-5 fw-bold">City:</label>
                                </div>
                                <div className="col-4">
                                    <input type="text" name="city" id="city" className="formInput" defaultValue={customer.city} />
                                </div>
                                <div className="col-2">
                                    <label htmlFor="state" className="formLabel fs-5 fw-bold">State:</label>
                                </div>
                                <div className="col-2">
                                    <input type="text" name="state" id="state" className="formInput" defaultValue={customer.state} />
                                </div>
                                <div className="col-1">
                                    <label htmlFor="zip_code" className="formLabel fs-5 fw-bold">Zip Code:</label>
                                </div>
                                <div className="col-2">
                                    <input type="text" name="zip_code" className="formInput" defaultValue={customer.zip} />
                                </div>
                            </div>



                            <div className="row p-3 border-bottom border-dark  border-solid">
                                <div className="col-2">
                                    <label htmlFor="phone" className="formLabel fs-5 fw-bold">Phone:</label>
                                </div>
                                <div className="col-4">
                                    <input type="tel" name="phone" id="phone" className="formInput" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" defaultValue={customer.phone} />
                                </div>

                                <div className="row p-3 border-bottom border-dark border-solid">
                                    <div className="col-2">
                                        <label htmlFor="email" className="formLabel fs-5 fw-bold">
                                            Email:
                                        </label>
                                    </div>

                                    <div className="col-10">
                                        <input type="email" name="email" id="email" className="formInput" defaultValue={customer.email} />
                                    </div>
                                </div>

                                <div className="col-3">
                                    <label htmlFor="communication" className="formLabel fs-5 fw-bold">Mode of Communication</label>
                                </div>
                                <div className="col-3">
                                    <select id="communication" name="communication" className="formInput" defaultValue={customer.communication_preference}>
                                        <option value="Phone" >Phone</option>
                                        <option value="Email" >Email</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row p-3 border-bottom border-bg-light  border-solid">
                                <div className="col-2">
                                    <button className="btn btn-dark fs-5 fw-bold" type="button" onClick={deleteCustomer}>Delete Customer</button>
                                </div>
                                <div className="col-7">
                                </div>
                                <div className="col-2">
                                    <button className="btn btn-dark fs-5 fw-bold" type="button" onClick={updateCustomer}>Update Customer</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            )}

        </>
    );
}

function CustomerAction(action, id) {
    switch (action) {
        case "Add":
            return <CreateCustomer action="Add" id={id} />;

        case "Edit":
            return <UpdateDeleteCustomer action="Update" id={id} />;

        case "View":
            return <ViewCustomer />;

        default:
            return <ViewCustomer />;
    }
}

function Customer() {
    const { action, id } = useParams();

    return CustomerAction(action, id);
}

export default Customer;
