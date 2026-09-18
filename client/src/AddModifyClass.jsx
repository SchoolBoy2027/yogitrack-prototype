

/**
 *  AddModifyClass(arrInstructors) Form Component used to Add or Modify Classes
 * @param {*} arrInstructors 
 * @returns 
 */
function AddModifyClass(arrInstructors)
{{
    /* todo change instructor to select box */
    return (
        <>
        <div id="response" className="ajaxReturnMsg"></div>

        <form id="modClass" className="classForm" action="doit">
            <h2>I am a Add!</h2>
            <label for="id">Class ID</label>
                <input type="text" name="id"/> 
            <label for="instructor">Instructor</label>
                <input type="text" name="instructor"/>  
            <label for="date">Class ID</label>
                <input type="date" name="date"/>
            <label for="start">Start time:</label>
                <input type="time" id="start" name="start"/>
            <label for="start">Start time:</label>
                <input type="time" id="start" name="start"/>

        </form>
        </>
        );
  



/*        createRoot(document.getElementById('root')).render(
        <User />
        );  
        */
}}

export default AddModifyClass(action);