import React, { useEffect, useState } from "react";
//REVIEW this custom hook is built using the  Harvestine formula, to calculate distances between locations, taking into account the earth curvature : https://en.wikipedia.org/wiki/Haversine_formula

//this the shape expected in coordinates1/2 is and array with a [latitudeNumber, longitudeNumber]

// function useCalculateDistanceToHospitals(coord1, coord2) {
function useCalculateDistanceToHospitals(
  hospitalLocationCoords,
  userLocationCoords
) {
  console.log(
    "hospitalLocationCoords",
    hospitalLocationCoords,
    "userLocationCoords",
    userLocationCoords
  );
  const [distance, setDistance] = useState(0);
  const [lat1, lon1] = hospitalLocationCoords;
  const [lat2, lon2] = userLocationCoords;

  const isSameCoordinates = lat1 == lon1 && lat2 == lon2;

  const calculateDistance = () => {
    if (isSameCoordinates) {
      //if both pair of coordinates has the same values, then there is no distance.
      setDistance(0);
      // distance = 0
    }
    if (!isSameCoordinates) {
      //Conversion from degrees to Radians. Trigonometric functions in JS expect angles to be in radians
      const radianLat1 = (Math.PI * lat1) / 180;
      const radianLat2 = (Math.PI * lat2) / 180;

      // theta is the greek letter used to represent a measured angle. Used here to represen distance between 2 points.
      const theta = lon1 - lon2;
      const radianTheta = (Math.PI * theta) / 180;

      //pointsDistance represents the angular distance between two points.
      let pointsDistance =
        Math.sin(radianLat1) * Math.sin(radianLat2) +
        Math.cos(radianLat1) * Math.cos(radianLat2) * Math.cos(radianTheta);

      //making sure that distance value is not bigger than 1, since arc cosine expects a value withih range range [-1, 1].
      if (pointsDistance > 1) {
        pointsDistance = 1;
      } else {
        //calculating arc cosine
        pointsDistance = Math.acos(pointsDistance);
        //converting radians to degrees
        pointsDistance = (pointsDistance * 180) / Math.PI;
        //converting angula distance to nautical miles
        pointsDistance = pointsDistance * 60 * 1.1515;
        //nautical miles to KM
        pointsDistance = pointsDistance * 1.609344;
        // console.log("pointsDistance :>> ", pointsDistance);

        setDistance(pointsDistance.toFixed(2));
      }
    }
  };

  useEffect(() => {
    calculateDistance();
  }, [hospitalLocationCoords, userLocationCoords]);

  return distance;
}

export default useCalculateDistanceToHospitals;
