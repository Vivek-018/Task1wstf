// import { Router } from "express";
// const router = Router();
// import { registerDog } from "../controllers/dog.controller.js";

// router.route("/register").post(registerDog);
// router.route("/:id").get(registerDog);

// export default router;


import  {Router}  from "express";
import { registerDog, uploadDogDetails, getAllDogs, getDogById, getDogDetailsById } from "../controllers/dog.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; // Your multer config

const router = Router();

// Register a dog
router.route("/register").post(registerDog);

// Upload dog details (passports, photos, etc.)
router.route("/:id/details").post(
  upload.fields([
    { name: 'passports', maxCount: 2 },
    { name: 'ownerPhoto', maxCount: 1 },
    { name: 'ownerIdProof', maxCount: 1 },
    { name: 'healthCertificate', maxCount: 1 },
    { name: 'vaccinationCard', maxCount: 1 }
  ]), 
  uploadDogDetails
);

// Get all dogs
router.route("/").get(getAllDogs);

// Get a dog by ID
router.route("/:id").get(getDogById);

// Get details of a dog by ID
router.route("/:id/details").get(getDogDetailsById);

export default router;
