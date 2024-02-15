import React from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import { Hospital, Location } from "./AlternativeMapComponent";
import { LatLngExpression } from "leaflet";
import { user } from "@nextui-org/react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import SingleHospitalDistance from "./SingleHospitalDistance";

type SingleHospitalMapProps = {
  hospital: Hospital;
  userLocation: Location;
};

function SingleHospitalMap({ hospital, userLocation }: SingleHospitalMapProps) {
  const center: LatLngExpression = [
    userLocation.latitude || 52.52,
    userLocation.longitude || 13.405,
  ] as LatLngExpression;

  console.log("hospital :>> ", hospital);
  const fillRedOptions = { fillColor: "red" };
  return (
    // <div style={{ display: "flex", flexDirection: "column" }}>
    <div className="flex-col bg-red">
      <MapContainer
        center={center}
        zoom={10}
        style={{ height: "250px", width: "250px" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Circle
          position={[userLocation.latitude, userLocation.longitude]}
          center={center}
          pathOptions={{ fillColor: "red" }}
          radius={200}
        >
          <Popup>you are here!</Popup>
        </Circle>

        <Marker
          key={hospital._id}
          position={[hospital.location.latitude, hospital.location.longitude]}
        >
          {/* <Popup>
            <div>
              <h2>{hospital.name}</h2>
              <p>{`${hospital.address.streetName} ${hospital.address.houseNumber}, ${hospital.address.postalCode} ${hospital.address.city}, ${hospital.address.district}`}</p>

              <p className="text-gray-600">Contact: {hospital.contact.tel}</p>
              <p>
                href={`mailto:${hospital.contact.email}`}
                Mail: {hospital.contact.email}
              </p>
              <p>Delivery Rooms: {hospital.deliveryRooms}</p>
              <p>On-call Midwife: {hospital.onCallMidwife ? "Yes" : "No"}</p>
              <p>
                Neonatal Unit Available:{" "}
                {hospital.neonatalUnitAvailable ? "Yes" : "No"}
              </p>
              <p>Births Per Year: {hospital.birthsPerYear}</p>
              <p>Year: {hospital.year}</p>
            </div>
          </Popup> */}
        </Marker>
        {userLocation.latitude && userLocation.longitude && (
          <Polyline
            pathOptions={{ color: "blue" }}
            positions={[
              [userLocation.latitude, userLocation.longitude],
              [hospital.location.latitude, hospital.location.longitude],
            ]}
          />
        )}
      </MapContainer>
      <SingleHospitalDistance
        hospitalLocationCoords={[
          hospital.location.latitude,
          hospital.location.longitude,
        ]}
        userLocationCoords={[userLocation.latitude, userLocation.longitude]}
      />
    </div>
  );
}

export default SingleHospitalMap;
