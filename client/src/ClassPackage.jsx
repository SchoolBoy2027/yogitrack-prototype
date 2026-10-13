import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import addButton from "./assets/btn-Add.png";
import editButton from "./assets/editButton.png";
import DDTable from "./components/DDTable";
import FormHelp from "./library/FormHelp";


function ViewClassPackage() {

  const [class_packages, setClassPackagess] = useState([]);

  useEffect(() => {

    fetch("/api/class_packages")
      .then((response) => {
        FormHelp.LogIt2("Status:", response.status);
        FormHelp.LogIt2(
          "Content-Type:",
          response.headers.get("content-type")
        );

        return response.json();
      })
      .then((data) => {
        FormHelp.LogIt2("ClassPackages:", data);
        setClassPackagess(data);
      })
      .catch((error) => {
        FormHelp.DisplayErr("Error fetching class_packages:", error);
      });

  }, []);

  /**
   * Check the class_package id and make sure whats about to be inserted is the highest
   * in case one has been deleted.  Ideally, we wouldn't be deleting transactions but
   * never know.  Preferred method is to package of type refund with all values editable.  
   * @param {int} class_package_id 
   * @returns 
   */
  const ClassPackageIDCheck = async (class_package_id) => {
    try {
      const response = await fetch("/api/class_packages");

      if (!response.ok) {
        throw new Error("Failed to fetch class_packages");
      }

      const class_packages = await response.json();
      const year = String(class_package_id).substring(0, 4);

      const yearClassPackages = class_packages.filter(
        (class_package) => String(class_package.class_package_id).startsWith(year)
      );

      const highestClassPackageId = yearClassPackages.reduce(
        (highest, class_package) => Math.max(highest, Number(class_package.class_package_id) || 0),
        0
      );

      if (highestClassPackageId >= Number(class_package_id)) {
        return highestClassPackageId + 1;
      }

      return class_package_id;

    } catch (error) {
      FormHelp.ConsoleErr("Error checking class_package numbers:", error);
      return null;
    }
  };

  /**
   * Generate the route for the add button
   * @returns 
   */
  function getAddRoute() {
    return "/ClassPackage/Add/";
  }

  return (
    <>
      <div className="container-fluid">
        <div className="container-fluid fs-1 bg-dark text-white fw-bold left">
          <div className="col-12">
            <a href={getAddRoute()}>
              <img
                className="addButton"
                alt="Missing"
                src={addButton}
                title="Add ClassPackage"
              />
            </a>
            View Class Packages
          </div>
        </div>

        <DDTable
          data={class_packages}
          actionPath={(row) => `/ClassPackage/Edit/${row.class_package_id}`}
          actionImage={editButton}
        />
      </div>
    </>
  );
}

/**
 * CreateClassPackage(action, id)
 * @param {*} action
 * @returns
 */
