/**
 *  AddModifySale(arrInstructors) Form Component used to Add or Modify Classes
 * @param {*} arrInstructors 
 * @returns 
 */
function CUDSale() {
    {
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
                                <p className="p-3 fs-3 fw-bold text-white">Create Sale</p>
                            </div>
                            <div className="col-1 fs-3 pr-3 fw-bold text-white  order-dark border-solid" title="Not functional yet">
                                X
                            </div>
                        </div>


                        <div className="row pb-1 border-bottom border-dark border-solid">
                            <div className="col-2">
                                <label for="type" className="formLabel fs-6 fw-bold">Type</label>
                            </div>
                            <div className="col-4">
                                <select id="role" name="type" className="formInput ">
                                    <option value="Senior" >Senior</option>
                                    <option value="General" >General</option>
                                </select>
                            </div>

                            <div className="col-2">
                                <label for="number_of_classes" className="formLabel fs-6 fw-bold">Number of Classes</label>
                            </div>
                            <div className="col-4">
                                <select id="role" name="number_of_classes" className="formInput ">
                                    <option value="1" >1</option>
                                    <option value="4" >4</option>
                                    <option value="10" >10</option>
                                    <option value="Unlmited" >Unlmited</option>
                                </select>
                            </div>
                        </div>


                        <div className="row pb-1 border-bottom border-dark border-solid">
                            <div className="col-2">
                                <label for="Customer" className="formLabel fs-6 fw-bold">Customer:</label>
                            </div>
                            <div className="col-9">
                                <select id="role" name="Customer" className="formInput ">
                                    <option value="Tom" >Tom</option>
                                    <option value="Bob" >Bob</option>
                                    <option value="Richard" >Richard</option>
                                    <option value="Harold" >Harold</option>
                                </select>
                            </div>
                        </div>

                        <div className="row pb-1 border-bottom border-dark border-solid">
                            <div className="col-3 ">
                                <label for="price_paid" className="formLabel fs-6 fw-bold">Price Paid:</label>
                            </div>
                            <div className="col-3">
                                <input type="number" name="price_paid" className="formInput" step="10" />
                            </div>
                            <div className="col-2">
                                <label for="method of payment" className="formLabel fs-6 fw-bold">CPayment Method:</label>
                            </div>
                            <div className="col-3">
                                <select id="role" name="number_of_classes" className="formInput ">
                                    <option value="Visa" >Visa</option>
                                    <option value="MasterCharge" >Master Card</option>
                                    <option value="Discover" >Discover</option>
                                    <option value="American Express" >American Express</option>
                                </select>
                            </div>
                        </div>

                        <div className="row p-3 border-bottom border-dark  border-solid">
                            <div className="col-2">
                                <label for="start_date" className="formLabel fs-5 fw-bold">Start Date:</label>
                            </div>
                            <div className="col-4">
                                <input type="date" name="start_date" id="start_date" className="formInput" />
                            </div>
                            <div className="col-2">
                                <label for="end_date" className="formLabel fs-5 fw-bold">End Date:</label>
                            </div>
                            <div className="col-4">
                                <input type="date" name="end_date" id="end_date" className="formInput" />
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
}
function Sale() {
    return (
        CUDSale()
    );
}

export default Sale;
