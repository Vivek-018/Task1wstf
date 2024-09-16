import mongoose from 'mongoose';

const dogDetailsSchema = new mongoose.Schema({
  healthCertificate: {
    type: String, // URL from Cloudinary
    required: true,
  },
  vaccinationCard: {
    type: String, // URL from Cloudinary
    required: true,
  },
  ownerProof: {
    type: String, // URL from Cloudinary
    required: true,
  },
  dogPassport: [{
    type: String, // Array of URLs from Cloudinary
  }],
  ownerWithDogPhoto: {
    type: String, // URL from Cloudinary
    required: true,
  },
  dog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dog',
    required: true,
  }
}, {
  timestamps: true,
});

const DogDetails = mongoose.model('DogDetails', dogDetailsSchema);
export default DogDetails;
