
import React from 'react';

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import addButton from "./assets/btn-Add.png";
import editButton from "./assets/editButton.png";
import DDTable from "./components/DDTable";
import DBF from "./library/DBF";
import FormHelp from './library/FormHelp';



/**
 *  getAddRoute()
 * @returns routing string
 */
function getAddRoute() {
  return "/User/Add/";
}


/**
 *  getEditRoute()
 * @returns routing string
 */
function getEditRoute() {
  return "/User/Edit/";
}



/**
 * ViewUser()
 * @returns List of Users
 */

function ViewUser() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetch("/api/users")
      .then((response) => {
        FormHelp.LogIt2("Status:", response.status);
        FormHelp.LogIt2("Content-Type:", response.headers.get("content-type"));

        return response.json();
      })
      .then((data) => {
        FormHelp.LogIt2("Users:", data);
        setUsers(data);
      })
      .catch((error) => {
        FormHelp.ConsoleErr("Error fetching users:", error);
      });

  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="container-fluid fs-1 bg-dark text-white fw-bold left">
          <div className="col-12" >
            <a href={getAddRoute()}  ><img className="addButton" alt="Missing" src={addButton} title="Add User" /> </a>
            View Instructors and Managers
          </div>
        </div>
        <DDTable
          data={users}
          actionPath={(row) => `/User/Edit/${row.user_id}`}
          actionImage={editButton}
        />
      </div>
    </>
  );
}


/**
 * CreateUser(action, id)
 * @param {*} action 
 * @returns 
 */
