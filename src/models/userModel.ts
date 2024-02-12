import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
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

const UserModel = mongoose.model("userProfile", userSchema);

export  {UserModel};
