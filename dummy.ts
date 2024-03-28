// import { Request, Response } from "express";
// import { Country } from "../models/country";

// // Function to generate value from name
// const getValueFromName = (name: string): string => {
//   return name.toLowerCase().replace(/\s+/g, "_");
// };

// // Controller function to create multiple countries
// export const createCountries = async (req: Request, res: Response) => {
//   try {
//     const countriesData = req.body;

//     // Generate value for each country from its name
//     const countriesWithValues = countriesData.map((country: any) => ({
//       ...country,
//       value: getValueFromName(country.name),
//     }));

//     // Create all countries at once
//     const createdCountries = await Country.insertMany(countriesWithValues);

//     // Omitting ObjectId fields from response
//     const sanitizedCountries = createdCountries.map((country: any) => ({
//       ...country.toObject(),
//       _id: undefined,
//     }));

//     return res.status(201).json(sanitizedCountries);
//   } catch (error) {
//     return res.status(500).json({ error: "Could not create countries" });
//   }
// };

// // Controller function to get country by value
// export const getCountryByValue = async (req: Request, res: Response) => {
//   const value = req.params.value;

//   try {
//     const country = await Country.findOne({ value }, { _id: 0 });

//     if (!country) {
//       return res.status(404).json({ error: "Country not found" });
//     }

//     return res.json(country);
//   } catch (error) {
//     return res.status(500).json({ error: "Could not fetch country by value" });
//   }
// };

// // Controller function to get all countries with their population
// export const getAllCountriesWithPopulation = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const countries = await Country.find(
//       {},
//       { _id: 0, name: 1, population: 1, value: 1 }
//     );

//     return res.json(countries);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ error: "Could not fetch countries with population" });
//   }
// };

// export const getCountryPopByValue = async (req: Request, res: Response) => {
//   const value = req.params.value;

//   try {
//     const country = await Country.findOne(
//       { value },
//       { _id: 0, name: 1, value: 1, population: 1 }
//     );

//     if (!country) {
//       return res.status(404).json({ error: "Country not found" });
//     }

//     return res.json(country);
//   } catch (error) {
//     return res.status(500).json({ error: "Could not fetch country by value" });
//   }
// };

// // Controller function to get all countries with their languages
// export const getAllCountriesLang = async (req: Request, res: Response) => {
//   try {
//     const countries = await Country.find(
//       {},
//       { _id: 0, name: 1, languages: 1, value: 1 }
//     );

//     return res.json(countries);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ error: "Could not fetch countries with population" });
//   }
// };

// export const getCountryLangByValue = async (req: Request, res: Response) => {
//   const value = req.params.value;

//   try {
//     const country = await Country.findOne(
//       { value },
//       { _id: 0, name: 1, value: 1, languages: 1 }
//     );

//     if (!country) {
//       return res.status(404).json({ error: "Country not found" });
//     }

//     return res.json(country);
//   } catch (error) {
//     return res.status(500).json({ error: "Could not fetch country by value" });
//   }
// };

// // Controller function to get all countries with their currency
// export const getAllCountriesCurrency = async (req: Request, res: Response) => {
//   try {
//     const countries = await Country.find(
//       {},
//       { _id: 0, name: 1, currency_name: 1, currency_code: 1, value: 1 }
//     );

//     return res.json(countries);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ error: "Could not fetch countries with population" });
//   }
// };

// export const getCountryCurrencyByValue = async (
//   req: Request,
//   res: Response
// ) => {
//   const value = req.params.value;

//   try {
//     const country = await Country.findOne(
//       { value },
//       { _id: 0, name: 1, value: 1, currency_name: 1, currency_code: 1 }
//     );

//     if (!country) {
//       return res.status(404).json({ error: "Country not found" });
//     }

//     return res.json(country);
//   } catch (error) {
//     return res.status(500).json({ error: "Could not fetch country by value" });
//   }
// };

// // Controller function to get all countries with their tel codes
// export const getAllCountriesTel = async (req: Request, res: Response) => {
//   try {
//     const countries = await Country.find(
//       {},
//       { _id: 0, name: 1, telephone_code: 1, value: 1 }
//     );

//     return res.json(countries);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ error: "Could not fetch countries with population" });
//   }
// };

// export const getCountryTelByValue = async (req: Request, res: Response) => {
//   const value = req.params.value;

//   try {
//     const country = await Country.findOne(
//       { value },
//       { _id: 0, name: 1, value: 1, telephone_code: 1 }
//     );

//     if (!country) {
//       return res.status(404).json({ error: "Country not found" });
//     }

//     return res.json(country);
//   } catch (error) {
//     return res.status(500).json({ error: "Could not fetch country by value" });
//   }
// };

// // Controller function to get all countries with their Capital City
// export const getAllCountriesCapitalCity = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const countries = await Country.find(
//       {},
//       { _id: 0, name: 1, capital: 1, value: 1 }
//     );

//     return res.json(countries);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ error: "Could not fetch countries with population" });
//   }
// };

// export const getCountryCapitalCityByValue = async (
//   req: Request,
//   res: Response
// ) => {
//   const value = req.params.value;

//   try {
//     const country = await Country.findOne(
//       { value },
//       { _id: 0, name: 1, value: 1, capital: 1 }
//     );

//     if (!country) {
//       return res.status(404).json({ error: "Country not found" });
//     }

//     return res.json(country);
//   } catch (error) {
//     return res.status(500).json({ error: "Could not fetch country by value" });
//   }
// };
