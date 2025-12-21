import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: "",
    },
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    address: [addressSchema],
    wishlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
