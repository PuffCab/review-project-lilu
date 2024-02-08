// scripts/populateFakeFamilies.js
import mongoose from 'mongoose';
import faker from 'faker';
import UserProfileModel from '../src/models/UserProfileModel';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
console.log('process.env.MONGODB_URI :>> ', process.env.MONGODB_URI);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

async function createUserProfile(numFamilies = 10) {
  for (let i = 0; i < numFamilies; i++) {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const dueDate = faker.date.future();
    const babyBorn = faker.datatype.boolean();

    const userProfile = new UserProfileModel({
      name,
      email,
      dueDate,
      babyBorn,
    });


    try {
          const savedProfile = await userProfile.save();
      // Logs each created profile immediately after it's saved
      console.log(`Family profile created:`, savedProfile);
    } catch (error) {
      console.error('Error creating family profile:', error);
    }
  }
 console.log("Fetching all created profiles...");
  const allProfiles = await UserProfileModel.find({});
  console.log(allProfiles);
  mongoose.disconnect();
}

createUserProfile(20); // Creates 20 fake profiles