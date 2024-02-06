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
  location: {
    latitude: Number,
    longitude: Number,
    
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

// module.exports = HospitalModel;
export default HospitalModel;
