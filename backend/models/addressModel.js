import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  province: { type: Object, required: true },
  district: { type: Object, required: true },
  ward: { type: Object, required: true },
  street: { type: String, required: true },
  zipcode: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
});

const addressModel =
  mongoose.models.address || mongoose.model("address", addressSchema);

export default addressModel;
