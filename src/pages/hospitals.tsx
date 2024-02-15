import React from "react";
import ListOfHospitals from "../components/ListOfHospitals";
import useCalculateDistanceToHospitals from "../utils/useCalculateDistanceToHospitals";

function HospitalsPage() {
  //1.7km according to google maps
  // const location1 = [52.47304137480423, 13.425472026026231]
  // const location2 = [52.48656925572065, 13.424486699004747]

  //6.4km according to google maps:
  const location1 = [52.51812040534005, 13.432188559032596];
  const location2 = [52.5094117367754, 13.520745861428354];

  // const distance = useCalculateDistanceToHospitals(location1, location2);

  // console.log("distance final :>> ", distance);

  return (
    <div>
      <ListOfHospitals />
    </div>
  );
}

export default HospitalsPage;
