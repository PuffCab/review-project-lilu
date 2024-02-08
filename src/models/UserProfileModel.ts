import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dueDate: {
    type: Date,
  },
  babyBorn: {
    type: Boolean,
    default: false,
  },
});

const UserProfileModel = mongoose.models.UserProfileModel || mongoose.model('UserProfileModel', userProfileSchema);
export default UserProfileModel;
