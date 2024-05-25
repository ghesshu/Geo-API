import { Response, Request } from "express";
import { Country } from "../models/country";
import { CountryDoc } from "../models/types";
import { Region } from "../models/region";

// Define the request interface extending from Express Request
interface CountryRequest extends Request {
  params: { value: string };
  body: any;
}

// Define the response type extending from Express Response
type CountryResponse = Response<any, Record<string, any>>;

// Function to convert name to a sanitized value
const getValueFromName = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "_");
};

// Function to handle errors and send appropriate response
const handleError = (
  res: CountryResponse,
  message: string,
  statusCode = 500
) => {
  return res.status(statusCode).json({ error: message });
};

// Function to find country by attribute(s)
const findCountryByAttribute = async (
  req: CountryRequest,
  res: CountryResponse,
  attributes: string[]
) => {
  const value = req.params.value;

  try {
    const country = await Country.findOne(
      { value },
      attributes.reduce(
        (acc: any, attr: string) => {
          acc[attr] = 1;
          return acc;
        },
        { _id: 0 }
      )
    );

    if (!country) {
      return res.status(404).json({ error: "Country not found" });
    }

    return res.json(country);
  } catch (error) {
    return handleError(res, "Could not fetch country by value");
  }
};

// Controller function to create countries
export const createCountries = async (req: Request, res: Response) => {
  try {
    let countriesData = req.body.data;
    const regionValue = "south_america";

    // Add 'value' field to each country data
    countriesData = countriesData.map((country: any) => ({
      ...country,
      value: getValueFromName(country.name),
      region: regionValue,
    }));

    const createdCountries: any[] = [];

    for (const countryData of countriesData) {
      // Check if the country value already exists in the database
      const existingCountry = await Country.findOne({
        value: countryData.value,
      });
      if (existingCountry) {
        return res
          .status(400)
          .json({ error: `Country '${countryData.name}' already exists` });
      }

      // Find the region by value
      const region = await Region.findOne({ value: regionValue });
      if (!region) {
        return res
          .status(400)
          .json({ error: `Region '${regionValue}' not found` });
      }

      // Create the country
      const country = new Country({
        ...countryData,
        region: regionValue, // Assuming region ID is stored in the country document
      });
      await country.save();
      createdCountries.push(country);

      // Push the country ID into the countries array of the region model
      region.countries.push(country._id);
      await region.save();
    }

    const sanitizedCountries = createdCountries.map((country) => ({
      ...country.toObject(),
      _id: undefined,
    }));

    return res.status(201).json(sanitizedCountries);
  } catch (error) {
    return handleError(res, "Could not create countries");
  }
};

// Controller function to get country by value
export const getCountryByValue = async (req: Request, res: Response) => {
  const value = req.params.value;

  try {
    const country = await Country.findOne({ value }, { _id: 0, __v: 0 });

    if (!country) {
      return res.status(404).json({ error: "Country not found" });
    }

    return res.json(country);
  } catch (error) {
    return res.status(500).json({ error: "Could not fetch country by value" });
  }
};

// Function to find country by value and population
export const getCountryPopByValue = async (
  req: CountryRequest,
  res: CountryResponse
) => {
  return findCountryByAttribute(req, res, ["name", "value", "population"]);
};

// Function to find country by value and languages
export const getCountryLangByValue = async (
  req: CountryRequest,
  res: CountryResponse
) => {
  return findCountryByAttribute(req, res, ["name", "value", "languages"]);
};

// Function to find country by value and currency details
export const getCountryCurrencyByValue = async (
  req: CountryRequest,
  res: CountryResponse
) => {
  return findCountryByAttribute(req, res, [
    "name",
    "value",
    "currency_name",
    "currency_code",
  ]);
};

// Function to find country by value and telephone code
export const getCountryTelByValue = async (
  req: CountryRequest,
  res: CountryResponse
) => {
  return findCountryByAttribute(req, res, ["name", "value", "telephone_code"]);
};

