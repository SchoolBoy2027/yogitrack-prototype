import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PersonSelect from "./components/PersonSelect";
import PackageSelect from "./components/PackageSelect";
import addButton from "./assets/btn-Add.png";
import editButton from "./assets/editButton.png";
import DDTable from "./components/DDTable";
import FormHelp from "./library/FormHelp";


function ViewSale() {

  const [sales, setSaless] = useState([]);

  useEffect(() => {

    fetch("/api/sales")
      .then((response) => {
        FormHelp.LogIt2("Status:", response.status);
        FormHelp.LogIt2(
          "Content-Type:",
          response.headers.get("content-type")
        );

        return response.json();
      })
      .then((data) => {
        FormHelp.LogIt2("Sales:", data);
        setSaless(data);
      })
      .catch((error) => {
        FormHelp.DisplayErr("Error fetching sales:", error);
      });

  }, []);

  /**
   * Check the sale id and make sure whats about to be inserted is the highest
   * in case one has been deleted.  Ideally, we wouldn't be deleting transactions but
   * never know.  Preferred method is to package of type refund with all values editable.  
   * @param {int} sale_id 
   * @returns 
   */
  const SaleIDCheck = async (sale_id) => {
    try {
      const response = await fetch("/api/sales");

      if (!response.ok) {
        throw new Error("Failed to fetch sales");
      }

      const sales = await response.json();
      const year = String(sale_id).substring(0, 4);

      const yearSales = sales.filter(
        (sale) => String(sale.sale_id).startsWith(year)
      );

      const highestSaleId = yearSales.reduce(
        (highest, sale) => Math.max(highest, Number(sale.sale_id) || 0),
        0
      );

      if (highestSaleId >= Number(sale_id)) {
        return highestSaleId + 1;
      }

      return sale_id;

    } catch (error) {
      FormHelp.ConsoleErr("Error checking sale numbers:", error);
      return null;
    }
  };

  /**
   * Generate the route for the add button
   * @returns 
   */
  function getAddRoute() {
    return "/Sale/Add/";
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
                title="Add Sale"
              />
            </a>
            View Sales
          </div>
        </div>

        <DDTable
          data={sales}
          actionPath={(row) => `/Sale/Edit/${row.sale_id}`}
          actionImage={editButton}
        />
      </div>
    </>
  );
}

/**
 * CreateSale(action, id)
 * @param {*} action
 * @returns
 */
