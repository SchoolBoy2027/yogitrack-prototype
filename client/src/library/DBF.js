/**
 * DBF.js
 * Database helper functions.
 */
export default class DBF {
    /**
     * Check for a duplicate user name.
     * Returns true if the user confirms the duplicate.
     */
    static async duplicateCheck(fname, lname){
    try {
        const response = await fetch("/api/users");
        const users = await response.json();

        const duplicate = users.find(
        (user) =>
            user.fname?.trim().toLowerCase() === fname.trim().toLowerCase() &&
            user.lname?.trim().toLowerCase() === lname.trim().toLowerCase()
        );

        if (duplicate) {
        return window.confirm(
            `${fname} ${lname} already exists. Do you want to continue?`
        );
        }

        return false;

    } catch (error) {
        console.error("Error checking for duplicate user:", error);
        return false;
    }
}



}
