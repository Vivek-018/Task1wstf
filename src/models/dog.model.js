// import mongoose from 'mongoose';

// const dogSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   breed: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: Number,
//     required: true,
//   },
//    colour: {
//      type: String,
//      required: true,
//    },
//   gender: {
//     type: String,
//     required: true,
//   },
//   avatar: {
//     type: String, // URL from Cloudinary
//   },
//   dogDetails: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'DogDetails',
//   }
// }, {
//   timestamps: true,
// });
// const Dog = mongoose.model('Dog', dogSchema);
// export default Dog;


import mongoose from "mongoose";

const dogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    color: { type: String, required: true },
    breed: { type: String, required: true },
    sterilizationCard: {
      type: String,
      enum: ["yes", "no", "book an appointment"],
      default: "no",
    }, // Enum for sterilization card status
    vaccinationCard: {
      type: String,
      enum: ["yes", "no", "book an appointment"],
      default: "no",
    }, // Enum for vaccination card status
  },
  { timestamps: true }
);

const Dog = mongoose.model("Dog", dogSchema);
export default Dog;
