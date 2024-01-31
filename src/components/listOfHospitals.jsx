// import React, { useEffect, useState } from "react";
// import getHospitals from "../pages/api/getHospitals";

// function listOfHospitals() {
//   const [hospitals, setHospitals] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await getHospitals();
//         setHospitals(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {hospitals.map((hospital) => (
//         <div key={hospital._id}>
//           <h2>{hospital.name}</h2>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default listOfHospitals;

// components/ListOfHospitals.jsx
import React, { useEffect, useState } from "react";

function ListOfHospitals() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/getHospitals"); // client-side fetch
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
        </div>
      ))}
    </div>
  );
}

export default ListOfHospitals;
