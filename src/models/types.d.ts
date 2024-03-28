import { Document } from "mongoose";

// Define interfaces for document types
export interface CountryDoc extends Document {
  name: string;
  code: string;
  capital: string;
  population: number;
  area: { number: number; measure: string };
  currency_name: string;
  currency_code: string;
  languages: string[];
  region: string; // Assuming regionId is stored as a string
  value: string;
  telephone_code: string;
}

export interface RegionDoc extends Document {
  name: string;
  value: String;
  countries: string[]; // Assuming array of country IDs stored as strings
}

export interface CountryCodeDoc extends Document {
  country: string;
  alpha2Code: string;
  alpha3Code: string;
}

export interface CacheDoc extends Document {
  key: string;
  data: object;
  expiration: Date;
}

// this is what we will do, first list the first 25 countries in africa and use this type convention for the thire data "  code: string;
//   capital: string;
//   population: number;
//   area: {number:number, measure:string};
//   currency: string;
//   languages: string[];"
