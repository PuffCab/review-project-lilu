import React, { useEffect, useState } from "react";

function ListOfHospitals() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/hospitals");
        if (response.ok) {
          const data = await response.json();
          setHospitals(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {hospitals.map((hospital) => (
        <div key={hospital._id}>
          <h2>{hospital.name}</h2>
          {/* <h2>{hospital.location}</h2> */}
        </div>
      ))}
    </div>
  );
}

export default ListOfHospitals;
