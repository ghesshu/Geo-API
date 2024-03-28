import mongoose, { Schema } from "mongoose";
import { RegionDoc } from "./types";

const regionSchema = new Schema<RegionDoc>({
  name: String,
  value: String,
  countries: [{ type: Schema.Types.ObjectId, ref: "Country" }],
});

export const Region = mongoose.model<RegionDoc>("Region", regionSchema);