function CreateSale(action, id) {

  const [formData, setFormData] = useState({
    customer_id: "",
    package_id: "",
    yoga_class_type: "",
    number_of_classes: "",
    price_paid: "",
    payment_method: "",
    days: "",
    start_date: "",
    end_date: ""

  });

  const handlePackageChange = async (packageId) => {
    FormHelp.LogIt2("Selected ID:", packageId);

    setFormData((prev) => ({
      ...prev,
      package: packageId
    }));

    if (packageId) {
      const response = await fetch("/api/class_packages");
      const packages = await response.json();

      const selectedPackage = packages.find(
        (pkg) => pkg.class_package_id === packageId
      );

      FormHelp.LogIt2("Selected package:", selectedPackage);

      if (selectedPackage) {

        setFormData((prev) => ({
          ...prev,
          package: packageId,
          number_of_classes: selectedPackage.number_of_classes,
          price_paid: selectedPackage.cost,  //mod for NaN
          days: selectedPackage.days,
          yoga_class_type: selectedPackage.yoga_class_type
        }));
      }
    }
  };


  const submitSale = async () => {

    const form = document.getElementById("modClass");

    const formData = new FormData(form);

    const sale = {
      sale_id: '0',
      package_id: formData.get("package_id"),
      customer_id: formData.get("customer_id"),
      price_paid: String(formData.get("price_paid")).replace(/[$,]/g, ""),
      start_date: formData.get("start_date"),
      end_date: formData.get("end_date"),
      yoga_class_type: formData.get("yoga_class_type"),
      sale_date_time: new Date(),
      payment_method: formData.get("payment_method"),
      number_of_classes: formData.get("number_of_classes"),
      days_valid: formData.get("days"),
    };

    FormHelp.LogIt2("Sending sale:", sale);


    try {
      const response = await fetch("/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sale)
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
                Create Sale
              </p>
            </div>

            <div
              className="col-1 fs-3 pr-3 fw-bold text-white order-dark border-solid"
              title="Return to View"
            >
              <a href="/Sale/View">
                <div className="btnClose FS5 text text-white">
                  X
                </div>
              </a>
            </div>

          </div>

          <PackageSelect
            value={formData.package}
            onChange={handlePackageChange}
          />

          <PersonSelect
            endpoint="/api/customers"
            label="Customer"
            value={formData.customer_id}
            idField="customer_id"
            onChange={(e) =>
              setFormData((prev) => ({        /*Gotta have this or it won't update  */
                ...prev,
                customer_id: e.target.value
              }))
            }
          />


          <div className="row pb-1 border-bottom border-dark border-solid">
            <div className="col-1"></div>
            <div className="col-2">
              <label
                htmlFor="payment_method"
                className="formLabel fs-5 fw-bold"
              >
                Paid by:
              </label>
            </div>

            <div className="col-2">

              <select
                id="payment_method"
                name="payment_method"
                className="formInput"
              >
                <option value="Visa">
                  Visa
                </option>

                <option value="MasterCharge">
                  Master Card
                </option>

                <option value="Discover">
                  Discover
                </option>

                <option value="American Express">
                  American Express
                </option>

              </select>

            </div>
            <div className="col-2">
              <label className="formLabel fs-5 fw-bold">
                Price:
              </label>
            </div>

            <div className="col-3">
              <input
                type="text"
                name="price_paid"
                id="price_paid"
                value={FormHelp.ToCurrency(formData.price_paid)}
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
                type="text"
                name="number_of_classes"
                id="number_of_classes"
                value={formData.number_of_classes}
                readOnly
                className="formInput"
              />
            </div>

            <div className="col-2">
              <label className="formLabel fs-5 fw-bold">
                Days:
              </label>
            </div>

            <div className="col-2">
              <input
                type="text"
                name="days"
                id="days"
                value={formData.days}
                readOnly
                className="formInput"
              />
            </div>


            <div className="col-2">
              <label className="formLabel fs-5 fw-bold">
                Sale Type:
              </label>
            </div>

            <div className="col-2 pr-3">
              <input
                type="text"
                name="yoga_class_type"
                id="yoga_class_type"
                value={formData.yoga_class_type}
                readOnly
                className="formInput"
              />
            </div>

          </div>

          <div className="row p-3 border-bottom border-dark border-solid">

            <div className="col-2">
              <label
                htmlFor="start_date"
                className="formLabel fs-5 fw-bold"
              >
                Start Date:
              </label>
            </div>

            <div className="col-4">

              <input
                type="date"
                name="start_date"
                id="start_date"
                className="formInput"
              />

            </div>

            <div className="col-2">
              <label
                htmlFor="end_date"
                className="formLabel fs-5 fw-bold"
              >
                End Date:
              </label>
            </div>

            <div className="col-4">

              <input
                type="date"
                name="end_date"
                id="end_date"
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
                onClick={submitSale}
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
 * UpdateDeleteSale(action, id)
 * @param {*} action
 * @returns
 */
function UpdateDeleteSale(action) {

  //  let msg = document.getElementById("response");

  /**
   * submit sale Updates
   */
  const updateSale = async () => {
    const form = document.getElementById("modClass");

    const formData = new FormData(form);

    const sale = {
      package_id: formData.get("package_id"),
      customer_id: formData.get("customer_id"),
      yoga_class_type: formData.get("yoga_class_type"),
      number_of_classes: formData.get("number_of_classes"),
      price_paid: String(formData.get("price_paid")).replace(/[$,]/g, ""),
      payment_method: formData.get("payment_method"),
      start_date: formData.get("start_date"),
      end_date: formData.get("end_date"),
      days_valid: formData.get("days")
    };

    FormHelp.LogIt("Updating sale:", sale);

    try {
      const response = await fetch(
        `/api/sales/${formData.get("sale_id")}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(sale)
        }
      );
      const data = await response.json();
      FormHelp.ErrCheck(response);

    } catch (error) {
      FormHelp.DisplayErr(error);
    }
  };

  /**
   * deletes the sale by ID
   */
  const deleteSale = async () => {
    const form = document.getElementById("modClass");

    const formData = new FormData(form);

    const sale = {
      sale_id: formData.get("sale_id"),
    };

    FormHelp.LogIt2("Deleting sale:", sale);

    try {
      const response = await fetch(
        `/api/sales/${sale.sale_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
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

  const [sale, setSale] = useState(null);

  useEffect(() => {

    fetch(`/api/sales/${id}`)
      .then((response) => {
        FormHelp.LogIt2("Status:", response.status);

        return response.json();
      })
      .then((data) => {
        setSale(data);
      })
      .catch((error) => {
        FormHelp.ConsoleErr("Error fetching sale:", error);
      });

  }, [id]);

  return (
    <>
      {sale && (

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
                    Update or Delete Sale
                  </p>
                </div>

                <div
                  className="col-1 fs-3 pr-3 fw-bold text-white order-dark border-solid"
                  title="Return to View"
                >
                  <a href="/Sale/View">
                    <div className="btnClose FS5 text text-white">
                      X
                    </div>
                  </a>
                </div>

              </div>

              <div className="row pb-1 border-bottom border-dark border-solid">

                <div className="col-2 ps-3">
                  <label className="formLabel fs-5 fw-bold">
                    Sale ID:
                  </label>
                </div>

                <div className="col-2">
                  <input
                    type="text"
                    name="sale_id"
                    id="sale_id"
                    value={sale.sale_id}
                    readOnly
                    className="formInput"
                  />
                </div>

                <div className="col-3 ps-3">
                  <label className="formLabel fs-5 fw-bold">
                    Sale Date Time:
                  </label>
                </div>

                <div className="col-4">
                  <input
                    type="text"
                    name="sale_id"
                    id="sale_id"
                    value={FormHelp.ToDateTimeLocal(sale.sale_date_time)}
                    readOnly
                    className="formInput"
                  />
                </div>


              </div>
              <div className="row pb-1 border-bottom border-dark border-solid">

                <div className="col-2 ps-3">
                  <label className="formLabel fs-5 fw-bold">
                    Customer ID:
                  </label>
                </div>

                <div className="col-2">
                  <input
                    type="text"
                    name="customer_id"
                    id="customer_id"
                    defaultValue={sale.customer_id}
                    className="formInput"
                  />
                </div>


                <div className="col-2 ps-3">
                  <label className="formLabel fs-5 fw-bold">
                    Package:
                  </label>
                </div>

                <div className="col-2">
                  <input
                    type="text"
                    name="package_id"
                    id="package_id"
                    defaultValue={sale.package_id}
                    readOnly
                    className="formInput"
                  />
                </div>

                <div className="col-2 ps-3">
                  <label className="formLabel fs-5 fw-bold">
                    Number of Classes:
                  </label>
                </div>

                <div className="col-2">
                  <input
                    type="text"
                    name="number_of_classes"
                    id="number_of_classes"
                    defaultValue={sale.number_of_classes}
                    className="formInput"
                  />
                </div>

              </div>

              <div className="row pb-1 border-bottom border-dark border-solid">
                <div className="col-1"></div>
                <div className="col-2">
                  <label
                    htmlFor="payment_method"
                    className="formLabel fs-5 fw-bold"
                  >
                    Paid by:
                  </label>
                </div>

                <div className="col-2">

                  <input
                    type="text"
                    id="payment_method"
                    name="payment_method"
                    className="formInput"
                    defaultValue={sale.payment_method}
                  />

                </div>
                <div className="col-2">
                  <label className="formLabel fs-5 fw-bold">
                    Price:
                  </label>
                </div>

                <div className="col-3">
                  <input
                    type="text"
                    name="price_paid"
                    id="price_paid"
                    value={FormHelp.ToCurrency(sale.price_paid)}
                    readOnly
                    className="formInput"
                    inputMode="decimal"
                    placeholder="$0.00"
                  />
                </div>
              </div>

              <div className="row pb-1 border-bottom border-dark border-solid">

                <div className="col-2">
                  <label className="formLabel fs-5 fw-bold">
                    Sale Type:
                  </label>
                </div>

                <div className="col-2 pr-3">
                  <input
                    type="text"
                    name="yoga_class_type"
                    id="yoga_class_type"
                    defaultValue={sale.yoga_class_type}
                    readOnly
                    className="formInput"
                  />
                </div>

              </div>

              <div className="row p-3 border-bottom border-dark border-solid">

                <div className="col-2">
                  <label
                    htmlFor="start_date"
                    className="formLabel fs-5 fw-bold"
                  >
                    Start Date:
                  </label>
                </div>

                <div className="col-4">

                  <input
                    type="date"
                    name="start_date"
                    id="start_date"
                    className="formInput"
                    readOnly
                    value={FormHelp.ToDateOnly(sale.start_date)}

                  />

                </div>

                <div className="col-2">
                  <label
                    htmlFor="end_date"
                    className="formLabel fs-5 fw-bold"
                  >
                    End Date:
                  </label>
                </div>

                <div className="col-4">

                  <input
                    type="date"
                    name="end_date"
                    id="end_date"
                    className="formInput"
                    readOnly
                    value={FormHelp.ToDateOnly(sale.end_date)}
                  />

                </div>

              </div>


              <div className="row p-3 border-bottom border-bg-light  border-solid">
                <div className="col-5">
                  <button className="btn btn-dark fs-5 fw-bold delete border-3 border-" title="You giving money back, Seriously!?!?!?" type="button" onClick={deleteSale}>Delete Sale</button>
                </div>
                <div className="col-2">
                </div>
                <div className="col-5">
                  <button className="btn btn-dark fs-5 fw-bold update" title="OK, who made the typo?!?!?!" type="button" onClick={updateSale}>Update Sale</button>
                </div>
              </div>

            </form>

          </div>

        </>

      )}

    </>
  );
}


function SaleAction(action, id) {

  switch (action) {

    case "Add":
      return <CreateSale action="Add" id={id} />;

    case "Edit":
      return <UpdateDeleteSale action="Update" id={id} />;

    case "View":
      return <ViewSale />;

    default:
      return <ViewSale />;
  }
}


function Sale() {

  const { action, id } = useParams();

  return SaleAction(action, id);
}


export default Sale;