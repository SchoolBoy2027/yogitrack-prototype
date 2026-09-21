import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * ViewUser()
 * @returns List of Users
 */

function ViewCustomer() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/api/customer")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });

  }, []);

  return (
    <>
      <div className="container-fluid">

        <h1>Users</h1>


        <table>

          {users.map((user) => (
            
            <tr dataID={user.user_id}>
              <td>First Name: {user.fname}</td>
              <td>: {user.lname}</td>
              <td>Address: {user.address}</td>
              <td>City: {user.city}</td>
              <td>State: {user.email}</td>
              <td>Zip Cox: {user.state}</td>
              <td>Email: {user.email}</td>
              <td>Preference: {user.communication_preference}</td>
            </tr>
          ))}
        </table>
        <h1>end of users</h1>
      </div>
    </>
  );
}

function CUDCustomer() {

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
                            <p className="p-3 fs-3 fw-bold text-white">Add Customer</p>
                        </div>
                        <div className="col-1 fs-3 pr-3 fw-bold text-white  order-dark border-solid" title="Not functional yet">
                            X
                        </div>
                    </div>
                    <div className="row pb-1 border-bottom border-dark border-solid">
                        <div className="col-2">
                            <label htmlFor="id" className="formLabel fs-5 fw-bold">Customer ID:</label>
                        </div>
                        <div className="col-3">
                            <input type="text" name="id" className="formInput" />
                        </div>
                    </div>
                    <div className="row pb-1 border-bottom border-dark border-solid">
                        <div className="col-2 ">
                            <label htmlFor="lName" className="formLabel fs-6 fw-bold">Last Name:</label>
                        </div>
                        <div className="col-4">
                            <input type="text" name="lName" className="formInput" />
                        </div>
                        <div className="col-2">
                            <label htmlFor="fName" className="formLabel fs-6 fw-bold">First Name:</label>
                        </div>
                        <div className="col-4">
                            <input type="text" name="fName" className="formInput" />
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
                            <button class="btn btn-dark fs-5 fw-bold" type="button" onClick="">Submit</button>
                        </div>
                    </div>

                </form>
            </div>

        </>
    )
}

function CustomerAction(action, id) {
    switch (action) {
        case "Add":
            return <CUDCustomer />;

        case "Edit":
            return <CUDCustomer id={id} />;

        case "Delete":
            return <CUDCustomer id={id} />;

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










