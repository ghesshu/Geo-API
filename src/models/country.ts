import mongoose, { Schema } from "mongoose";
import { CountryDoc } from "./types";

const countrySchema = new Schema<CountryDoc>({
  name: String,
  code: String,
  capital: String,
  population: Number,
  area: {
    number: Number,
    measure: String,
  },
  currency_name: String,
  currency_code: String,
  languages: [String],
  region: String,
  value: String,
  telephone_code: String,
});

export const Country = mongoose.model<CountryDoc>("Country", countrySchema);
