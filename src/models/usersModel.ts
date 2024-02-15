import mongoose from 'mongoose';

const SchemaU = mongoose.Schema

const userSchema = new SchemaU({
  name: {
    type: String,
  },
  email: {
    type: String,

  },
  password: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  babyBorn: {
    type: Boolean,
    default: false,
  },
  favoriteHospital : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hospital",
    },
  ]
});


// const UsersModel = mongoose.model("userTest", userSchema);

const UsersModel = mongoose.models.user || mongoose.model('user', userSchema);



export  default UsersModel;
