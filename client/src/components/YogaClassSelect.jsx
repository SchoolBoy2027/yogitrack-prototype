import { useEffect, useState } from "react";
import FormHelp from '../library/FormHelp'; //gotta go up one folder first

/**
 * YogaClassSelect({ value, onChange }) 
 * @param {*} value default value, used in a setter
 * @param {*} onChange  other controls to update, aka js function pointer 
 * @returns component select populated with yoga_classes
 */
function YogaClassSelect({ value, onChange }) {
    const [yoga_classes, setYogaClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchYogaClasses = async () => {
            try {
                const response = await fetch("/api/yoga_classes");

                await FormHelp.ErrCheckThrow(response, "YogaClassSelect");

                const data = await response.json();
                const today = new Date().toISOString().slice(0, 10);

                const todaysYogaClasses = data.filter((item) => {
                    if (!item.yoga_class_date) return false;

                    const classDate = new Date(item.yoga_class_date);

                    if (Number.isNaN(classDate.getTime())) return false;

                    return classDate.toISOString().slice(0, 10) === today;
                });

                FormHelp.LogIt2("Yoga classes for today:", todaysYogaClasses);
                setYogaClasses(todaysYogaClasses);
            } catch (error) {
                FormHelp.ConsoleErr("Error fetching yoga classes:", error);
                setError("Unable to load yoga classes.");
            } finally {
                setLoading(false);
            }
        };

        fetchYogaClasses();
    }, []);


    if (loading) return <p>Loading yoga class options...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <div className="row pb-1 border-bottom border-dark border-solid">
                <div className="col-1">
                    <label
                        htmlFor="yoga_class_id"
                        className="formLabel fs-6 fw-bold ps-3"
                    >
                        Yoga Class:
                    </label>
                </div>
                <div className="col-1">
                    <select
                        id="yoga_class_id"
                        name="yoga_class_id"
                        value={value || ""}
                        className="attendance-class-select ps-6"
                        onChange={(event) => {
                            const selected = yoga_classes.find(
                                (item) => item.yoga_class_id === event.target.value
                            );

                            //   console.log("Selected class:", selected);

                            onChange(selected || null);
                        }}
                    >
                        <option value="">Select Yoga Class</option>

                        {yoga_classes.map((item) => (
                            <option
                                key={item.yoga_class_id}
                                value={item.yoga_class_id}
                            >
                                {item.yoga_class_id} - {FormHelp.ToTimeLocal(item.start_time)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
}

export default YogaClassSelect;
