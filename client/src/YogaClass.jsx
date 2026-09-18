


/**
 *   CUDYogaClass(arrInstructors)
 * @param {*} arrInstructors 
 * @returns 
 */
function CUDYogaClass() {
    /* todo change instructor to select box */
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
                            <p className="p-3 fs-3 fw-bold text-white">Create Yoga Class</p>
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
                            <label for="date_of_class" className="formLabel fs-5 fw-bold">Date:</label>
                        </div>
                        <div className="col-4">
                            <input type="date" name="date_of_class" id="date_of_class" className="formInput" />
                        </div>

                    </div>

                    <div className="row pb-1 border-bottom border-dark border-solid">
                        <div className="col-3">
                            <label for="Instructor" className="formLabel fs-5 fw-bold">Instructor:</label>
                        </div>
                        <div className="col-8">
                            <select id="role" name="Customer" className="formInput fs-6">
                                <option value="Terry" >Terry</option>
                                <option value="Tina" >Tina</option>
                                <option value="Theresa" >Teresa</option>
                                <option value="Tracy" >Tracy</option>
                            </select>
                        </div>
                    </div>

                    <div className="row p-3 border-bottom border-dark  border-solid">
                        <div className="col-2">
                            <label for="start_time" className="formLabel fs-5 fw-bold">Start Time:</label>
                        </div>
                        <div className="col-4">
                            <input type="time" name="start_time" id="start_time" className="formInput" />
                        </div>
                        <div className="col-2">
                            <label for="end_date" className="formLabel fs-5 fw-bold">End Time:</label>
                        </div>
                        <div className="col-4">
                            <input type="time" name="end_time" id="end_time" className="formInput" />
                        </div>
                    </div>

                    <div className="row p-3 border-bottom border-dark  border-solid">
                        <div className="col-9">
                        </div>
                        <div className="col-2">
                            <button className="btn btn-dark fs-5 fw-bold" type="button" onClick="">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </>

    );
}


function YogaClass() {
    return (
        CUDYogaClass()
    );
}



export default YogaClass;

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

        */