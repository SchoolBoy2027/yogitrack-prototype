
import { useEffect, useState } from "react";
import DDTable from "./components/DDTable";
import FormHelp from "./library/FormHelp";
import btnMinimize from "./assets/minimize.png";

function AttendanceReport() {
    const [classes, setClasses] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const getAttendanceReport = async () => {
            try {
                const response = await fetch("/api/attendance");
                await FormHelp.ErrCheckThrow(response, "getAttendanceReport");

                const data = await response.json();
                setClasses(data);
            } catch (error) {
                FormHelp.ConsoleErr(error, "getAttendanceReport");
                setMessage("Unable to load attendance report.");
            }
        };

        getAttendanceReport();
    }, []);

    const handleClassClick = async (classId) => {
        try {
            const response = await fetch(
                `/api/attendance/${encodeURIComponent(classId)}`
            );

            await FormHelp.ErrCheckThrow(response, "getClassAttendance");

            const data = await response.json();

            setSelectedClass(data.yoga_class_id);
            setCustomers(data.customers);
            setMessage("");
        } catch (error) {
            FormHelp.ConsoleErr(error, "getClassAttendance");
            setMessage("Unable to load class attendance.");
        }
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className={selectedClass ? "col-8" : "col-12"}>
                    <div className=" fs-5 text-white fw-bold">Class Attendance Report</div>

                    <DDTable
                        data={classes}
                        clickableColumns={["yoga_class_id"]}
                        onCellClick={handleClassClick}
                    />
                </div>

                {selectedClass && (
                    <div className="col-4">
                        <div className="row">
                            <div className="col-2 fs-5 text-white fw-bold align-items-left">
                                <a
                                    href="#"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setSelectedClass("");
                                        setCustomers([]);
                                    }}
                                >
                                    <img src={btnMinimize} alt="Hide Attendance" height={"50px"} width={"50px"} />
                                </a>
                            </div>
                            <div className="col-4 fs-5 text-white fw-bold align-items-center">Class: {selectedClass}</div>
                        </div>

                        <DDTable data={customers} />
                    </div>
                )}
            </div>

            <p id="response">{message}</p>
        </div>
    );
}

export default AttendanceReport;

