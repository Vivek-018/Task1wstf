
import Dog from "../models/dog.model.js";
import DogDetails from "../models/dogdetails.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";

// Register a new dog
export const registerDog = asyncHandler(async (req, res) => {
  const { name, gender, age, color, breed, sterilizationCard, vaccinationCard } = req.body;
  
  const dog = await Dog.create({
    name,
    gender,
    age,
    color,
    breed,
    sterilizationCard,
    vaccinationCard,
  });
  
  res.status(201).json({
    success: true,
    data: dog,
  });
});

// Upload and save dog details
export const uploadDogDetails = asyncHandler(async (req, res) => {
  const dogId = req.params.id;
  
  // Find the dog by ID
  const dog = await Dog.findById(dogId);
  if (!dog) {
    return res.status(404).json({ success: false, message: "Dog not found" });
  }

  // Upload files to Cloudinary
  const passports = req.files.passports ? await uploadOnCloudinary(req.files.passports[0].path) : null;
  const ownerPhoto = req.files.ownerPhoto ? await uploadOnCloudinary(req.files.ownerPhoto[0].path) : null;
  const ownerIdProof = req.files.ownerIdProof ? await uploadOnCloudinary(req.files.ownerIdProof[0].path) : null;
  const healthCertificate = req.files.healthCertificate ? await uploadOnCloudinary(req.files.healthCertificate[0].path) : null;
  const vaccinationCard = req.files.vaccinationCard ? await uploadOnCloudinary(req.files.vaccinationCard[0].path) : null;

  const dogDetails = await DogDetails.create({
    dog: dog._id,
    dogPassport: passports?.url,
    ownerWithDogPhoto: ownerPhoto?.url,
    ownerProof: ownerIdProof?.url,
    healthCertificate: healthCertificate?.url,
    vaccinationCard: vaccinationCard?.url,
  });

  res.status(201).json({
    success: true,
    data: dogDetails,
  });
});

// Get all dogs
export const getAllDogs = asyncHandler(async (req, res) => {
  const dogs = await Dog.find();
  res.status(200).json({
    success: true,
    data: dogs,
  });
});

// Get dog by ID
export const getDogById = asyncHandler(async (req, res) => {
  const dogId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(dogId)) {
    return res.status(400).json({ success: false, message: "Invalid dog ID format." });
  }

  const dog = await Dog.findById(dogId);
  if (!dog) {
    return res.status(404).json({ success: false, message: "Dog not found" });
  }
  res.status(200).json({
    success: true,
    data: dog,
  });
});

// Get dog details by dog ID
export const getDogDetailsById = asyncHandler(async (req, res) => {
  const dogDetails = await DogDetails.findOne({ dog: req.params.id }).populate("dog");
  if (!dogDetails) {
    return res.status(404).json({ success: false, message: "Dog details not found" });
  }
  res.status(200).json({
    success: true,
    data: dogDetails,
  });
});
