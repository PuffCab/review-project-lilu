import { useState, useEffect, ChangeEvent } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
  Circle,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Coords, LatLngExpression } from "leaflet";
import dotenv from "dotenv";
import { useMapEvent } from "react-leaflet/hooks";
import nearestHospitals from "@/pages/api/nearestHospitals";
import DistanceToHospitals from "./DistanceToHospitals";

dotenv.config();

//!Types Created
export interface Hospital {
  address: Address;
  birthsPerYear: number;
  contact: Contact;
  deliveryRooms: number;
  location: Location;
  name: string;
  neonatalUnitAvailable: boolean;
  onCallMidwife: boolean;
  year: number;
  _id: string;
}

export interface Address {
  city: string;
  district: string;
  houseNumber: number;
  postalCode: number;
  streetName: string;
}

export interface Contact {
  email: string;
  tel: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

//! ///////

type ChangeViewProps = {
  coords: LatLngExpression;
};
type AdressType = {
  streetName: string;
  houseNumber: string;
  city: string;
  country: string;
  postalCode: string;
  latitude: number;
  longitude: number;
};
// type Hospital = {
//   _id: string;
//   name: string;
//   address: string;
//   location: {
//     latitude: number;
//     longitude: number;
//   };
// };
// NOTE: what this component ChangeView does is receiving some coordinates as props (a single parameter, not an array),
// and uses a hook from leaflet to set the Zoom (with the .setView() method, which does the same as the attribute Zoom={12} from the MapContainer)
// level over the map. More info here: https://react-leaflet.js.org/docs/api-map/#hooks
// This ChangeView component is not strictly necessary, but it helps to immediately change things in the map if the coordinates changed.
export function ChangeView({ coords }: ChangeViewProps) {
  const map = useMap();
  map.setView(coords, 10);
  return null;
}

export default function AlternativeMap() {
  // NOTE: if this component would receive any props, then the state variable below (geoData) wouldn't be necessary.
  // const [geoData, setGeoData] = useState<LatLngLiteral>({
  //   lat: 64.536634,
  //   lng: 16.779852,

  const [latitude, setLatitude] = useState<number>(52.52);
  const [longitude, setLongitude] = useState<number>(13.505);
  const [locationData, setLocationData] = useState<any | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([] as Hospital[]);

  const [address, setAddress] = useState<AdressType>({
    streetName: "",
    houseNumber: "",
    city: "",
    country: "",
    postalCode: "",
    latitude: 0,
    longitude: 0,
  });

  // function to modify address state variable onchange of corresponding input
  const handleAdressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Function to get geolocation on button click
  const getLocationOnClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation not supported");
    }
  };

  // Function to handle the geolocation response
  const showPosition = async (position) => {
    const { latitude, longitude } = position.coords;
    console.log("position.coords :>> ", position.coords);
    setLatitude(latitude);
    setLongitude(longitude);

    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    const result = await response.json();
    console.log("Result: ", result);

    if (result) {
      setLocationData(result);
      console.log("Location data:", result);
    } else {
      console.log("Location data not found in the API response.");
    }
  };
  const fetchNearbyHospitals = async (latitude, longitude, radius) => {
    const response = await fetch(
      `/api/nearestHospitals?lat=${latitude}&lng=${longitude}&radius=${radius}`
    );
    const hospitals = await response.json();
    // Use later on the fetched hospitals as needed in component
  };
  //!converting address to location, using the same api as before called reverse geocoding
  const convertAddressToLocation = async () => {
    // const fullAddress = `${streetAddress}, ${postalCode} ${city}, ${country}`;
    console.log("address :>> ", address);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?housenumber=${address.houseNumber}&street=${address.streetName}&postcode=${address.postalCode}&city=${address.city}&country=${address.country}&format=json&apiKey=${apiKey}`
      );
      console.log("response :>> ", response);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log("result adress :>> ", result);

      if (result && result.results && result.results.length > 0) {
        const { lat, lon } = result.results[0];
        setLatitude(lat);
        setLongitude(lon);
        setLocationData(result);
        console.log("Location data:", result);
      } else {
        console.log("Location data not found for the address.");
      }
    } catch (error) {
      console.error("Error converting address to location:", error);
    }
  };

  const center: LatLngExpression = [
    latitude || 52.52,
    longitude || 13.405,
  ] as LatLngExpression;
  const fillRedOptions = { fillColor: "red" };

  // function TooltipCircle() {
  // const [clickedCount, setClickedCount] = useState(0)
  // const eventHandlers = useMemo(
  //   () => ({
  //     click() {
  //       setClickedCount((count) => count + 1)
  //     },
  //   }),
  //   [],
  // )

  useEffect(() => {
    async function fetchHospitals() {
      try {
        console.log("Fetching hospital data...");

        const response = await fetch("/api/getHospitals");
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data successfully:", data);

          setHospitals(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchHospitals();
  }, []);

  return (
    <div className="bg-red-50 p-8">
      {/* <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
        <h1>Distance to Hospitals</h1>
        <DistanceToHospitals
          hospitals={hospitals}
          userLatitude={latitude}
          userLongitude={longitude}
        />
      </div> */}
      <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Enter Address
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Street Name"
              name="streetName"
              value={address.streetName}
              onChange={handleAdressChange}
              className="w-full p-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="House Number"
              name="houseNumber"
              value={address.houseNumber}
              onChange={handleAdressChange}
              className="w-full p-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Postal Code"
              name="postalCode"
              value={address.postalCode}
              onChange={handleAdressChange}
              className="w-full p-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              value={address.city}
              onChange={handleAdressChange}
              className="w-full p-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={address.country}
              onChange={handleAdressChange}
              className="w-full p-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex items-center space-x-4">
              <button
                onClick={convertAddressToLocation}
                className="flex-1 bg-blue-300 text-white font-semibold text-sm py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Convert Address
              </button>
              <p className="text-sm mx-2">or</p>
              <button
                onClick={getLocationOnClick}
                className="flex-1 bg-blue-300 text-white font-semibold text-sm py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Use My current Location
              </button>
              <button
                onClick={fetchNearbyHospitals}
                className="flex-1 bg-red-300 text-white font-semibold text-sm py-1 px-3 rounded-md hover:bg-red-500 focus:outline-none"
              >
                Show Nearest Hospitals
              </button>
            </div>
          </div>
        </div>

        <MapContainer
          center={center}
          zoom={12}
          style={{ height: "60vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Circle
            position={[latitude, longitude]}
            center={center}
            pathOptions={{ fillColor: "red" }}
            radius={400}
          >
            <Popup>you are here!</Popup>
          </Circle>
          {hospitals.map((hospital) => (
            <Marker
              key={hospital._id}
              position={[
                hospital.location.latitude,
                hospital.location.longitude,
              ]}
            >
              <Popup>
                <div>
                  <h2>{hospital.name}</h2>
                  <p>{`${hospital.address.streetName} ${hospital.address.houseNumber}, ${hospital.address.postalCode} ${hospital.address.city}, ${hospital.address.district}`}</p>

                  <p className="text-gray-600">
                    Contact: {hospital.contact.tel}
                  </p>
                  <p>
                    href={`mailto:${hospital.contact.email}`}
                    Mail: {hospital.contact.email}
                  </p>
                  <p>Delivery Rooms: {hospital.deliveryRooms}</p>
                  <p>
                    On-call Midwife: {hospital.onCallMidwife ? "Yes" : "No"}
                  </p>
                  <p>
                    Neonatal Unit Available:{" "}
                    {hospital.neonatalUnitAvailable ? "Yes" : "No"}
                  </p>
                  <p>Births Per Year: {hospital.birthsPerYear}</p>
                  <p>Year: {hospital.year}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <h2>create dropdowns and checkboxes for querying data </h2>
    </div>
  );
}

{
  /* //  <MapContainer */
}
//    center={[latitude ?? 52.52, longitude ?? 13.505]}
//    zoom={12}
//    style={{ height: "60vh", width: "80vw" }}
//    <TileLayer
//      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//    />
//    <Circle
//      center={[latitude, longitude]}
//      pathOptions={fillRedOptions}
//      radius={100}
//      stroke={false}
//    />
//    {/* // NOTE: if you needed to generate several Markers (pins), here below you could map over an array of Latitude-longitude pairs, and return a <Marker/> */}
//    {/* {geoData.lat && geoData.lng && ( */}
//    <Marker
//      position={[latitude, longitude]}
//      // draggable={true}
//      // animate={true}
//    >
//      <Popup>...this is a cool place...</Popup>
//    </Marker>
//    <ChangeView coords={center} />
//  </MapContainer>;
