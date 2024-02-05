import HospitalModel from "@/models/hospitalModel";
import dbConnection from "@/utils/dbConnection";
import React from "react";
import mongoDBConnect from "../../../lib/mongoDBConnect";

export async function getServerSideProps() {
  // Fetch data from external API
  //   const res = await fetch(`https://.../data`);
  //   const data = await res.json();

  // const mongoDB = await dbConnection();
  await mongoDBConnect(); //REVIEW here i just replaced your connection function for mine. to make equal to a variable, as you did, or not, as I do, makes no difference here

  const hospitals = await HospitalModel.find();

  // console.log("hospitals :>> ", hospitals);

  //REVIEW in order to be able to send it to the client part of the component, we need to "serialize it", basically turns what it comes from mongoDB into a string object (JSON.stringify), and later into a Javascrpit object (JSON.parse)
  const serializedHospitals = JSON.parse(JSON.stringify(hospitals));
  // console.log("serializedHospitals :>> ", serializedHospitals);
  // Pass data to the page via props
  return { props: { serializedHospitals } };
}

function testMongodb() {
  return (
    <div>
      <h1>testing connection to DB</h1>
    </div>
  );
}

export default testMongodb;
