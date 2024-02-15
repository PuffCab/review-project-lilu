import React, { useEffect } from "react";
import { Hospital, Location } from "./AlternativeMapComponent";
import useCalculateDistanceToHospitals from "@/utils/usecalculateDistanceToHospitals";
import SingleHospitalDistance from "./SingleHospitalDistance";
import dynamic from "next/dynamic";

type DistanceToHospitalsProps = {
  hospitals: Hospital[];
  userLongitude: number;
  userLatitude: number;
};

function DistanceToHospitals({
  hospitals,
  userLongitude,
  userLatitude,
}: DistanceToHospitalsProps) {
  console.log("Hospitals :>> ", hospitals);
  const userLocationCoords = [userLatitude, userLongitude];

  return (
    <>
      <h1>distance to hospitals</h1>
      <div>
        {hospitals &&
          hospitals.map((hospital) => {
            const hospitalLocationCoords = [
              hospital.location.latitude,
              hospital.location.longitude,
            ];
            return (
              <div key={hospital._id}>
                <p> {hospital.name}</p>
                <SingleHospitalDistance
                  hospitalLocationCoords={hospitalLocationCoords}
                  userLocationCoords={userLocationCoords}
                />
              </div>
            );
          })}
      </div>
    </>
  );
}

export default DistanceToHospitals;
