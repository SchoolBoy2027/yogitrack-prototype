
import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import addButton from "./assets/btn-Add.png";
import editButton from "./assets/editButton.png";
import DDTable from "./components/DDTable";
import DBF from "./library/DBF";
import btnMinimize from "./assets/minimize.png";


/**
 *  getAddRoute()
 * @returns routing string
 */

function getAddRoute() {
    return "/Customer/Add/";
}

/**
 * ViewCustomer()
 * @returns List of Customers
 */

function ViewCustomer() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {

        fetch("/api/customers")
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

    return (
        <>
            <div className="container-fluid">
                <div className="container-fluid fs-1 bg-bg-transparent text-white fw-bold left">
                    <div className="col-12" >
                        <a href={getAddRoute()}  ><img className="addButton" alt="Missing" src={addButton} title="Add Customer" /> </a>
                        View Customers
                    </div>
                </div>

                <DDTable
                    data={customers}
                    actionPath={(row) => `/Customer/Edit/${row.customer_id}`}
                    actionImage={editButton}
                />


            </div>

        </>
    );
}

function ViewCustomer2() {

    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {

        fetch("/api/customers")
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

    const handleCustomerClick = (customerId) => {
        const customer = customers.find((item) => item.customer_id === customerId);
        setSelectedCustomer(customer);
    };
//  <div className={selectedCustomer ? "col-8" : "col-12"} style={{ minWidth: 0, overflowX: "auto"}}>
    return (
        <>
            <div className="container-fluid">
                <div className="container-fluid fs-1 bg-bg-transparent text-white fw-bold left">
                    <div className="col-12">
                        <a href={getAddRoute()}><img className="addButton" alt="Missing" src={addButton} title="Add Customer" /></a>
                        View Customers
                    </div>
                </div>
            <div className="container-fluid mt-5">
                <div className="row">
                  
                <div className={selectedCustomer ? "col-8" : "col-12"} 
                        style={{
                            minWidth: 0,
                            overflowX: selectedCustomer ? "auto" : "hidden",
                            overflowY: selectedCustomer ? "auto" : "hidden",
                        }}
                
                
                >
                        <DDTable
                            data={customers}
                            actionPath={(row) => `/Customer/Edit/${row.customer_id}`}
                            actionImage={editButton}
                            clickableColumns={["customer_id"]}
                            onCellClick={handleCustomerClick}
                            hiddenColumns={["packages_purchased"]}
                        />
                    </div>

                    {selectedCustomer && (
                        <div className="col-4 ps-5" style={{ minWidth: 0, overflowX: "auto" }}>
                            <div className="row fs-5 text-white fw-bold align-items-center">
                                <div className="col-2 fs-5 text-white fw-bold align-items-left">
                                    <a
                                        href="#"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            setSelectedCustomer(null);
                                        }}
                                    >
                                        <img src={btnMinimize} alt="Hide Packages" height={"50px"} width={"50px"} />
                                    </a>
                                </div>
                                Packages for {selectedCustomer.customer_id}
                            </div>

                            <DDTable
                                data={selectedCustomer.packages_purchased || []}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}

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
            customer_id: "C0000",
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
        
        if (await DBF.duplicateCustomerCheck(customer.fname, customer.lname)) {
            console.log("Sending customer:", customer);
            let msg = document.getElementById("response");
            try {
                const response = await fetch("/api/customers", {
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
                    msg.innerHTML = "Error: " + data.message + " Error " + data.error;
                }

            } catch (error) {
                console.error("Error saving customer:", error);
                msg.innerHTML = "Could not connect to the server." + error;
            }
        }else {
            console.log("Create canceled due to duplicate");
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
                        <div className="col-1 fs-3 pr-3 fw-bold text-white  order-dark border-solid" title="Return to View">
                            <a href="/Customer/View">
                                <div className="btnClose FS5 text text-white">X</div>
                            </a>
                        </div>
                    </div>
                    <div className="row pb-1 border-bottom border-dark border-solid">

                        <div className="col-4">
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
                        <div className="col-2">
                            <label htmlFor="fName" className="formLabel fs-5 fw-bold">First Name:</label>
                        </div>
                        <div className="col-4">
                            <input type="text" name="fName" className="formInput" />
                        </div>
                        <div className="col-2 ">
                            <label htmlFor="lName" className="formLabel fs-5 fw-bold">Last Name:</label>
                        </div>
                        <div className="col-4">
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

                        <div className="col-2">
                            <label htmlFor="email" className="formLabel fs-5 fw-bold">
                                Email:
                            </label>
                        </div>
                        <div className="col-4">
                            <input type="email" name="email" id="email" className="formInput" />
                        </div>
                    </div>

                    <div className="row p-3 border-bottom border-dark  border-solid">
                        <div className="col-6">
                            <label htmlFor="communication" className="formLabel fs-5 fw-bold">Mode of Communication</label>
                        </div>
                        <div className="col-4">
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
                `/api/customers/${customer.customer_id}`,
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
                `/api/customers/${customer.customer_id}`,
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

        fetch(`/api/customers/${id}`)
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
                                <div className="col-2">
                                    <label htmlFor="fName" className="formLabel fs-6 fw-bold">First Name:</label>
                                </div>
                                <div className="col-4">
                                    <input type="text" name="fName" className="formInput" defaultValue={customer.fname} />
                                </div>
                                <div className="col-2 ">
                                    <label htmlFor="lName" className="formLabel fs-6 fw-bold">Last Name:</label>
                                </div>
                                <div className="col-4">
                                    <input type="text" name="lName" className="formInput" defaultValue={customer.lname} />
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
            return <ViewCustomer2 />;

        default:
            return <ViewCustomer2 />;
    }
}

function Customer() {
    const { action, id } = useParams();

    return CustomerAction(action, id);
}

export default Customer;
