import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import {
  Coords,
  LatLng,
  LatLngExpression,
  LatLngLiteral,
  LatLngTuple,
} from "leaflet";

type ChangeViewProps = {
  coords: LatLngExpression;
};

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

  const [latitude, setLatitude] = useState<number | null>(52.52);
  const [longitude, setLongitude] = useState<number | null>(13.505);
  const [locationData, setLocationData] = useState<any | null>(null);
  const [address, setAddress] = useState<string>("");

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
  // // Get the user's actual location using the previous code
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

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  //converting address to location, using the same api as before
  const convertAddressToLocation = async () => {
    const fullAddress = `${streetAddress}, ${postalCode} ${city}, ${country}`;

    if (!isValidAddress(fullAddress)) {
      return;
    }

    try {
      const formattedAddress = encodeURIComponent(fullAddress);
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=en&locality=${formattedAddress}`
      );
      const result = await response.json();

      if (result && result.latitude && result.longitude) {
        setLatitude(result.latitude);
        setLongitude(result.longitude);
        setLocationData(result);
        console.log("Location data:", result);
      } else {
        console.log("Location data not found for the address.");
      }
    } catch (error) {
      console.error("Error converting address to location:", error);
    }
  };

  // const handleLocationClick = () => {
  //   if (isValidAddress(address)) {
  //     setLatitude(latitude);
  //     setLongitude(longitude);
  //   } else {
  //     setLatitude(52.52);
  //     setLongitude(13.405);
  //   }
  // };
  const center: LatLngExpression = [
    latitude || 52.52,
    longitude || 13.405,
  ] as LatLngExpression;
  const fillRedOptions = { fillColor: "red" };

  const isValidAddress = (address: string) => {
    return address.trim() !== "";
  };

  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleStreetAddressChange = (e) => {
    setStreetAddress(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  return (
    <div className="bg-red-50 p-8">
      <div className="flex flex-col items-center">
        {" "}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Street Address"
            value={streetAddress}
            onChange={handleStreetAddressChange}
            className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={handlePostalCodeChange}
            className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={handleCityChange}
            className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={handleCountryChange}
            className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          onClick={convertAddressToLocation}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg"
        >
          Convert Address
        </button>
        <button
          onClick={getLocationOnClick}
          className="bg-red-300 text-white font-bold py-2 px-4 rounded-lg"
        >
          Use My Location
        </button>
      </div>

      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "60vh", width: "80vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle
          center={center}
          pathOptions={fillRedOptions}
          radius={100}
          stroke={false}
        />
        {/* // NOTE: if you needed to generate several Markers (pins), here below you could map over an array of Latitude-longitude pairs, and return a <Marker/> */}
        {/* {geoData.lat && geoData.lng && ( */}
        <Marker
          position={[latitude, longitude]}
          // draggable={true}
          // animate={true}
        >
          <Popup>...this is a cool place...</Popup>
        </Marker>
        <ChangeView coords={center} />
      </MapContainer>
    </div>
  );
}
