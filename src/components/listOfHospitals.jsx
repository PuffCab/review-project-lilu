import React, { useEffect, useState } from "react";

function ListOfHospitals() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/getHospitals");
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
    <div className="space-y-4 p-4">
      {hospitals.map((hospital) => (
        <div key={hospital._id} className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-bold">{hospital.name}</h2>
          <p className="text-gray-600">
            Address: {hospital.address.streetName}{" "}
            {hospital.address.houseNumber}, {hospital.address.postalCode}{" "}
            {hospital.address.city}, {hospital.address.district}
          </p>
          <p className="text-gray-600">
            Location: Latitude {hospital.location.latitude}, Longitude{" "}
            {hospital.location.longitude}
          </p>
          <p className="text-gray-600">Contact: {hospital.contact.tel}</p>
          <p>
            {" "}
            <a
              href={`mailto:${hospital.contact.email}`}
              className="text-blue-500 hover:text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mail: {hospital.contact.email}
            </a>
          </p>
          <p className="text-gray-600">
            Delivery Rooms: {hospital.deliveryRooms}
          </p>
          <p className="text-gray-600">
            On-call Midwife: {hospital.onCallMidwife ? "Yes" : "No"}
          </p>
          <p className="text-gray-600">
            Neonatal Unit Available:{" "}
            {hospital.neonatalUnitAvailable ? "Yes" : "No"}
          </p>
          <p className="text-gray-600">
            Births Per Year: {hospital.birthsPerYear}
          </p>
          <p className="text-gray-600">Year: {hospital.year}</p>
        </div>
      ))}
    </div>
    // <div>
    //   {hospitals.map((hospital) => (
    //     <div key={hospital._id}>
    //       <h2>{hospital.name}</h2>
    //       <h3>{hospital.address}</h3>
    //       <h4>{hospital.location}</h4>
    //     </div>
    //   ))}
    // </div>
  );
}

export default ListOfHospitals;
