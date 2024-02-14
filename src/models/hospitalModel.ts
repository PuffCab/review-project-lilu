import mongoose, { Schema } from "mongoose";

//REVIEW do not forget to indicate which fields are required and which not
const hospitalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    streetName: String,
    city: String,
    houseNumber: Number,
    postalCode: String,
    district: String,
  },
  // location: {
  //   latitude: Number,
  //   longitude: Number,
    
  // },
  //!changed location-schema: MongoDB will be able to efficiently perform geospatial queries, such as finding hospitals near a certain location or within a specific radius.
  location: {
    type: { type: String, default: "Point", enum: ["Point"] }, // Ensure type is "Point"
    coordinates: { type: [Number], required: true, index: '2dsphere' }, // Index for geospatial queries
  },
  contact: {
    tel: String,
    email: String,
  },
  deliveryRooms: Number,
  onCallMidwife: Boolean,
  neonatalUnitAvailable: Boolean,
  birthsPerYear: Number,
  year: Number,
});

const HospitalModel = mongoose.model("Hospital", hospitalSchema);

//!2dshpere is used for handling geographical data like points on a map (latitude and longitude coordinates)
hospitalSchema.index({ location: "2dsphere" });

// module.exports = HospitalModel;
export default HospitalModel;
