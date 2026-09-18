/* todo change instructor to select box */
return (
    <>
        <div id="response" className="ajaxReturnMsg"></div>

        <form id="modClass" className="classForm" action="doit">
            <h2>I am a Add!</h2>
            <label for="id">Class ID</label>
            <input type="text" name="id" />

            <label for="role">Role</label>
            <select id="role" name="role">
                <option value="Manager" >Manager</option>
                <option value="Instructor" >Instructor</option>
            </select>

            <label for="date">Class ID</label>
            <input type="date" name="date" />

            <label for="start">Start time:</label>
            <input type="time" id="start" name="start" />

            <label for="start">Start time:</label>
            <input type="time" id="start" name="start" />

        </form>
    </>
);