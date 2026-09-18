

/**
 *  AddModifySale(arrInstructors) Form Component used to Add or Modify Classes
 * @param {*} arrInstructors 
 * @returns 
 */
function AddModifySale(arrInstructors) {
    {
        /* todo change package to select box */
        return (
            <>
                <div className="container" id="addModify" >
                    <div id="response" className="ajaxReturnMsg"></div>
                    <div id="response" className="ajaxReturnMsg"></div>
                        <div className="row">
                            <div className="col center fs-5 fw-bold">Add or Modify Customer</div>
                        </div>    
                        <form id="modClass" className="classForm" action="doit">
                            <h2>I am a Add!</h2>
                            <label for="id">Customer ID:</label>
                                <input type="text" name="id" />
                            <label for="package">Package</label>
                                <select id="package">
                                    <option value="General" >General</option>
                                    <option value="Senior" >Senior</option>
                                </select>
                            <label for="class_count">Number of Classes</label>
                                <select id="class_count">
                                    <option value="1" >1</option>
                                    <option value="4" >4</option>
                                    <option value="10" >4</option>
                                    <option value="Unlimited" >Unlimited</option>
                                </select>

                            <label for="customer_name">Customer Name</label>
                                <input type="text" title="Last, First" name="customer_name" id="customer_name" />
                            <label for="start">Start time:</label>
                            <input type="time" id="start" name="start" />
                            <label for="start">Start time:</label>
                            <input type="time" id="start" name="start" />

                        </form>
                </div>
            </>
        );




        /*        createRoot(document.getElementById('root')).render(
                <User />
                );  
                */
    }
}

export default AddModifySale(action);