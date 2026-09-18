
import React from 'react';


/*
change over to switch to create,read, update and delete 
*/

function CUDUser() {
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
              <p className="p-3 fs-3 fw-bold text-white">Add Instructor</p>
            </div>
            <div className="col-1 fs-3 pr-3 fw-bold text-white  order-dark border-solid" title="Not functional yet">
              X
            </div>
          </div>
          <div className="row pb-1 border-bottom border-dark border-solid">
            <div className="col-3">
              <label for="id" className="formLabel fs-5 fw-bold">User ID:</label>
            </div>
            <div className="col-3">
              <input type="text" name="id" className="formInput" />
            </div>
            <div className="col-2">
              <label for="role" className="formLabel fs-5 fw-bold">Role:</label>
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
              <label for="lName" className="formLabel fs-6 fw-bold">Last Name:</label>
            </div>
            <div className="col-4">
              <input type="text" name="lName" className="formInput" />
            </div>
            <div className="col-2">
              <label for="fName" className="formLabel fs-6 fw-bold">First Name:</label>
            </div>
            <div className="col-4">
              <input type="text" name="fName" className="formInput" />
            </div>
          </div>


          <div className="row p-3 border-bottom border-dark border-solid">
            <div className="col-3">
              <label for="address" className="formLabel fs-5 fw-bold">Address:</label>
            </div>
            <div className="col-9">
              <input type="text" name="address" className="formInput" />
            </div>
          </div>

          <div className="row p-3 border-bottom border-dark  border-solid">
            <div className="col-1">
              <label for="city" className="formLabel fs-5 fw-bold">City:</label>
            </div>
            <div className="col-4">
              <input type="text" name="city" id="city" className="formInput" />
            </div>
            <div className="col-2">
              <label for="state" className="formLabel fs-5 fw-bold">State:</label>
            </div>
            <div className="col-2">
              <input type="text" name="state" id="state" className="formInput" />
            </div>
            <div className="col-1">
              <label for="zip_code" className="formLabel fs-5 fw-bold">Zip Code:</label>
            </div>
            <div className="col-2">
              <input type="text" name="zip_code" className="formInput" />
            </div>
          </div>



          <div className="row p-3 border-bottom border-dark  border-solid">
            <div className="col-2">
              <label for="phone" className="formLabel fs-5 fw-bold">Phone:</label>
            </div>
            <div className="col-4">
              <input type="tel" name="phone" id="phone" className="formInput" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
            </div>

            <div className="col-3">
              <label for="communication" className="formLabel fs-5 fw-bold">Mode of Communication</label>
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
  );
}



function User() {
  return (
    CUDUser()
  );
}

export default User;
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


    const[searchParams, setSearchParams]=useSearchParams();
    let page=searchParams.get("action");

   const User = simulateSwitch(page) => {
        switch(param){
        case "add":
          
          break;
        case "edit":
          
          break;
        case "view":
          
          break;
      
        default:
          break;
        }
      };

      */