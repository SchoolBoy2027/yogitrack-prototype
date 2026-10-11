
import { useEffect, useState } from "react";
import "./ClassSchedule.css";

const dateKey = (value) => {
  if (!value) return "";

  if (typeof value === "string") {
    return value.substring(0, 10);
  }

  const date = new Date(value);

  return localDateKey(date);
};

const localDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatTime = (value) => {
  if (!value) return "";

  return new Date(value).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  });
};

const getWeekStart = (date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);

  const day = result.getDay();
  result.setDate(result.getDate() - (day === 0 ? 6 : day - 1));

  return result;
};

export default function ClassSchedule() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("/api/yoga_classes");

        if (!response.ok) {
          throw new Error(`Failed to fetch classes: ${response.status}`);
        }

        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching yoga classes:", error);
        setError("Unable to load the class schedule.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentWeekStart = getWeekStart(today);
  const viewStart = new Date(currentWeekStart);

  viewStart.setDate(
    viewStart.getDate() + (weekOffset - 2) * 7
  );

  const days = Array.from({ length: 35 }, (_, index) => {
    const date = new Date(viewStart);
    date.setDate(date.getDate() + index);
    return date;
  });

  const weeks = Array.from({ length: 5 }, (_, index) =>
    days.slice(index * 7, index * 7 + 7)
  );

  const viewEnd = new Date(days[34]);

  const monthLabel = viewStart.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  const endMonthLabel = viewEnd.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  const getClassesForDay = (day) => {
    const key = localDateKey(day);

    return classes
      .filter((item) => dateKey(item.yoga_class_date) === key)
      .sort(
        (a, b) =>
          new Date(a.start_time) - new Date(b.start_time)
      );
  };

  if (loading) {
    return <p>Please wait while we get our act together...</p>;
  }

  if (error) {
    return <p className="schedule-error">{error}</p>;
  }

  return (
    <div className="class-schedule">
        <div className="row fs-3 text-white fw-bold">
            <div classname="col-5"></div>
            <div classname="col-2">Class Schedule</div>
            <div classname="col-5"></div>
        </div>
          <div className="row fs-3 text-white fw-bold ">
            
          <div className="col-4 ">
            {monthLabel === endMonthLabel
              ? monthLabel
              : `${monthLabel} – ${endMonthLabel}`}
          </div>
         <div className="col-4 "></div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-dark fw-bold border-white dt-center"
            onClick={() =>
              setWeekOffset((value) => value - 1)
            }
          >
            Previous Week
          </button>
        </div>
        <div className="col-1 dt-center">
          <button
            type="button"
            className="btn btn-dark fw-bold border-white dt-center"
            onClick={() => setWeekOffset(0)}
            disabled={weekOffset === 0}
          >
            Today
          </button>
        </div>
        <div className="col-1 ">
        
          <button
            type="button"
            className="btn btn-dark fw-bold border-white dt-center"
            onClick={() =>
              setWeekOffset((value) => value + 1)
            }
          >
            Next Week
          </button>

        
        </div>
      </div>

      <div className="schedule-scroll">
        <div className="schedule-calendar">
          <div className="schedule-header">
            {["Monday", "Tuesday", "Wednesday", "Thursday",
              "Friday", "Saturday", "Sunday"].map((day) => (
              <div className="schedule-day-heading" key={day}>
                {day}
              </div>
            ))}
          </div>

          <div className="schedule-month-grid">
            {weeks.map((week, weekIndex) => (
              <div className="schedule-week-row" key={weekIndex}>
                {week.map((day) => {
                  const isToday =
                    localDateKey(day) === localDateKey(today);

                  const dayClasses = getClassesForDay(day);

                  return (
                    <div
                      className={`schedule-day-cell ${
                        isToday ? "schedule-today" : ""
                      }`}
                      key={localDateKey(day)}
                    >
                      <div className="schedule-date-number">
                        <span>{day.getDate()}</span>
                      </div>

                      <div className="schedule-events">
                        {dayClasses.map((item) => (
                          <div
                            className={`schedule-event-${item.yoga_class_type }`}
                            key={item.yoga_class_id}
                            title={`${item.yoga_class_type} — ${item.instructor_name}`}
                          >

                            <span>
                              {item.instructor_name}
                            </span>

                            <span className="schedule-event-time">
                              {formatTime(item.start_time)} –{" "}
                              {formatTime(item.end_time)}
                            </span>
                          </div>
                        ))}

                        {dayClasses.length === 0 && (
                          <div className="schedule-no-classes">
                
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}