// Function to find country by value and capital city
export const getCountryCapitalCityByValue = async (
  req: CountryRequest,
  res: CountryResponse
) => {
  return findCountryByAttribute(req, res, ["name", "value", "capital"]);
};

// Controller function to get all countries with capital cities
export const getAllCountriesCapitalCity = async (
  req: Request,
  res: CountryResponse
) => {
  try {
    const countries = await Country.find(
      {},
      { _id: 0, name: 1, capital: 1, value: 1 }
    );
    return res.json(countries);
  } catch (error) {
    return handleError(res, "Could not fetch countries with capital cities");
  }
};

// Controller function to get all countries with currencies
export const getAllCountriesCurrency = async (
  req: Request,
  res: CountryResponse
) => {
  try {
    const countries = await Country.find(
      {},
      { _id: 0, name: 1, currency_name: 1, currency_code: 1, value: 0 }
    );
    return res.json(countries);
  } catch (error) {
    return handleError(res, "Could not fetch countries with currencies");
  }
};

// Controller function to get all countries with languages
export const getAllCountriesLang = async (
  req: Request,
  res: CountryResponse
) => {
  try {
    const countries = await Country.find(
      {},
      { _id: 0, name: 1, languages: 1, value: 1 }
    );
    return res.json(countries);
  } catch (error) {
    return handleError(res, "Could not fetch countries with languages");
  }
};

// Controller function to get all countries with telephone codes
export const getAllCountriesTel = async (
  req: Request,
  res: CountryResponse
) => {
  try {
    const countries = await Country.find(
      {},
      { _id: 0, name: 1, telephone_code: 1, value: 1 }
    );
    return res.json(countries);
  } catch (error) {
    return handleError(res, "Could not fetch countries with telephone codes");
  }
};

// Controller function to get all countries with population
export const getAllCountriesPopulation = async (
  req: Request,
  res: CountryResponse
) => {
  try {
    const countries = await Country.find(
      {},
      { _id: 0, name: 1, population: 1, value: 1 }
    );
    return res.json(countries);
  } catch (error) {
    return handleError(res, "Could not fetch countries with their Population");
  }
};

// Controller function to get all countries
export const getAllCountries = async (req: Request, res: Response) => {
  try {
    // Query all regions from the database
    const countries = await Country.find({}, { _id: 0 });

    // Return only name and value fields
    return res.json(countries);
  } catch (error) {
    return res.status(500).json({ error: "Could not fetch regions" });
  }
};

// Controller function to search through countries
export const searchThroughCountries = async (req: Request, res: Response) => {
  try {
    const query = req.query.q?.toString(); // Get the search query from request query params
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    // Perform the search using Mongoose find method
    const countries = await Country.find({
      $or: [
        { name: { $regex: new RegExp(query, "i") } }, // Case-insensitive search for country name
        { code: { $regex: new RegExp(query, "i") } }, // Case-insensitive search for country code
        { capital: { $regex: new RegExp(query, "i") } }, // Case-insensitive search for capital
        { currency_name: { $regex: new RegExp(query, "i") } }, // Case-insensitive search for currency name
        { currency_code: { $regex: new RegExp(query, "i") } }, // Case-insensitive search for currency code
        { languages: { $regex: new RegExp(query, "i") } }, // Case-insensitive search for languages
        { region: { $regex: new RegExp(query, "i") } }, // Case-insensitive search for region
        { value: { $regex: new RegExp(query, "i") } }, // Case-insensitive search for value
        { telephone_code: { $regex: new RegExp(query, "i") } }, // Case-insensitive search for telephone code
      ],
    });

    res.json(countries); // Send the search results as JSON response
  } catch (error) {
    console.error("Error searching countries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCounteyB = async (req: Request, res: Response) => {
  try {
    // Query all countries from the database, projecting only the required fields
    const countries = await Country.find(
      {},
      { _id: 0, name: 1, capital: 1, telephone_code: 1, value: 1 }
    );

    // Return the result as a JSON response
    return res.json(countries);
  } catch (error) {
    // Handle any errors that occur during the query
    return handleError(
      res,
      "Could not fetch countries with their cities and telephone codes"
    );
  }
};
