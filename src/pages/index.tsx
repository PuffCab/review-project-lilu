import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import BabyImage from "@/images/BabyImage.jpg";
import Image from "next/image";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationData, setLocationData] = useState(null);

  // useEffect(() => {
  //   function getLocation() {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(showPosition);
  //     } else {
  //       console.log("Geolocation not supported");
  //     }
  //   }

  //   async function showPosition(position) {
  //     const { latitude, longitude } = position.coords;
  //     setLatitude(latitude);
  //     setLongitude(longitude);

  //     const response = await fetch(
  //       `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  //     );
  //     const result = await response.json();
  //     console.log("Result: ", result);

  //     if (result) {
  //       setLocationData(result);
  //       console.log("Location data:", result);
  //     } else {
  //       console.log("Location data not found in the API response.");
  //     }
  //   }
  //   getLocation();
  // }, []);

  return (
    <>
      <Head>
        <title>LiLu</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <Script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin=""
        ></Script>
      </Head>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />

      <div className="bg-red-50 p-8">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          LiLu - Your Virtual Midwife
        </h1>

        <div className="bg-red-50 50 p-8">
          <Image src={BabyImage} alt="My Image" className="rounded-full" />

          <p className="text-lg">
            Whether you're an expecting parent or a caregiver, LiLu is here to
            support you on your journey. We're like your virtual midwife,
            providing guidance and resources every step of the way.
          </p>
          <p className="text-lg mt-4">Here's what you can do with LiLu:</p>
          <ul className="list-disc list-inside text-lg mt-2">
            <li>
              Find the nearest hospitals and midwives -{" "}
              <a href="/map" className="text-blue-500 underline">
                Explore Maps
              </a>
            </li>
            <li>
              Get your pregnancy questions answered by approved midwives -{" "}
              <a href="/questions" className="text-blue-500 underline">
                Ask Questions
              </a>
            </li>
            <li>
              Access best practice tips from our expert midwifery and doctors
              team -{" "}
              <a href="/tips" className="text-blue-500 underline">
                Browse Tips
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
