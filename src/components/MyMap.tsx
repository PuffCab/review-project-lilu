// import React, { useEffect, useRef } from "react";
// // import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
// import L from "leaflet";

// function MyMap() {
//   const locationMap = useRef(null);
//   useEffect(() => {
//     //! Initialize leaflet map
//     const map = L.map("map").setView([51.505, -0.09], 13);
//     L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       maxZoom: 19,
//       attribution:
//         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//     }).addTo(map);
//     const marker = L.marker([51.5, -0.09]).addTo(map);
//     const circle = L.circle([51.508, -0.11], {
//       color: "red",
//       fillColor: "#f03",
//       fillOpacity: 0.5,
//       radius: 500,
//     }).addTo(map);
//     const polygon = L.polygon([
//       [51.509, -0.08],
//       [51.503, -0.06],
//       [51.51, -0.047],
//     ]).addTo(map);
//     marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
//     circle.bindPopup("I am a circle.");
//     polygon.bindPopup("I am a polygon.");

//     // Cleanup function to remove the map when the component unmounts
//     return () => {
//       map.remove();
//     };
//   }, []);
//   return <div className="map-container" ref={locationMap} />;
// }

// export default MyMap;

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

export default function MyMap(props: any) {
  const { position, zoom } = props;

  return (
    <MapContainer
      center={[40.8054, -74.0241]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.MAPBOX_API_key}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      <Marker position={[40.8054, -74.0241]} draggable={true} animate={true}>
        <Popup>Hey ! I live here</Popup>
      </Marker>
    </MapContainer>
  );
}
