
import { useEffect, useState } from "react";
import DDTable from "./components/DDTable";

//here

/**
 *  InstructorEval()
 * @returns 
 */
function InstructorEval() {
    const [yogaClasses, setYogaClasses] = useState([]);
    const [attendanceLists, setAttendanceLists] = useState([]);
    const [activeTab, setActiveTab] = useState("taught");

    useEffect(() => {
        async function getInstructorReport() {
            try {
                const classResponse = await fetch("/api/yoga_classes");

                if (!classResponse.ok) {
                    throw new Error("Failed to fetch yoga classes.");
                }

                const classData = await classResponse.json();
                setYogaClasses(classData);

                const attendanceResponse = await fetch("/api/attendance");

                if (!attendanceResponse.ok) {
                    throw new Error("Failed to fetch attendance lists.");
                }

                const attendanceData = await attendanceResponse.json();
                setAttendanceLists(attendanceData);
                console.log("Attendance API response:", attendanceData);

            } catch (error) {
                console.error("Error generating instructor report:", error);
            }
        }

        getInstructorReport();
    }, []);

    /**
     * buildInstructorReport(classes)
     * @param {*} classes 
     * @returns 
     */
 function buildInstructorReport(classes) {
    const instructorTotals = {};

    for (const yogaClass of classes) {
        const instructorId = yogaClass.instructor_id;

        if (!instructorTotals[instructorId]) {
            instructorTotals[instructorId] = {
                instructor_id: instructorId,
                instructor_name: yogaClass.instructor_name,
                total_classes: 0,
                total_attendance: 0,
                unique_customers: 0,
                customerIds: new Set()
            };
        }

        instructorTotals[instructorId].total_classes++;

        const attendance = attendanceLists.find((item) => {
            return String(item.yoga_class_id) === String(yogaClass.yoga_class_id);
        });

        if (attendance) {
            instructorTotals[instructorId].total_attendance +=
                Number(attendance.number_of_students) || 0;

            if (Array.isArray(attendance.customers)) {
                for (const customer of attendance.customers) {
                    instructorTotals[instructorId].customerIds.add(
                        customer.customer_id
                    );
                }
            }
        }
    }

    const report = Object.values(instructorTotals);

    for (const instructor of report) {
        instructor.unique_customers = instructor.customerIds.size;
        delete instructor.customerIds;
    }

    report.sort((a, b) => {
        return a.instructor_name.localeCompare(b.instructor_name);
    });

    return report;
}

    function filterClasses(tab) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const lastMonday = new Date(today);
        let daysSinceMonday = today.getDay() - 1;

        if (daysSinceMonday < 0) {
            daysSinceMonday = 6;
        }

        lastMonday.setDate(today.getDate() - daysSinceMonday - 7);

        const thisMonday = new Date(lastMonday);
        thisMonday.setDate(lastMonday.getDate() + 7);

        const filteredClasses = yogaClasses.filter((yogaClass) => {
            const classDate = new Date(yogaClass.yoga_class_date);

            if (tab === "taught") {
                return classDate < today;
            }

            if (tab === "forecasted") {
                return classDate >= today;
            }

            if (tab === "lastWeek") {
                return classDate >= lastMonday && classDate < thisMonday;
            }

            return false;
        });

        return buildInstructorReport(filteredClasses);
    }

    function classesTaught() {
        return (
            <div className="tab-pane active">
                <DDTable data={filterClasses("taught")} />
            </div>
        );
    }

    function forecastedClasses() {
        const report = filterClasses("forecasted").map((instructor) => {
            return {
                instructor_id: instructor.instructor_id,
                instructor_name: instructor.instructor_name,
                total_classes: instructor.total_classes
            };
        });

        return (
            <div className="tab-pane active">
                <DDTable data={report} />
            </div>
        );
    }

    function lastWeek() {
        return (
            <div className="tab-pane active">
                <h4>Classes Taught Last Week</h4>
                <DDTable data={filterClasses("lastWeek")} />
            </div>
        );
    }

    function customerSatisfaction() {
        return (
            <div className="tab-pane active">
                <h4>Customer Satisfaction</h4>
                <p>Customer satisfaction reporting will be added later.</p>
            </div>
        );
    }

    function coworkerFeedback() {
        return (
            <div className="tab-pane active">
                <h4>Coworker Feedback</h4>
                <p>Coworker feedback reporting will be added later.</p>
            </div>
        );
    }

    return (
        <div className="container-fluid mt-4">
            <h2 className="text-white">Instructor Evaluation</h2>

            <ul className="nav nav-tabs mt-1">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "taught" ? "active" : ""}`}
                        onClick={() => setActiveTab("taught")}
                    >
                        Classes Taught
                    </button>
                </li>

                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "forecasted" ? "active" : ""}`}
                        onClick={() => setActiveTab("forecasted")}
                    >
                        Forecasted Classes
                    </button>
                </li>

                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "lastWeek" ? "active" : ""}`}
                        onClick={() => setActiveTab("lastWeek")}
                    >
                        Last Week
                    </button>
                </li>

                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "satisfaction" ? "active" : ""}`}
                        onClick={() => setActiveTab("satisfaction")}
                    >
                        Customer Satisfaction
                    </button>
                </li>

                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "feedback" ? "active" : ""}`}
                        onClick={() => setActiveTab("feedback")}
                    >
                        Coworker Feedback
                    </button>
                </li>
            </ul>

            <div className="tab-content mt-1">
                {activeTab === "taught" && classesTaught()}
                {activeTab === "forecasted" && forecastedClasses()}
                {activeTab === "lastWeek" && lastWeek()}
                {activeTab === "satisfaction" && customerSatisfaction()}
                {activeTab === "feedback" && coworkerFeedback()}
            </div>
        </div>
    );
}


//here


export default InstructorEval;
