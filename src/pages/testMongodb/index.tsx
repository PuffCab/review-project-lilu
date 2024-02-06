import HospitalModel from "@/models/hospitalModel";
import dbConnection from "@/utils/dbConnection";
import React from "react";
import mongoDBConnect from "../../../lib/mongoDBConnect";
import { mongo } from "mongoose";


export async function getServerSideProps() {
  // Fetch data from external API
  //   const res = await fetch(`https://.../data`);
  //   const data = await res.json();

  const mongoDB = await dbConnection();
  await mongoDBConnect();
  const hospitals = await HospitalModel.find();

  console.log("hospitals :>> ", hospitals);

  // Pass data to the page via props
  return {
    props: { data }
  return { props: { hospitals } };  };
}

function testMongodb() {
  return (
    <div>
      <h1>testing connection to DB</h1>
    </div>
  );
}

export default testMongodb;
