import mongoose from 'mongoose';

const SchemaU = mongoose.Schema

const userSchema = new SchemaU({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
    // unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  dueDate: {
    type: Date,
  },
  babyBorn: {
    type: Boolean,
  },
  // favoriteHospital : [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "hospital",
  //   },
  // ]
});


// const UsersModel = mongoose.model("userTest", userSchema);

const UsersModel = mongoose.models.user || mongoose.model('user', userSchema);



export  default UsersModel;