function CreateClassPackage(action, id) {

  const [formData, setFormData] = useState({
      class_package_id: "None",
      cost:"",
      package_category: "",
      yoga_class_type: "",
      number_of_classes: "",
      days: "",
      is_active: true

  });

  const submitClassPackage = async () => {

    const form = document.getElementById("modClass");

    const formData = new FormData(form);

    const class_package = {
      class_package_id: "None",
      cost: String(formData.get("cost")).replace(/[$,]/g, ""),
      package_category: formData.get("package_category"),
      yoga_class_type: formData.get("yoga_class_type"),
      number_of_classes: formData.get("number_of_classes"),
      days: formData.get("days"),
      is_active: true
    };

    FormHelp.LogIt2("Sending class_package:", class_package);


    try {
      const response = await fetch("/api/class_packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(class_package)
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

      <div className="userForm2 pb-1 rounded m-5">

        <div id="response" className="ajaxReturnMsg"></div>

        <form
          id="modClass"
          className="classForm"
          action="doitUser"
        >

          <div className="row pb-1 border-bottom border-dark border-solid">

            <div className="col-1">
              <div className="logo"></div>
            </div>

            <div className="col-10">
              <p className="p-3 fs-3 fw-bold text-white">
                Create Class Package
              </p>
            </div>

            <div
              className="col-1 fs-3 pr-3 fw-bold text-white order-dark border-solid"
              title="Return to View"
            >
              <a href="/ClassPackage/View">
                <div className="btnClose FS5 text text-white">
                  X
                </div>
              </a>
            </div>

          </div>

          <div className="row pb-1 border-bottom border-dark border-solid">

            <div className="col-2">
              <label
                htmlFor="package_category_id"
                className="formLabel fs-5 fw-bold">
                Package Type:
              </label>
            </div>

            <div className="col-2">

              <select
                id="package_category"
                name="package_category"
                className="formInput"
              >
                <option value="General">
                  General
                </option>

                <option value="Senior">
                  Senior
                </option>
              </select>

            </div>
            <div className="col-3">
              <label className="formLabel fs-5 fw-bold">
                Package Cost: $
              </label>
            </div>

            <div className="col-3">
              <input
                type="number"
                name="cost"
                id="cost"
                defaultValue={"20.00"}
                className="formInput"
                
                placeholder="$0.00"
                step="10.00"
              />
            </div>
          </div>

          <div className="row pb-1 border-bottom border-dark border-solid">

            <div className="col-2 ps-3">
              <label className="formLabel fs-5 fw-bold">
                Number of Classes:
              </label>
            </div>

            <div className="col-2">
              <input
                type="number"
                name="number_of_classes"
                id="number_of_classes"
                className="formInput"
                step={"1"}
                title="For unlimited, enter 1000 so the math works"
              />
            </div>

            <div className="col-1">
              <label className="formLabel fs-5 fw-bold">
                Days:
              </label>
            </div>

            <div className="col-2">
              <input
                type="number"
                name="days"
                id="days"
                className="formInput"
              />
            </div>


            <div className="col-2">
              <label className="formLabel fs-5 fw-bold">
                Yoga Class Type:
              </label>
            </div>

            <div className="col-2 pr-3">
              <input
                type="text"
                name="yoga_class_type"
                id="yoga_class_type"

                className="formInput"
              />
            </div>

          </div>



          <div className="row p-3 border-bottom border-dark border-solid">

            <div className="col-9">
            </div>

            <div className="col-2">

              <button
                className="btn btn-dark fs-5 fw-bold float-end"
                type="button"
                onClick={submitClassPackage}
              >
                Submit
              </button>

            </div>

          </div>

        </form>

      </div>

    </>
  );
}


/**
 * UpdateDeleteClassPackage(action, id)
 * @param {*} action
 * @returns
 */
function UpdateDeleteClassPackage(action) {

  /**
   * submit class_package Updates
   */
  const updateClassPackage = async () => {
    const form = document.getElementById("modClass");

    const formData = new FormData(form);

    const class_package = {
      class_package_id: formData.get("class_package_id"),
      cost: String(formData.get("cost")).replace(/[$,]/g, ""),
      package_category: formData.get("package_category"),
      yoga_class_type: formData.get("yoga_class_type"),
      number_of_classes: formData.get("number_of_classes"),
      days: formData.get("days"),
      is_active: true
    };

    FormHelp.LogIt("Updating class_package:", class_package);

    try {
      const response = await fetch(
        `/api/class_packages/${formData.get("class_package_id")}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(class_package)
        }
      );
      const data = await response.json();
      FormHelp.ErrCheck(response);

    } catch (error) {
      FormHelp.DisplayErr(error);
    }
  };

  /**
   * deletes the class_package by ID
   */
  const disableClassPackage = async () => {
    const form = document.getElementById("modClass");

    const formData = new FormData(form);

    const class_package = {
      is_active: false
    };

    FormHelp.LogIt("Updating class_package:", class_package);

    try {
      const response = await fetch(
        `/api/class_packages/${formData.get("class_package_id")}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(class_package)
        }
      );
      const data = await response.json();

      FormHelp.LogIt2("Server response:", data);

      FormHelp.ErrCheck(response);

    } catch (error) {
      FormHelp.DisplayErr(error);
    }
  };

  /**
   * retrieves the data for the form
   */
  const { id } = useParams();     /* this is the retrieval      */

  const [class_package, setClassPackage] = useState(null);

  useEffect(() => {

    fetch(`/api/class_packages/${id}`)
      .then((response) => {
        FormHelp.LogIt2("Status:", response.status);

        return response.json();
      })
      .then((data) => {
        setClassPackage(data);
      })
      .catch((error) => {
        FormHelp.ConsoleErr("Error fetching class_package:", error);
      });

  }, [id]);

  return (
    <>
      {class_package && (

        <>

          <div className="userForm2 pb-1 rounded m-5">

            <div id="response" className="ajaxReturnMsg"></div>

            <form
              id="modClass"
              className="classForm"
              action="doitUser"
            >

              <div className="row pb-1 border-bottom border-dark border-solid">

                <div className="col-1">
                  <div className="logo"></div>
                </div>

                <div className="col-10">
                  <p className="p-3 fs-3 fw-bold text-white">
                    Update or Delete ClassPackage
                  </p>
                </div>

                <div
                  className="col-1 fs-3 pr-3 fw-bold text-white order-dark border-solid"
                  title="Return to View"
                >
                  <a href="/ClassPackage/View">
                    <div className="btnClose FS5 text text-white">
                      X
                    </div>
                  </a>
                </div>

              </div>

              <div className="row pb-1 border-bottom border-dark border-solid">

                <div className="col-2 ps-3">
                  <label className="formLabel fs-5 fw-bold">
                    Package ID:
                  </label>
                </div>

                <div className="col-2 ps-3">
                  <input
                    type="text"
                    name="class_package_id"
                    id="class_package_id"
                    defaultValue={class_package.class_package_id}
                    className="formInput"
                  />
                </div>

                <div className="col-2">
                  <label
                    htmlFor="package_category"
                    className="formLabel fs-5 fw-bold"
                  >
                    Package Type:
                  </label>
                </div>

                <div className="col-2">

                  <select
                    id="package_category"
                    name="package_category"
                    className="formInput"
                    defaultValue={class_package.package_category}
                  >
                    <option value="General">
                      General
                    </option>

                    <option value="Senior">
                      Senior
                    </option>
                  </select>

                </div>
                <div className="col-2">
                  <label className="formLabel fs-5 fw-bold">
                    Package Cost:
                  </label>
                </div>

                <div className="col-2 ps-0">
                  <input
                    type="text"
                    name="cost"
                    id="cost"
                    value={FormHelp.ToCurrency(class_package.cost)}
                    readOnly
                    className="formInput"
                    inputMode="decimal"
                    placeholder="$0.00"
                  />
                </div>
              </div>

              <div className="row pb-1 border-bottom border-dark border-solid">

                <div className="col-2 ps-3">
                  <label className="formLabel fs-5 fw-bold">
                    Number of Classes:
                  </label>
                </div>

                <div className="col-2">
                  <input
                    type="number"
                    name="number_of_classes"
                    id="number_of_classes"
                    className="formInput"
                    step={"1"}
                    title="For unlimited, enter 1000 so the math works"
                    defaultValue={class_package.number_of_classes}
                  />
                </div>

                <div className="col-1">
                  <label className="formLabel fs-5 fw-bold">
                    Days:
                  </label>
                </div>

                <div className="col-2">
                  <input
                    type="number"
                    name="days"
                    id="days"
                    defaultValue={class_package.days}
                    className="formInput"
                  />
                </div>


                <div className="col-2">
                  <label className="formLabel fs-5 fw-bold">
                    ClassPackage Type:
                  </label>
                </div>

                <div className="col-2 pr-3">
                  <input
                    type="text"
                    name="yoga_class_type"
                    id="yoga_class_type"
                    defaultValue={class_package.yoga_class_type}
                    className="formInput"
                  />
                </div>

              </div>



              <div className="row p-3 border-bottom border-bg-light  border-solid">
                <div className="col-4">
                  <button className="btn btn-dark fs-5 fw-bold delete" type="button" onClick={disableClassPackage}>Disable Class Package</button>
                </div>
                <div className="col-4">
                </div>
                <div className="col-4">
                  <button className="btn btn-dark fs-5 fw-bold update" type="button" onClick={updateClassPackage}>Update Class Package</button>
                </div>
              </div>

            </form>

          </div>
        </>

      )}

    </>
  );
}


function ClassPackageAction(action, id) {

  switch (action) {

    case "Add":
      return <CreateClassPackage action="Add" id={id} />;

    case "Edit":
      return <UpdateDeleteClassPackage action="Update" id={id} />;

    case "View":
      return <ViewClassPackage />;

    default:
      return <ViewClassPackage />;
  }
}


function ClassPackage() {

  const { action, id } = useParams();

  return ClassPackageAction(action, id);
}


export default ClassPackage;