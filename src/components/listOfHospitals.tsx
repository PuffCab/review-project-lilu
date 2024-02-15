import React, { useEffect, useState } from "react";
import { Hospital, Location } from "@/components/AlternativeMapComponent";
import dynamic from "next/dynamic";
// import SingleHospitalMap from "./SingleHospitalMap";
const SingleHospitalMap = dynamic(
  () => import("@/components/SingleHospitalMap"),
  {
    loading: () => {
      return <h1>...Loading Map...</h1>;
    },
    ssr: false,
  }
);
type ListOfHospotalsProps = {
  userLocation: Location;
};

function ListOfHospitals({ userLocation }: ListOfHospotalsProps) {
  const [hospitals, setHospitals] = useState<Hospital[]>([] as Hospital[]);

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
        <div
          key={hospital._id}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="p-4 shadow-md rounded-lg max-w-96">
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
          {/* //REVIEW in DIV below Remove inline style and add tailwind flexbox classes  */}
          <div
            className="p-4 shadow-md rounded-sm"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <SingleHospitalMap
              userLocation={userLocation}
              hospital={hospital}
            />
          </div>
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
