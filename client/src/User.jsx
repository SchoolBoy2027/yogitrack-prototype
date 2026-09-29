
import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function UpdateUser() {

    const { id } = useParams();

    const [user, setUser] = useState(null);

    useEffect(() => {

        fetch(`http://localhost:5000/api/users/${id}`)
            .then((response) => {
                console.log("Status:", response.status);

                return response.json();
            })
            .then((data) => {
                console.log("User:", data);
                setUser(data);
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
            });

    }, [id]);

    return (
        <div>
            <h1>User</h1>

            {user && (
                <div>
                    <p>ID: {user.user_id}</p>
                    <p>First Name: {user.fname}</p>
                    <p>Last Name: {user.lname}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                </div>
            )}
        </div>
    );
}
/**
 * ViewUser()
 * @returns List of Users
 */

function ViewUser() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/api/users")
      .then((response) => {
        console.log("Status:", response.status);
        console.log("Content-Type:", response.headers.get("content-type"));

        return response.json();
      })
      .then((data) => {
        console.log("Users:", data);
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });

  }, []);

  /**
   *  getEditButton()
   * @returns routing string
   */
  function getEditButton() {
    return "/User/Edit/";
  }
  /**
   *  getAddButton()
   * @returns routing string
   */

  function getAddButton() {
    return "/User/Add/";
  }

  /**
   * getEditIcon()
   * @returns image string
   */

  function getEditIcon() {
    return "/src/assets/editButton.png";
  }

  return (
    <>
      <div className="container-fluid">
<div className="container-fluid fs-1 bg-dark text-white fw-bold left">
      View Instructors and Managers
</div>
    

        <table id="yogaTable" className=" mt-5 datatable table table-secondary overflow-scroll sticky-top">
          <thead>
            <th>ID</th>
            <th>Role</th>
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
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td> {user.user_id}</td>
                <td>{user.role}</td>
                <td>{user.fname}</td>
                <td>{user.lname}</td>
                <td>{user.address}</td>
                <td>{user.city}</td>
                <td>{user.state}</td>
                <td>{user.zip}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.communication_preference}</td>
                <td><a href={getEditButton() + user.user_id}  ><img className="editButton" alt="Missing" src={getEditIcon()} /> </a></td>

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
 * CUDUser(action, id)
 * @param {*} action 
 * @returns 
 */
function CUDUser(action, id) {

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

    console.log("Sending user:", user);
    let msg = document.getElementById("response");
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();

      console.log("Server response:", data);


      if (response.ok) {
        msg.innerHTML = "Instructor saved successfully!";
      } else {
        msg.innerHTML = "Error: " + data.message;
      }

    } catch (error) {
      console.error("Error saving user:", error);
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
              <p className="p-3 fs-3 fw-bold text-white">{`${action.action}`} Instructor</p>
            </div>
            <div className="col-1 fs-3 pr-3 fw-bold text-white  order-dark border-solid" title="Not functional yet">
              <a href="/User/View">
                X
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

function UserAction(action, id) {
  switch (action) {
    case "Add":
      return <CUDUser action="Add" id={id} />;

    case "Edit":
      return <UpdateUser action="Update" id={id} />;

    case "Delete":
      return <CUDUser action="Delete" id={id} />;

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
