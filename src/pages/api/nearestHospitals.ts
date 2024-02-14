// import dbConnection from "@/utils/dbConnection";
// import Hospital from "../../models/hospitalModel"; 

// // Connect to database:
// dbConnection();

// export default async function nearestHospitals(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const { lat, lng, radius = 1000 } = req.query; // the radius is 1000 meters

//       // Convert lat and lng to numbers and radius to an integer
//       const latitude = parseFloat(lat);
//       const longitude = parseFloat(lng);
//       const maxDistance = parseInt(radius, 10);

//       const hospitals = await Hospital.find({
//         location: {
//           $near: {
//             $geometry: {
//               type: "Point",
//               coordinates: [longitude, latitude]
//             },
//             $maxDistance: maxDistance
//           }
//         }
//       });

//       res.status(200).json(hospitals);
//     } catch (error) {
//       console.error("Error fetching nearby hospitals:", error);
//       res.status(500).json({ error: "Failed to fetch nearby hospitals" });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
