
import { useEffect, useState } from "react";
import DDTable from "./components/DDTable";

function InstructorPayReport() {

    const [reportDate, setReportDate] = useState(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    });

    const [instructorPay, setInstructorPay] = useState([]);
    const [reportMonth, setReportMonth] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const controller = new AbortController();

        const [year, month] = reportDate.split("-").map(Number);

        const previousMonth = new Date(year, month - 2, 1);

        setReportMonth(previousMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
        }));

        setLoading(true);
        setError("");
        setInstructorPay([]);

        fetch(`/api/reports/instructor-pay?date=${reportDate}`, {
            signal: controller.signal
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error fetching instructor pay");
                }

                return response.json();
            })
            .then((data) => {

                const formattedData = data.map((instructor) => {
                    return {
                        instructor_id: instructor.instructor_id,
                        instructor_name: instructor.instructor_name,
                        classes_taught: instructor.classes_taught,
                        students_attended: instructor.students_attended,
                        payrate: Number(instructor.payrate).toLocaleString(
                            "en-US",
                            {
                                style: "currency",
                                currency: "USD"
                            }
                        ),
                        total_pay: Number(instructor.total_pay).toLocaleString(
                            "en-US",
                            {
                                style: "currency",
                                currency: "USD"
                            }
                        )
                    };
                });

                setInstructorPay(formattedData);
                setLoading(false);
            })
            .catch((error) => {
                if (error.name !== "AbortError") {
                    console.error("Error fetching instructor pay:", error);
                    setError(error.message);
                    setLoading(false);
                }
            });

        return () => {
            controller.abort();
        };

    }, [reportDate]);

    const totalClasses = instructorPay.reduce((total, instructor) => {
        return total + instructor.classes_taught;
    }, 0);

    const totalStudents = instructorPay.reduce((total, instructor) => {
        return total + instructor.students_attended;
    }, 0);

    const totalPayroll = instructorPay.reduce((total, instructor) => {
        return total + Number(
            instructor.total_pay.replace(/[$,]/g, "")
        );
    }, 0);

    return (
        <>
            <div className="container-fluid">

                <div className="container-fluid fs-1 bg-dark text-white fw-bold left">
                    Instructor Pay Report
                </div>

                <div className="row mt-3">

                    <div className="col-md-3">
                        <label htmlFor="reportDate" className="form-label fw-bold">
                            Select Report Date
                        </label>

                        <input
                            type="date"
                            id="reportDate"
                            className="form-control"
                            value={reportDate}
                            onChange={(e) => setReportDate(e.target.value)}
                        />
                    </div>

                    <div className="col-md-9 d-flex align-items-end">
                        <h4 className="mb-1">
                            Payroll for {reportMonth}
                        </h4>
                    </div>

                </div>

                <div id="response" className="mt-3 text-danger">
                    {error}
                </div>

                {loading && (
                    <div className="mt-3">
                        Loading instructor payroll...
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <div className="row mt-3">

                            <div className="col-md-4">
                                <div className="border rounded p-3">
                                    <strong>Classes Taught:</strong> {totalClasses}
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="border rounded p-3">
                                    <strong>Student Attendances:</strong> {totalStudents}
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="border rounded p-3">
                                    <strong>Total Payroll:</strong>{" "}
                                    {totalPayroll.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD"
                                    })}
                                </div>
                            </div>

                        </div>

                        <div className="mt-3">
                            <DDTable data={instructorPay} />
                        </div>

                        {instructorPay.length === 0 && (
                            <p className="mt-3">
                                No instructor attendance records found for {reportMonth}.
                            </p>
                        )}
                    </>
                )}

            </div>
        </>
    );
}

export default InstructorPayReport;
