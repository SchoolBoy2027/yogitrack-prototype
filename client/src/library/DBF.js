/**
 * DBF.js
 * Database helper functions.
 */
export default class DBF {
    /**
     * Check for a duplicate user name.
     * Returns true if the user confirms the duplicate or there isn't one
     * redundant with duplicateCustomerCheck in function but different collections and error messages
     * @param {*} fname 
     * @param {*} lname 
     * @returns boolean     
     */
    static async duplicateUserCheck(fname, lname) {
        let retVal = false;        //assume the worst
        try {
            const response = await fetch("/api/users");
            const users = await response.json();

            const duplicate = users.find(
                (user) =>
                    user.fname?.trim().toLowerCase() === fname.trim().toLowerCase() &&
                    user.lname?.trim().toLowerCase() === lname.trim().toLowerCase()
            );

            if (duplicate) {
                console.log("duplicate found");
                const confirm = window.confirm(
                    `User ${fname} ${lname} already exists. Add anyway?`
                );
                console.log(`Duplicate User confirmed=`, confirm);
                retVal = confirm;
            } else {
                retVal = true;
                console.log("No duplicate found, good to go!");
            }


        } catch (error) {
            console.error("Error checking for duplicate User:", error);
        }
        return retVal;
    }

    /**
     * duplicateCustomerCheck(fname, lname) 
     * redundant with duplicateUserCheck in function but different collections, calling components 
     * and error messages, so keep
     * Returns true if the user confirms the duplicate or there isn't one
     * @param {*} fname 
     * @param {*} lname 
     * @returns boolean     
     */
    static async duplicateCustomerCheck(fname, lname) {
        let retVal = false;        //assume the worst
        try {
            const response = await fetch("/api/customers");
            const customers = await response.json();

            const duplicate = customers.find(
                (customer) =>
                    customer.fname?.trim().toLowerCase() === fname.trim().toLowerCase() &&
                    customer.lname?.trim().toLowerCase() === lname.trim().toLowerCase()
            );

            if (duplicate) {
                console.log("duplicate found");
                const confirm = window.confirm(
                    `Customer ${fname} ${lname} already exists. Add anyway?`
                );
                console.log(`Duplicate Customer confirmed=`, confirm);
                retVal = confirm;
            } else {
                retVal = true;
                console.log("No duplicate found, good to go!");
            }


        } catch (error) {
            console.error("Error checking for duplicate customer:", error);
        }
        return retVal;
    }
}