function CreateUser(action, id) {

  const submitUser = async () => {
    const form = document.getElementById("modClass");

    const formData = new FormData(form);

    const user = {
      user_id: formData.get("user_id"),
      role: formData.get("role"),
      fname: formData.get("fName"),
      lname: formData.get("lName"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      zip: formData.get("zip_code"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      communication_preference: formData.get("communication")
    };

    FormHelp.LogIt2("Sending user:", user);
    let msg = document.getElementById("response");
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();

      FormHelp.LogIt2("Server response:", data);
      FormHelp.ErrCheck(response);

    } catch (error) {
      FormHelp.DisplayErr(error);
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
              <p className="p-3 fs-3 fw-bold text-white">{`${action.action}`} Instructor</p>
            </div>
            <div className="col-1 fs-3 pr-3 fw-bold text-white  order-dark border-solid" title="Not functional yet">
              <a href="/User/View">
                <div className="btnClose FS5 text text-white">X</div>
              </a>
            </div>
          </div>
          <div className="row pb-1 border-bottom border-dark border-solid">
            <div className="col-3">
              <label htmlFor="id" className="formLabel fs-5 fw-bold">User ID:</label>
            </div>
            <div className="col-3">
              <input type="text" name="user_id" className="formInput" />
            </div>
            <div className="col-2">
              <label htmlFor="role" className="formLabel fs-5 fw-bold">Role:</label>
            </div>
            <div className="col-4">
              <select id="role" name="role" className="formInput ">
                <option value="Manager" >Manager</option>
                <option value="Instructor" >Instructor</option>
              </select>
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
              <button className="btn btn-dark fs-5 fw-bold" type="button" onClick={submitUser}>Submit</button>
            </div>
          </div>

        </form>
      </div>
    </>
  );
}
/**
 * UpdateDeleteUser(action, id)
 * @param {*} action 
 * @returns 
 */
function UpdateDeleteUser(action) {
  let msg = document.getElementById("response");

  /**
   * submit user Updates
   */
  const updateUser = async () => {
    const form = document.getElementById("modClass");

    const formData = new FormData(form);

    const user = {
      user_id: formData.get("user_id"),
      role: formData.get("role"),
      fname: formData.get("fName"),
      lname: formData.get("lName"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      zip: formData.get("zip_code"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      communication_preference: formData.get("communication")
    };

    FormHelp.LogIt2("Updating user:", user);

    try {
      const response = await fetch(
        `/api/users/${user.user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        }
      );
      const data = await response.json();
      FormHelp.ErrCheck(response)

    } catch (error) {
      FormHelp.DisplayErr(error);
    }
  };

  /**
   * deletes the user by ID
   */
  const deleteUser = async () => {
    const form = document.getElementById("modClass");

    const formData = new FormData(form);

    const user = {
      user_id: formData.get("user_id"),
    };

    FormHelp.LogIt2("Deleting user:", user);

    try {
      const response = await fetch(
        `/api/users/${user.user_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const data = await response.json();

      FormHelp.ErrCheck(response);

    } catch (error) {
      FormHelp.DisplayErr(error);
    }
  }

  /**
   * retrieves the data for the form
   */
  const { id } = useParams();     /* this is the retrieval      */

  const [user, setUser] = useState(null);

  useEffect(() => {

    fetch(`/api/users/${id}`)
      .then((response) => {
        FormHelp.LogIt2("Status:", response.status);

        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        FormHelp.ConsoleErr("Error fetching user:", error);
      });

  }, [id]);

  return (
    <>


      {user && (
        <div>

          <div className="userForm pb-1 rounded m-5" >
            <div id="response" className="ajaxReturnMsg"></div>

            <form id="modClass" className="classForm">
              <div className="row pb-1 border-bottom border-dark border-solid">
                <div className="col-1">
                  <div className="logo"></div>
                </div>
                <div className="col-10">
                  <p className="p-3 fs-3 fw-bold text-white">{`${action.action}`} Instructor</p>
                </div>
                <div className="col-1 fs-3 pr-3 fw-bold text-white  order-dark border-solid" title="Not functional yet">
                  <a href="/User/View">
                    <div className="btnClose FS5 text text-white">X</div>
                  </a>
                </div>
              </div>
              <div className="row pb-1 border-bottom border-dark border-solid">
                <div className="col-3">
                  <label htmlFor="id" className="formLabel fs-5 fw-bold">User ID:</label>
                </div>
                <div className="col-3">
                  <input type="text" name="user_id" className="formInput" value={user.user_id} readOnly />
                </div>
                <div className="col-2">
                  <label htmlFor="role" className="formLabel fs-5 fw-bold">Role:</label>
                </div>
                <div className="col-4">
                  <select id="role" name="role" className="formInput " defaultValue={user.role}>
                    <option value="Manager" >Manager</option>
                    <option value="Instructor" >Instructor</option>
                  </select>
                </div>
              </div>

              <div className="row pb-1 border-bottom border-dark border-solid">
                <div className="col-2 ">
                  <label htmlFor="lName" className="formLabel fs-6 fw-bold">Last Name:</label>
                </div>
                <div className="col-4">
                  <input type="text" name="lName" className="formInput" defaultValue={user.lname} />
                </div>
                <div className="col-2">
                  <label htmlFor="fName" className="formLabel fs-6 fw-bold">First Name:</label>
                </div>
                <div className="col-4">
                  <input type="text" name="fName" className="formInput" defaultValue={user.fname} />
                </div>
              </div>


              <div className="row p-3 border-bottom border-dark border-solid">
                <div className="col-3">
                  <label htmlFor="address" className="formLabel fs-5 fw-bold">Address:</label>
                </div>
                <div className="col-9">
                  <input type="text" name="address" className="formInput" defaultValue={user.address} />
                </div>
              </div>

              <div className="row p-3 border-bottom border-dark  border-solid">
                <div className="col-1">
                  <label htmlFor="city" className="formLabel fs-5 fw-bold">City:</label>
                </div>
                <div className="col-4">
                  <input type="text" name="city" id="city" className="formInput" defaultValue={user.city} />
                </div>
                <div className="col-2">
                  <label htmlFor="state" className="formLabel fs-5 fw-bold">State:</label>
                </div>
                <div className="col-2">
                  <input type="text" name="state" id="state" className="formInput" defaultValue={user.state} />
                </div>
                <div className="col-1">
                  <label htmlFor="zip_code" className="formLabel fs-5 fw-bold">Zip Code:</label>
                </div>
                <div className="col-2">
                  <input type="text" name="zip_code" className="formInput" defaultValue={user.zip} />
                </div>
              </div>



              <div className="row p-3 border-bottom border-dark  border-solid">
                <div className="col-2">
                  <label htmlFor="phone" className="formLabel fs-5 fw-bold">Phone:</label>
                </div>
                <div className="col-4">
                  <input type="tel" name="phone" id="phone" className="formInput" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" defaultValue={user.phone} />
                </div>

                <div className="row p-3 border-bottom border-dark border-solid">
                  <div className="col-2">
                    <label htmlFor="email" className="formLabel fs-5 fw-bold">
                      Email:
                    </label>
                  </div>

                  <div className="col-10">
                    <input type="email" name="email" id="email" className="formInput" defaultValue={user.email} />
                  </div>
                </div>

                <div className="col-3">
                  <label htmlFor="communication" className="formLabel fs-5 fw-bold">Mode of Communication</label>
                </div>
                <div className="col-3">
                  <select id="communication" name="communication" className="formInput" defaultValue={user.communication_preference}>
                    <option value="Phone" >Phone</option>
                    <option value="Email" >Email</option>
                  </select>
                </div>
              </div>

              <div className="row p-3 border-bottom border-bg-light  border-solid">
                <div className="col-2">
                  <button className="btn btn-dark fs-5 fw-bold" type="button" onClick={deleteUser}>Delete User</button>
                </div>
                <div className="col-7">
                </div>
                <div className="col-2">
                  <button className="btn btn-dark fs-5 fw-bold" type="button" onClick={updateUser}>Update User</button>
                </div>
              </div>
            </form>
          </div>
        </div>

      )}

    </>
  );
}

function UserAction(action, id) {
  switch (action) {
    case "Add":
      return <CreateUser action="Add" id={id} />;

    case "Edit":
      return <UpdateDeleteUser action="Update" id={id} />;

    case "View":
      return <ViewUser />;

    default:
      return <ViewUser />;
  }
}

function User() {
  const { action, id } = useParams();

  return UserAction(action, id);
}

export default User;
