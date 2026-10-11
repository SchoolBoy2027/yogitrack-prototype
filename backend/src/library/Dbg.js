/**
 * Dbg: Static Debugging library, wrapper aroound the console out
 */
class Dbg {

    /**
     * ConsoleErr
     * Logs an error message to the console.
     * @param {*} message
     * @param {*} error
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
     * LogIt2(sMsg)
     * Wrapper For the console log 2 parameters
     */
    static LogIt2(sMsg, someObj) {
        console.log(sMsg, someObj);
    }


}

module.exports = Dbg;