import mongoose, {Schema} from 'mongoose';

const userProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  babyBorn: {
    type: Boolean,
  },
  favoriteHospital : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hospital",
    },
  ]
});

// const UserProfileModel = mongoose.models.UserProfileModel || mongoose.model('userProfile', userProfileSchema);
const UserProfileModel = mongoose.model("userProfile", userProfileSchema);

export default UserProfileModel;
