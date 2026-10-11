
/**
 * FormHelp.js
 * Common form helper functions.
 */
export default class FormHelp {

    /**
     * DisplayFormMsg(sMsg)
     * Displays a message at the top of the form.
     */
    static DisplayFormMsg(sMsg) {
        const msg = document.getElementById("response");

        if (msg) {
            msg.innerHTML = sMsg;
        }
    }

    /**
     * ErrCheck(response, data)
     * Displays a success or error message based on the response.
     */
    static ErrCheck(response, data = {}) {
        if (response.ok) {
            FormHelp.DisplayFormMsg("Success!");
        } else {
            FormHelp.DisplayFormMsg(
                "Error: " + (data.message || response.statusText)
            );

            console.error("Error saving data:", data);
        }
    }
    /**
        * ErrCheckThrow(response, module)
        * Checks for response ok and if not throws an error to bomb the app.
        */
    static ErrCheckThrow(response, module) {

        if (!response.ok) {
            throw new Error(
                FormHelp.LogIt2(`${module} Failed to fetch data:`, response.status)
                    `Failed to fetch data: ${response.status}`
            );
        }
    }


    /**
     * DisplayErr(error)
     * Displays an error message and logs the error.
     */
    static DisplayErr(error) {
        console.error("Error during operation:", error);
        FormHelp.DisplayFormMsg("Error: " + error.message);
    }
    /**
     * ConsoleErr(error)
     * Wrapper For the console error.
     */
    static ConsoleErr(sMsg, error) {
        console.error(sMsg, error);
    }
    /**
     * LogIt(sMsg)
     * Wrapper For the console log.
     */
    static LogIt(sMsg) {
        console.log(sMsg);
    }
    /**
     * LogIt(sMsg)
     * Wrapper For the console log.
     */
    static LogIt2(sMsg, someObj) {
        console.log(sMsg, someObj);
    }

    /**
     *  ToDateTimeLocal(some_date)
     * @param {*} some_date 
     * @returns 
     */
    static ToDateTimeLocal(some_date) {
        return new Date(some_date).toLocaleString("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        });
    }

    /**
     *  ToTimeLocal(some_date)
     * @param {*} some_date with time 
     * @returns 
     */
    static ToTimeLocal(some_date) {
        return new Date(some_date).toLocaleString("en-CA", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    }

    /**
    * ToDateOnly
    * @param {*} some_date 
    * @returns 
    */
    static ToDateOnly(some_date) {
        return new Date(some_date).toLocaleString("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });

    }
    /**
    * ToFormInputDateOnly  Used for inputs into the form controls
    * @param {*} some_date 
    * @returns 
    */
   static ToFormInputDateOnly(some_date) {
    const date = some_date instanceof Date ? some_date : new Date(some_date);
    let result = "";

    if (some_date && !Number.isNaN(date.getTime())) {
        result = date.toISOString().slice(0, 10);
    }

    return result;
}

    /**
    * ToFormInputTimeOnly  Used for inputs into the form controls
    * @param {*} some_time 
    * @returns 
    */
   static ToFormInputTimeOnly(some_time) {
    const date = new Date(some_time);
    let result = "";

    if (some_time && !Number.isNaN(date.getTime())) {
        result = date.toTimeString().slice(0, 5);
    }

    return result;
}

    /**
     *  ToCurrency(value)
     * Take a Decimal 128 value or String and turn it into money
     * @param {Decimal128/String} value 
     * @returns 
     */
    static ToCurrency(value) {
        if (value && typeof value === "object") {
            value = value.$numberDecimal;
        }

        return Number(value).toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        });
    }


}       //end of class