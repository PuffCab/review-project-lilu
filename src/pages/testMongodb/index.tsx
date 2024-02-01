import HospitalModel from "@/models/hospitalModel";
import dbConnection from "@/utils/dbConnection";
import React from "react";

export async function getServerSideProps() {
  // Fetch data from external API
  //   const res = await fetch(`https://.../data`);
  //   const data = await res.json();

  const mongoDB = await dbConnection();

  const hospitals = await HospitalModel.find();

  console.log("hospitals :>> ", hospitals);

  // Pass data to the page via props
  return { props: { data } };
}

function testMongodb() {
  return (
    <div>
      <h1>testing connection to DB</h1>
    </div>
  );
}

export default testMongodb;
