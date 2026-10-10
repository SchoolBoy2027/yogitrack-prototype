
import { useEffect, useState } from "react";
import FormHelp from '../library/FormHelp'; //gotta go up one folder first

/**
 * PersonSelect({endpoint,label,value,onChange,idField="user_id"
 * Provides reusable component for selecting users, managers, instructors and customers
})
 * @param {*} endpoint example api/customers
 * @param {*} label example Customers 
 * @param {*} value customer_id value for customer example, used in a setter 
 * @param {*} onchange do what when we change 
 * @param {*} idField example customer_id
 * @returns component for people selection
 */
function PersonSelect({
  endpoint,
  label,
  value,
  onChange,
  idField = "user_id"
}) {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch people from the API
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(endpoint);

        FormHelp.ErrCheckThrow(response, `PersonSelect`);

        const data = await response.json();

        console.log(`${label} data:`, data);

        setPeople(data);
      } catch (error) {
        FormHelp.ConsoleErr(`Error fetching ${label}:`, error);
        setError(`Unable to load ${label}.`);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, [endpoint, label]);

  if (loading) {
    return <p>Loading {label}...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="row pb-1 border-bottom border-dark border-solid">
      <div className="col-3">
        <label htmlFor={`${label.toLowerCase()}_id`} className="formLabel fs-5 fw-bold">
          {label}:
        </label>
      </div>
      <div className="col-8">
        <select
          id={`${label.toLowerCase()}_id`}
          name={`${label.toLowerCase()}_id`}
          value={value}
          onChange={onChange}
          className="formInput"
        >
          <option value="">
            Select {label}
          </option>

          {people.map((person) => (
            <option
              key={person[idField]}
              value={person[idField]}
            >
              {person.fname + ' ' + person.lname}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
}

export default PersonSelect;

