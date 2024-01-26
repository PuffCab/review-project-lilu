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

//NOTE what this component ChangeView does is recieving some coordinates as props (a single par, not an array), and use a hook from leaflet to set the Zoom (with the .setView() method, which does the same as the attribute Zoom={12} from the MapContainer)level over the map.
// more info here: https://react-leaflet.js.org/docs/api-map/#hooks
// this ChangeView component is not strictly necessary. But it helps to inmediatly change things in the map if the coordinates changed.
export function ChangeView({ coords }: ChangeViewProps) {
  const map = useMap();
  map.setView(coords, 12);
  return null;
}

export default function AlternativeMap() {
  //NOTE if this component would receive any props , then the state variable below (geoData) wouldn't be neccesary.
  const [geoData, setGeoData] = useState<LatLngLiteral>({
    lat: 64.536634,
    lng: 16.779852,
  });

  const center: LatLngExpression = [geoData.lat, geoData.lng];
  const fillRedOptions = { fillColor: "red" };

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "70vh", width: "100vw" }}
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
      {/* //NOTE if you needed to generate several Markers (pins), here below you could map over an array of Latitude-longitude pairs, and return a <Marker/> */}
      {geoData.lat && geoData.lng && (
        <Marker
          position={[geoData.lat, geoData.lng]}
          // draggable={true}
          // animate={true}
        >
          <Popup>...this is a cool place...</Popup>
        </Marker>
      )}
      <ChangeView coords={center} />
    </MapContainer>
  );
}
