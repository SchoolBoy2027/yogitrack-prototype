
import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loginLogo from './assets/PadlockFancy.png'

/**
 * ViewUser()
 * @returns List of Users
 */

function UserLogin() {

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

    </>
  );
}
//    
//    ${id}

/**
 * Login()
 * @returns 
 */
function Login2() {

  const submitUser = async () => {
    const form = document.getElementById("modClass");

    const formData = new FormData(form);

    const user = {
      user_id: formData.get("user_id"),
      email: formData.get("password"),
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
      
      <div className="loginForm pb-1 rounded m-5 p-1 " >
        <div id="response" className="ajaxReturnMsg"></div>

        <form id="login" className="classForm">
          <div className="row pb-1 border-bottom border-dark border-solid">
            <div className="col-1">
              <div className="loginLogo"></div>
            </div>
            <div className="col-10">
              <p className="p-3 fs-3 fw-bold text-white">Login</p>
            </div>
            <div className="col-1 fs-3 pr-3 fw-bold text-white  order-dark border-solid" title="Not functional yet">
            </div>
          </div>
          <div className="row pb-1 border-bottom border-dark border-solid">
            <div className="col-1">
            </div>
            <div className="col-3">
              <label htmlFor="id" className="formLabel fs-5 fw-bold">User ID:</label>
            </div>
            <div className="col-6">
              <input type="text" name="user_id" className="formInput" />
            </div>
          </div>
          <div className="row pb-1 border-bottom border-dark border-solid fs-5">
            <div className="col-1">
            </div>
            <div className="col-3">
              <label htmlFor="password" className="fs-5 fw-bold">Password:</label>
            </div>
            <div className="col-6 ">
              <input type="text" name="password" className="formInput" />
            </div>
          </div>


          <div className="row p-3 border-bottom border-dark  border-solid">
            <div className="col-9">
            </div>
            <div className="col-2">
              {     /*        <button className="btn btn-dark fs-5 fw-bold" type="button" onClick={submitUser}>Login</button> */}
              <a className="btn btn-dark fs-5 fw-bold" href="\Dashboard" type="button" >Login</a>
            </div>
          </div>

        </form>
      </div>

    </>
  );
}

function LoginAction() {
  let action = 1;

  return <Login2 />;
}

function Login() {


  return LoginAction();
}

export default Login;
