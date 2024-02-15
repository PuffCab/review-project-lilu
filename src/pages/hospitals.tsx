import React, { useEffect, useState } from "react";
import ListOfHospitals from "../components/ListOfHospitals";

import useCalculateDistanceToHospitals from "../utils/usecalculateDistanceToHospitals";
import { Location } from "@/components/AlternativeMapComponent";

function HospitalsPage() {
  const [userLocation, setUserLocation] = useState<Location>({} as Location);

  //1.7km according to google maps
  // const location1 = [52.47304137480423, 13.425472026026231]
  // const location2 = [52.48656925572065, 13.424486699004747]

  //6.4km according to google maps:
  // const location1 = [52.51812040534005, 13.432188559032596];
  // const location2 = [52.5094117367754, 13.520745861428354];

  // const distance = useCalculateDistanceToHospitals(location1, location2);

  // console.log("distance final :>> ", distance);

  const getUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation not supported");
    }
  };

  // Function to handle the geolocation response
  const showPosition = async (position) => {
    const { latitude, longitude } = position.coords;
    console.log("position.coords HOSPITALS:>> ", position.coords);
    setUserLocation({
      latitude: latitude,
      longitude: longitude,
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div>
      <ListOfHospitals userLocation={userLocation} />
    </div>
  );
}

export default HospitalsPage;
