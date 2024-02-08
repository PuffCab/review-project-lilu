// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import HospitalModel from "@/models/hospitalModel";
// import dbConnection from "@/utils/dbConnection";
import type { NextApiRequest, NextApiResponse } from "next";


type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // const mongoDB = await dbConnection()

  // const hospitals = await HospitalModel.find()
  // console.log('hospitals :>> ', hospitals);
  // console.log('mongoDB :>> ', mongoDB);
  res.status(200).json({ name: "John Doe", });
}
