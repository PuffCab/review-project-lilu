import useCalculateDistanceToHospitals from "@/utils/usecalculateDistanceToHospitals";
import React from "react";

type SingleHospitalDistanceProps = {
  hospitalLocationCoords: number[];
  userLocationCoords: number[];
};

function SingleHospitalDistance({
  hospitalLocationCoords,
  userLocationCoords,
}: SingleHospitalDistanceProps) {
  const distance = useCalculateDistanceToHospitals(
    hospitalLocationCoords,
    userLocationCoords
  );
  return (
    <p className="text-center text-lg font-medium">
      you are at {distance ? distance : "...calculating..."} Km.
    </p>
  );
}

export default SingleHospitalDistance;
