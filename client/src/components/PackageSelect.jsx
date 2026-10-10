import { useEffect, useState } from "react";
import FormHelp from '../library/FormHelp'; //gotta go up one folder first

/**
 * PackageSelect({ value, onChange }) 
 * @param {*} value default value, used in a setter
 * @param {*} onChange  other controls to update, aka js function pointer 
 * @returns component select populated with packages
 */
function PackageSelect({ value, onChange }) {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch("/api/class_packages");

                FormHelp.ErrCheckThrow(response,`PackageSelect`);

                const data = await response.json();
                const activePackages = data.filter(
                    (item) => item.is_active === true
                );

                FormHelp.LogIt2("Active class package data:", activePackages);
                setPackages(activePackages);

            } catch (error) {
             FormHelp.ConsoleErr("Error fetching class packages:", error);
                setError("Unable to load class packages.");
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    if (loading) return <p>Loading package options...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="row pb-1 border-bottom border-dark border-solid">
            <div className="col-3">
                <label
                    htmlFor="package"
                    className="formLabel fs-5 fw-bold"
                >
                    Package:
                </label>
            </div>

            <div className="col-8">
                <select
                    id="package_id"
                    name="package_id"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="formInput"
                >
                    <option key="default" value="">Select Package</option>

                    {packages.map((class_package) => {
                        const packageValue =
                            class_package.class_package_id;

                        const packageTitle =
                            `${class_package.package_category} - ` +
                            `${class_package.class_type} - ` +
                            `${class_package.number_of_classes === 1000
                                ? "Unlimited"
                                : class_package.number_of_classes + " classes"}`;

                        return (
                            <option
                                key={packageValue}
                                value={packageValue}
                                title={packageTitle}
                            >
                                {packageTitle}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}

export default PackageSelect;